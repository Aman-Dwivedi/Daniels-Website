const { sequelize } = require('../config/database');
require('../models/GlobalOffice');
const GlobalOffice = require('../models/GlobalOffice');

const populateGlobalOffices = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync the GlobalOffice model
    await GlobalOffice.sync();

    // Check if offices already exist
    const existingOffices = await GlobalOffice.count();
    if (existingOffices > 0) {
      console.log('Global offices already exist. Skipping population.');
      return;
    }

    // Insert default global offices
    const defaultOffices = [
      {
        title: "Headquarters - USA",
        address: "238 Markell Drive\nBluefield, WV 24701, USA",
        phone: "+1 (304) 327-8161",
        email: "info@daniels-wv.com",
        workingHours: "Mon-Fri: 8:00 AM - 6:00 PM EST",
        sortOrder: 1
      },
      {
        title: "Australia Office",
        address: "456 Mining Street\nBrisbane, QLD 4000",
        phone: "+61 7 3000 1234",
        email: "australia@danielscompany.com",
        workingHours: "Mon-Fri: 9:00 AM - 5:00 PM AEST",
        sortOrder: 2
      },
      {
        title: "South Africa Office",
        address: "789 Industrial Park\nJohannesburg, 2000",
        phone: "+27 11 123 4567",
        email: "southafrica@danielscompany.com",
        workingHours: "Mon-Fri: 8:00 AM - 5:00 PM SAST",
        sortOrder: 3
      }
    ];

    await GlobalOffice.bulkCreate(defaultOffices);
    console.log('Global offices populated successfully!');

  } catch (error) {
    console.error('Error populating global offices:', error);
  } finally {
    await sequelize.close();
  }
};

populateGlobalOffices();
