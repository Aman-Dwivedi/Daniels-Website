const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GlobalOffice = sequelize.define('GlobalOffice', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  workingHours: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'global_offices',
  timestamps: true
});

GlobalOffice.prototype.toJSON = function() {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = GlobalOffice;
