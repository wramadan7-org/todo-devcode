require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');
const httpStatus = require('http-status');
const connection = require('./config/database');
const routes = require('./routes/index');

const app = express();

const { NODE_PORT } = process.env;

// Set security headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse URLEncoded request body
app.use(express.urlencoded({ extended: false }));

// Sanitize request data
app.use(xss());

// Gzip compression
app.use(compression());

// Enable cors
app.use(cors());
app.options('*', cors());

app.response.sendWrapped = function (message, data, statusCode = httpStatus.OK) {
  return this.status(statusCode).send({
    status: statusCode === httpStatus.OK || statusCode === httpStatus.CREATED ? 'Success' : statusCode,
    message,
    data,
  });
};

app.use(routes);

connection.connectDb.then(() => {
  app.listen(NODE_PORT, () => {
    console.log(`App listen on port ${NODE_PORT}`);
  });
}).catch((error) => console.log(error));

module.exports = app;
