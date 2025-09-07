const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PageContent = require('../models/PageContent');
const BackgroundImage = require('../models/BackgroundImage');
const { authenticateToken } = require('../middleware/auth');

// Configure multer for background image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'backgrounds');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'bg-' + uniqueSuffix + path.extname(file.originalname));
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

// GET all page content
router.get('/page-content', async (req, res) => {
  try {
    const pageContent = await PageContent.findAll({
      order: [['pageKey', 'ASC']]
    });

    const backgroundImages = await BackgroundImage.findAll({
      where: { isActive: true },
      order: [['pageKey', 'ASC'], ['sortOrder', 'ASC']]
    });

    // Group background images by pageKey
    const imagesByPage = backgroundImages.reduce((acc, img) => {
      if (!acc[img.pageKey]) {
        acc[img.pageKey] = [];
      }
      acc[img.pageKey].push({
        id: img.id.toString(),
        url: img.url,
        alt: img.alt,
        sortOrder: img.sortOrder
      });
      return acc;
    }, {});

    // Format page content
    const contentByPage = pageContent.reduce((acc, content) => {
      acc[content.pageKey] = {
        description: content.description,
        pageName: content.pageName
      };
      return acc;
    }, {});

    res.json({
      pageContent: contentByPage,
      backgroundImages: imagesByPage
    });
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({ error: 'Failed to fetch page content' });
  }
});

// PUT update page content description
router.put('/page-content/:pageKey', authenticateToken, async (req, res) => {
  try {
    const { pageKey } = req.params;
    const { description, pageName } = req.body;

    const [pageContent, created] = await PageContent.upsert({
      pageKey,
      pageName: pageName || pageKey.charAt(0).toUpperCase() + pageKey.slice(1),
      description
    });

    res.json(pageContent);
  } catch (error) {
    console.error('Error updating page content:', error);
    res.status(500).json({ error: 'Failed to update page content' });
  }
});

// POST upload background image
router.post('/background-images/:pageKey', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { pageKey } = req.params;
    const { alt } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Get the next sort order for this page
    const maxOrder = await BackgroundImage.max('sortOrder', {
      where: { pageKey, isActive: true }
    });
    const sortOrder = (maxOrder || 0) + 1;

    // For non-home pages, deactivate existing images
    if (pageKey !== 'home') {
      await BackgroundImage.update(
        { isActive: false },
        { where: { pageKey, isActive: true } }
      );
    }

    // Check home page limit (10 images max)
    if (pageKey === 'home') {
      const activeCount = await BackgroundImage.count({
        where: { pageKey: 'home', isActive: true }
      });
      if (activeCount >= 10) {
        // Delete the uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: 'Maximum 10 images allowed for home page' });
      }
    }

    const backgroundImage = await BackgroundImage.create({
      pageKey,
      url: `/uploads/backgrounds/${req.file.filename}`,
      alt: alt || req.file.originalname.replace(/\.[^/.]+$/, ""),
      sortOrder
    });

    res.json(backgroundImage);
  } catch (error) {
    console.error('Error uploading background image:', error);
    // Clean up uploaded file if there was an error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to upload background image' });
  }
});

// PUT update background image
router.put('/background-images/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { alt, sortOrder } = req.body;

    const updateData = {};
    if (alt !== undefined) updateData.alt = alt;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    const [updatedRowsCount] = await BackgroundImage.update(updateData, {
      where: { id, isActive: true }
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Background image not found' });
    }

    const updatedImage = await BackgroundImage.findByPk(id);
    res.json(updatedImage);
  } catch (error) {
    console.error('Error updating background image:', error);
    res.status(500).json({ error: 'Failed to update background image' });
  }
});

// DELETE background image
router.delete('/background-images/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const backgroundImage = await BackgroundImage.findByPk(id);
    if (!backgroundImage) {
      return res.status(404).json({ error: 'Background image not found' });
    }

    // Delete the file from filesystem
    const filePath = path.join(__dirname, '..', backgroundImage.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Soft delete (set isActive to false)
    await BackgroundImage.update(
      { isActive: false },
      { where: { id } }
    );

    res.json({ message: 'Background image deleted successfully' });
  } catch (error) {
    console.error('Error deleting background image:', error);
    res.status(500).json({ error: 'Failed to delete background image' });
  }
});

// POST reorder background images
router.post('/background-images/:pageKey/reorder', authenticateToken, async (req, res) => {
  try {
    const { pageKey } = req.params;
    const { imageIds } = req.body; // Array of image IDs in desired order

    if (!Array.isArray(imageIds)) {
      return res.status(400).json({ error: 'imageIds must be an array' });
    }

    // Update sort order for each image
    const updatePromises = imageIds.map((imageId, index) => 
      BackgroundImage.update(
        { sortOrder: index + 1 },
        { where: { id: imageId, pageKey, isActive: true } }
      )
    );

    await Promise.all(updatePromises);

    // Return updated images
    const updatedImages = await BackgroundImage.findAll({
      where: { pageKey, isActive: true },
      order: [['sortOrder', 'ASC']]
    });

    res.json(updatedImages);
  } catch (error) {
    console.error('Error reordering background images:', error);
    res.status(500).json({ error: 'Failed to reorder background images' });
  }
});

module.exports = router;
