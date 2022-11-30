const { sequelize } = require('../config/database');
const { Activities } = require('./Activities');
const { Todos } = require('./Todos');

const setupSequelizeAssosiation = async () => {
  Activities.hasMany(Todos, {
    foreignKey: 'activity_group_id',
  });
  Todos.hasOne(Activities, {
    foreignKey: 'id',
    sourceKey: 'activity_group_id',
  });
};

module.exports = setupSequelizeAssosiation;
