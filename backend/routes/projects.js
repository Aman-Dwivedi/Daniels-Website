const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Get all active projects sorted by year (newest first)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true })
      .sort({ year: -1 }); // Sort by year descending (newest first)
    
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project || !project.isActive) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

module.exports = router; 