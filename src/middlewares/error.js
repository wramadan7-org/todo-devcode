require('dotenv').config();
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');

const { NODE_ENV } = process.env;

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];

    error = new ApiError(message, statusCode, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: statusCode,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (NODE_ENV === 'development') {
    console.error(err);
  }

  res.sendWrapped(response.message, response, statusCode);
};

module.exports = {
  errorConverter,
  errorHandler,
};
