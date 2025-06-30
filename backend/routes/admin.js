const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

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

module.exports = router; 