const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PageContent = sequelize.define('PageContent', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  pageKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: 'home, about, services, equipment, projects, contact'
  },
  pageName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'page_content',
  timestamps: true
});

PageContent.prototype.toJSON = function() {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = PageContent;
