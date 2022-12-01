require('dotenv').config();
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');

const { NODE_ENV } = process.env;

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    console.log('blablabalbla', error);
    error = new ApiError(message, statusCode, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  console.log('error handler', message);

  if (NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  console.log('res locals', res.locals.errorMessage);

  const response = {
    status: statusCode,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (NODE_ENV === 'development') {
    console.error('errorrrrrrrrrrrrr', err);
  }

  res.sendWrapped(response.message, response, statusCode);
};

module.exports = {
  errorConverter,
  errorHandler,
};
