const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fullContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(512),
    allowNull: false
  },
  date: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'news',
  timestamps: true
});

News.prototype.toJSON = function() {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = News;