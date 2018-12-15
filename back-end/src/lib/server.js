'use strict';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './logger';
import candidateRoutes from '../route/candidate-router';
import loggerMiddleware from './logger-middleware';
import errorMiddleware from './error-middleware';

const app = express();
let server = null;

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));
app.use(loggerMiddleware);
app.use(candidateRoutes);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
      });
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    });
};

export { startServer, stopServer };
