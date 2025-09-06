const { connectDB } = require('../config/database');
const Admin = require('../models/Admin');
require('dotenv').config();

(async () => {
  try {
    console.log('Connecting to MySQL...');
    await connectDB();
    const admins = await Admin.findAll();

    if (admins.length === 0) {
      console.log('No admin users found in the database');
      process.exit(0);
    }

    for (const admin of admins) {
      const a = admin.toJSON();
      console.log('\n--- Admin User ---');
      console.log('ID:', a.id);
      console.log('_id:', a._id);
      console.log('Username:', a.username);
      console.log('Role:', a.role);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error verifying admin:', error);
    process.exit(1);
  }
})();