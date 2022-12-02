require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');
const httpStatus = require('http-status');
const connection = require('./config/database');
const routes = require('./routes/index');
const setupSequelizeAssosiation = require('./models');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

const { NODE_PORT } = process.env;
let server;

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

// Wrapped response
app.response.sendWrapped = function (message, data, statusCode = httpStatus.OK) {
  return this.status(statusCode).send({
    status: statusCode === httpStatus.OK || statusCode === httpStatus.CREATED ? 'Success' : httpStatus[statusCode],
    message,
    data,
  });
};

// Use route
app.use(routes);

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
};

// Connect db and assosiation
const initializeServer = () => {
  connection.connectDb.then(() => {
    setupSequelizeAssosiation().then(() => {
      server = app.listen(NODE_PORT, '0.0.0.0', () => {
        console.log(`App listen on port ${NODE_PORT}`);
      });
    });
  }).catch((error) => console.log(error));
};

// Run function connect db and assosiation
initializeServer();

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');

  if (server) server.close();
});

module.exports = app;
