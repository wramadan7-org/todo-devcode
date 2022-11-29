require('dotenv').config();

const {
  MYSQL_DBDIALECT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DBNAME,
} = process.env;

module.exports = {
  development: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: `${MYSQL_DBNAME}_development`,
    host: MYSQL_HOST,
    dialect: MYSQL_DBDIALECT,
    port: MYSQL_PORT,
  },
  test: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: `${MYSQL_DBNAME}_test`,
    host: MYSQL_HOST,
    dialect: MYSQL_DBDIALECT,
    port: MYSQL_PORT,
  },
  production: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: `${MYSQL_DBNAME}_production`,
    host: MYSQL_HOST,
    dialect: MYSQL_DBDIALECT,
    port: MYSQL_PORT,
  },
};
