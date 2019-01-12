import Knex, { Config } from 'knex';

function knexConfig(): Config {
    return require('../../knexfile');
}

export const knex: Knex = Knex(knexConfig());
