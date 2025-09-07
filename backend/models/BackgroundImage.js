const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BackgroundImage = sequelize.define('BackgroundImage', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  pageKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'home, about, services, equipment, projects, contact'
  },
  url: {
    type: DataTypes.STRING(512),
    allowNull: false
  },
  alt: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Order for carousel (mainly for home page)'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'background_images',
  timestamps: true,
  indexes: [
    {
      fields: ['pageKey', 'sortOrder']
    }
  ]
});

BackgroundImage.prototype.toJSON = function() {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = BackgroundImage;
