const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middleware/auth');
const News = require('../models/News');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'news-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Check if the file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
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

// Additional admin routes (protected)
router.get('/status', authenticateToken, (req, res) => {
  res.json({ 
    server: 'online',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    authenticatedUser: req.admin.username
  });
});

// =============== IMAGE UPLOAD ROUTE ===============

// Upload image endpoint
router.post('/upload-image', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Return the path to the uploaded image
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ 
      success: true, 
      imagePath: imagePath,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// =============== NEWS MANAGEMENT ROUTES ===============

// Get all news articles for admin
router.get('/news', authenticateToken, async (req, res) => {
  try {
    const newsArticles = await News.find({})
      .sort({ createdAt: -1 });
    
    // Ensure we always have exactly 4 news articles
    while (newsArticles.length < 4) {
      const newArticle = new News({
        title: `Sample News ${newsArticles.length + 1}`,
        excerpt: 'This is a sample news excerpt. Click edit to modify this content.',
        fullContent: 'This is the full content of the sample news article. You can edit this to add your actual news content.',
        image: '/images/news3.jpg',
        date: new Date().toLocaleDateString(),
        isActive: true // Always active
      });
      await newArticle.save();
      newsArticles.push(newArticle);
    }
    
    // If more than 4, only return the first 4
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

    // Determine which image to use
    let imagePath;
    if (req.file) {
      // New image uploaded
      imagePath = `/uploads/${req.file.filename}`;
      
      // Optionally delete old image if it was an uploaded file
      const existingNews = await News.findById(req.params.id);
      if (existingNews && existingNews.image && existingNews.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', existingNews.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    } else if (existingImage) {
      // Keep existing image
      imagePath = existingImage;
    } else {
      return res.status(400).json({ error: 'Image is required' });
    }
    
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        excerpt: excerpt.trim(),
        fullContent: fullContent.trim(),
        image: imagePath,
        date: date.trim(),
        isActive: true // Always set to active
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedNews) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Failed to update news article' });
  }
});

// Create a new news article (only if less than 4 exist)
router.post('/news', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const existingCount = await News.countDocuments({});
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
    
    const newNews = new News({
      title: title.trim(),
      excerpt: excerpt.trim(),
      fullContent: fullContent.trim(),
      image: imagePath,
      date: date.trim(),
      isActive: true // Always set to active
    });
    
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Failed to create news article' });
  }
});

// Delete a news article (not recommended, but available)
router.delete('/news/:id', authenticateToken, async (req, res) => {
  try {
    const newsToDelete = await News.findById(req.params.id);
    
    if (!newsToDelete) {
      return res.status(404).json({ error: 'News article not found' });
    }

    // Delete associated image file if it's an uploaded file
    if (newsToDelete.image && newsToDelete.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', newsToDelete.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Failed to delete news article' });
  }
});

module.exports = router; 