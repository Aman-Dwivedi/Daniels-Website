const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'daniels',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || '',
  {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
    dialect: 'mysql',
    logging: false,
    // Add connection pool configuration
    pool: {
      max: 10,        // Maximum number of connections
      min: 0,         // Minimum number of connections
      acquire: 30000, // Maximum time to get connection (ms)
      idle: 10000,    // Maximum time connection can be idle (ms)
    },
    define: {
      timestamps: true
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected');
    await sequelize.sync();
    console.log('Models synchronized');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };