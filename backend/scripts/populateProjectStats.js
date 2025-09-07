const { sequelize } = require('../config/database');
require('../models/ProjectStats');
const ProjectStats = require('../models/ProjectStats');

const populateProjectStats = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync the ProjectStats model
    await ProjectStats.sync();

    // Check if stats already exist
    const existingStats = await ProjectStats.count();
    if (existingStats > 0) {
      console.log('Project statistics already exist. Skipping population.');
      return;
    }

    // Insert default project statistics
    const defaultStats = [
      {
        statKey: 'projects_completed',
        statLabel: 'Projects Completed',
        statValue: '500+',
        sortOrder: 1
      },
      {
        statKey: 'countries_served',
        statLabel: 'Countries Served',
        statValue: '25',
        sortOrder: 2
      },
      {
        statKey: 'tons_processed',
        statLabel: 'Tons Processed Annually',
        statValue: '50M+',
        sortOrder: 3
      },
      {
        statKey: 'ontime_delivery',
        statLabel: 'On-Time Delivery',
        statValue: '99%',
        sortOrder: 4
      }
    ];

    await ProjectStats.bulkCreate(defaultStats);
    console.log('Project statistics populated successfully!');

  } catch (error) {
    console.error('Error populating project statistics:', error);
  } finally {
    await sequelize.close();
  }
};

populateProjectStats();
