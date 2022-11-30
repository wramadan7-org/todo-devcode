const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const { Activities } = require('./Activities');

const Todos = sequelize.define('todos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  activityGroupId: {
    type: DataTypes.INTEGER,
    field: 'activity_group_id',
    allowNull: false,
    references: {
      model: Activities,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('very-high', 'high', 'medium', 'low', 'very-low'),
    defaultValue: 'very-high',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
    field: 'updated_at',
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'deleted_at',
  },
}, {
  timestamps: true,
  paranoid: true,
});

Todos.associations = (models) => {
  Todos.belongsTo(models.Activities);

  return Todos;
};

module.exports = {
  Todos,
};
