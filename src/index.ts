import express from 'express';
import Knex = require('knex');
import { Config } from 'knex';
import { Model } from 'objection';

import { logger } from './config/logger';

// Setup database
function knexConfig(): Config {
    return require('../knexfile');
}

export const knex: Knex = Knex(knexConfig());

Model.knex(knex);

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, there!');
});

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`);
});
