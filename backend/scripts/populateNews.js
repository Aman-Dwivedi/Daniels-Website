const { connectDB } = require('../config/database');
const News = require('../models/News');
require('dotenv').config();

(async () => {
  try {
    await connectDB();

    const samples = [
      {
        title: 'Sample News 1',
        excerpt: 'This is a sample news excerpt 1.',
        fullContent: 'This is the full content for news 1.',
        image: '/images/news3.jpg',
        date: new Date().toLocaleDateString(),
        isActive: true
      },
      {
        title: 'Sample News 2',
        excerpt: 'This is a sample news excerpt 2.',
        fullContent: 'This is the full content for news 2.',
        image: '/images/news4.jpg',
        date: new Date().toLocaleDateString(),
        isActive: true
      }
    ];

    for (const item of samples) {
      await News.create(item);
    }

    console.log('News populated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error populating news:', error);
    process.exit(1);
  }
})();