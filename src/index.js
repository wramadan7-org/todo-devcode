import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';
import * as dotenv from 'dotenv';
import httpStatus from 'http-status';

dotenv.config();

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

app.listen(NODE_PORT, () => {
  console.log(`App listen on port ${NODE_PORT}`);
});
