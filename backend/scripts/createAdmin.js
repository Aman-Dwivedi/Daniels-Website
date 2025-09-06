const { connectDB } = require('../config/database');
const Admin = require('../models/Admin');
require('dotenv').config();

(async () => {
  try {
    await connectDB();
    const admin = await Admin.create({
      username: 'admin',
      password: 'password123'
    });
    console.log('Admin user created successfully:', admin.username);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
})();