require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const {
  MYSQL_DBDIALECT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DBNAME,
  NODE_ENV,
} = process.env;

const sequelize = new Sequelize(`${MYSQL_DBDIALECT}://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DBNAME}_${NODE_ENV}`);
const SequelizeInstance = sequelize.Sequelize;

// const connectDb = () => {
const connectDb = sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully');
  return Promise.resolve(true);
}).catch((error) => {
  console.log(`Unable to connect to the database: ${error}`);
  return Promise.reject(error);
});
// };

module.exports = {
  connectDb,
  sequelize,
  SequelizeInstance,
  DataTypes,
};
