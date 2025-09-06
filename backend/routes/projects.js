const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

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

module.exports = router;