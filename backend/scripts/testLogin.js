const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const testLogin = async (username, password) => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    console.log(`\nTesting login with username: "${username}" and password: "${password}"`);
    
    // Find admin by username
    console.log('Searching for admin with username:', username);
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      console.log('❌ Admin not found with username:', username);
      mongoose.connection.close();
      return;
    }
    
    console.log('✅ Admin found:');
    console.log('  - ID:', admin._id);
    console.log('  - Username:', admin.username);
    console.log('  - Role:', admin.role);
    
    // Check password
    console.log('\nTesting password...');
    const isMatch = await admin.comparePassword(password);
    
    if (isMatch) {
      console.log('✅ Password is correct! Login should work.');
    } else {
      console.log('❌ Password is incorrect!');
      console.log('  - Stored hash:', admin.password);
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error testing login:', error);
    mongoose.connection.close();
  }
};

// Test with the credentials you're using
testLogin('admin', 'password123'); 