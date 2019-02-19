// This must come before everything to setup environment variables
require('dotenv').config();

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';

import publicApi from './routes/public-api';
import securedApi from './routes/secured-api';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/error-handler';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Setup API routes
app.use('/public-api', publicApi);
app.use('/api', securedApi);

app.get('/', (req, res) => {
    res.send('Hello, there!');
});

// Define all error handlers last
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`);
});
