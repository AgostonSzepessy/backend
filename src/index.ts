import express from 'express';

import { logger } from './config/logger';
import { sequelize } from './config/database';

const PORT = process.env.PORT || 8080;

// Connect to database
sequelize.authenticate().then(() => {
    logger.info('Connected to database');
}).catch(err => {
    logger.error('Unable to conenct to database: ', err);
    process.exit(1);
});

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, there!');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
