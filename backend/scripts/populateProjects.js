const { connectDB } = require('../config/database');
const Project = require('../models/Project');
require('dotenv').config();

(async () => {
  try {
    await connectDB();

    const samples = [
      { title: 'Sample Project 1', image: '/images/penguin.jpg', isActive: true },
      { title: 'Sample Project 2', image: '/images/penguin.jpg', isActive: true }
    ];

    for (const item of samples) {
      await Project.create(item);
    }

    console.log('Projects populated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error populating projects:', error);
    process.exit(1);
  }
})();