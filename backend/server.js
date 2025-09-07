const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MySQL FIRST
connectDB().then(() => {
  // THEN ensure models are registered after connection
  require('./models/Admin');
  require('./models/News');
  require('./models/Project');
  require('./models/PageContent');
  require('./models/BackgroundImage');
  require('./models/ProjectStats');
  require('./models/GlobalOffice'); // Add this line
}).catch(error => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const pageContentRoutes = require('./routes/pageContent');
const officesRoutes = require('./routes/offices'); // Add this line

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/offices', officesRoutes); // Add this line
app.use('/api', pageContentRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

const server = app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    sequelize.close().then(() => {
      console.log('Database connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    sequelize.close().then(() => {
      console.log('Database connection closed');
      process.exit(0);
    });
  });
});