const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const verifyAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    // Find all admin users
    const admins = await Admin.find({});
    console.log('Total admin users found:', admins.length);
    
    if (admins.length === 0) {
      console.log('No admin users found in the database');
      mongoose.connection.close();
      return;
    }
    
    // Check each admin
    for (const admin of admins) {
      console.log('\n--- Admin User ---');
      console.log('ID:', admin._id);
      console.log('Username:', admin.username);
      console.log('Role:', admin.role);
      console.log('Created:', admin.createdAt);
      console.log('Last Login:', admin.lastLogin || 'Never');
      
      // Test password
      const isPasswordValid = await admin.comparePassword('password123');
      console.log('Password "password123" test:', isPasswordValid ? 'VALID' : 'INVALID');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error verifying admin:', error);
    mongoose.connection.close();
  }
};

verifyAdmin(); 