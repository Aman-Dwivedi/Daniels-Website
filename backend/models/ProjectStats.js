const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProjectStats = sequelize.define('ProjectStats', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  statKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: 'projects_completed, countries_served, tons_processed, ontime_delivery'
  },
  statLabel: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  statValue: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'project_stats',
  timestamps: true
});

ProjectStats.prototype.toJSON = function() {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = ProjectStats;
