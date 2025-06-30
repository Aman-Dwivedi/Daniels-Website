const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 