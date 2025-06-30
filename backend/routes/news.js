const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Get all active news articles
router.get('/', async (req, res) => {
  try {
    const newsArticles = await News.find({ isActive: true })
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(4); // Limit to 4 articles as specified
    
    res.json(newsArticles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});

// Get single news article by ID
router.get('/:id', async (req, res) => {
  try {
    const newsArticle = await News.findById(req.params.id);
    
    if (!newsArticle || !newsArticle.isActive) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json(newsArticle);
  } catch (error) {
    console.error('Error fetching news article:', error);
    res.status(500).json({ error: 'Failed to fetch news article' });
  }
});

module.exports = router; 