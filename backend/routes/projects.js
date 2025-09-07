const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');
const ProjectStats = require('../models/ProjectStats');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Configure multer for project image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all active projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get project statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await ProjectStats.findAll({
      order: [['sortOrder', 'ASC']]
    });
    res.json(stats);
  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({ error: 'Failed to fetch project statistics' });
  }
});

// Create new project (Admin only)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const project = await Project.create({
      title,
      image: `/uploads/${req.file.filename}`
    });

    res.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    // Clean up uploaded file if there was an error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project (Admin only)
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, existingImage } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updateData = { title };

    if (req.file) {
      // New image uploaded, delete old one
      if (project.image && project.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', project.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (existingImage) {
      updateData.image = existingImage;
    }

    await project.update(updateData);
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    // Clean up uploaded file if there was an error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete the image file
    if (project.image && project.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Soft delete (set isActive to false)
    await project.update({ isActive: false });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Update project statistics (Admin only)
router.put('/stats/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { statLabel, statValue, sortOrder } = req.body;

    const updateData = {};
    if (statLabel !== undefined) updateData.statLabel = statLabel;
    if (statValue !== undefined) updateData.statValue = statValue;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    const [updatedRowsCount] = await ProjectStats.update(updateData, {
      where: { id }
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Project statistic not found' });
    }

    const updatedStat = await ProjectStats.findByPk(id);
    res.json(updatedStat);
  } catch (error) {
    console.error('Error updating project stat:', error);
    res.status(500).json({ error: 'Failed to update project statistic' });
  }
});

module.exports = router;