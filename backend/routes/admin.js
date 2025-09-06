const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middleware/auth');
const News = require('../models/News');
const Project = require('../models/Project');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const prefix = req.originalUrl.includes('/projects') ? 'project' : 'news';
    cb(null, prefix + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Admin message route (protected)
router.get('/message', authenticateToken, (req, res) => {
  try {
    const adminMessage = {
      title: 'Welcome to Daniels Admin Panel',
      message: `Hello ${req.admin.username}! This is a secure message from the backend server. The system is running smoothly and ready for administration tasks.`,
      timestamp: new Date().toISOString(),
      status: 'active',
      adminInfo: {
        username: req.admin.username,
        lastLogin: req.admin.lastLogin
      }
    };
    res.json(adminMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin message' });
  }
});

// Status ping (protected)
router.get('/status', authenticateToken, (req, res) => {
  res.json({ 
    server: 'online',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    authenticatedUser: req.admin.username
  });
});

// Upload image
router.post('/upload-image', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ success: true, imagePath, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// ===== NEWS MANAGEMENT =====

// Get all news (ensure at least 4 exist)
router.get('/news', authenticateToken, async (req, res) => {
  try {
    let newsArticles = await News.findAll({ order: [['createdAt', 'DESC']] });

    while (newsArticles.length < 4) {
      const newArticle = await News.create({
        title: `Sample News ${newsArticles.length + 1}`,
        excerpt: 'This is a sample news excerpt. Click edit to modify this content.',
        fullContent: 'This is the full content of the sample news article. You can edit this to add your actual news content.',
        image: '/images/news3.jpg',
        date: new Date().toLocaleDateString(),
        isActive: true
      });
      newsArticles.push(newArticle);
    }

    const limitedNews = newsArticles.slice(0, 4);
    res.json(limitedNews);
  } catch (error) {
    console.error('Error fetching admin news:', error);
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});

// Update a news article
router.put('/news/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, fullContent, date, existingImage } = req.body;
    if (!title || !excerpt || !fullContent || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    let imagePath;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
      if (news.image && news.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', news.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    } else if (existingImage) {
      imagePath = existingImage;
    } else {
      return res.status(400).json({ error: 'Image is required' });
    }

    news.title = title.trim();
    news.excerpt = excerpt.trim();
    news.fullContent = fullContent.trim();
    news.image = imagePath;
    news.date = date.trim();
    news.isActive = true;

    await news.save();
    res.json(news);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Failed to update news article' });
  }
});

// Create a news article (max 4)
router.post('/news', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const existingCount = await News.count();
    if (existingCount >= 4) {
      return res.status(400).json({ error: 'Maximum of 4 news articles allowed' });
    }

    const { title, excerpt, fullContent, date } = req.body;
    if (!title || !excerpt || !fullContent || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const newNews = await News.create({
      title: title.trim(),
      excerpt: excerpt.trim(),
      fullContent: fullContent.trim(),
      image: imagePath,
      date: date.trim(),
      isActive: true
    });

    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Failed to create news article' });
  }
});

// Delete a news article
router.delete('/news/:id', authenticateToken, async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    if (news.image && news.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', news.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await News.destroy({ where: { id: req.params.id } });
    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Failed to delete news article' });
  }
});

// ===== PROJECT MANAGEMENT =====

// Get all projects
router.get('/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Update a project
router.put('/projects/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, existingImage } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    let imagePath;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
      if (project.image && project.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', project.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    } else if (existingImage) {
      imagePath = existingImage;
    } else {
      return res.status(400).json({ error: 'Image is required' });
    }

    project.title = title.trim();
    project.image = imagePath;
    project.isActive = true;
    await project.save();

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Create a new project
router.post('/projects', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const newProject = await Project.create({
      title: title.trim(),
      image: imagePath,
      isActive: true
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Delete a project
router.delete('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.image && project.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Project.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;