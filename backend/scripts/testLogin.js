const { connectDB } = require('../config/database');
const Admin = require('../models/Admin');
require('dotenv').config();

(async () => {
  try {
    console.log('Connecting to MySQL...');
    await connectDB();

    const username = process.env.TEST_ADMIN_USER || 'admin';
    const password = process.env.TEST_ADMIN_PASS || 'password123';

    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      console.log('❌ Admin not found with username:', username);
      process.exit(0);
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', username);
      process.exit(0);
    }

    console.log('✅ Admin found:');
    console.log('  - ID:', admin.id);
    console.log('  - _id:', admin.toJSON()._id);
    console.log('  - Username:', admin.username);
    console.log('  - Role:', admin.role);

    process.exit(0);
  } catch (error) {
    console.error('Error testing login:', error);
    process.exit(1);
  }
})();