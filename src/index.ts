import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import Knex = require('knex');
import { Config } from 'knex';
import { Model } from 'objection';

import { logger } from './config/logger';
import publicApi from './routes/public-api';

// Setup database
function knexConfig(): Config {
    return require('../knexfile');
}

export const knex: Knex = Knex(knexConfig());

Model.knex(knex);

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const router = express.Router();
publicApi(router);

app.use('/public-api', router);

app.get('/', (req, res) => {
    res.send('Hello, there!');
});

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`);
});
