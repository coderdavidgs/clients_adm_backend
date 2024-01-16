import { config } from 'dotenv';
config();
import 'colors';

export default {
    client: 'mysql2',
    connection: {
        host: process.env.APP_DB_HOST,
        port: process.env.APP_DB_PORT,
        database: process.env.APP_DB_NAME,
        user: process.env.APP_DB_USER,
        password: process.env.APP_DB_PASSWORD,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'clients_adm_migrations',
        directory: './database/config/migrations',
    },
    debug: true,
    log: {
        warn(message) {
        console.warn('Knex Warning:'.yellow, message);
        },

        error(message) {
        console.error('Knex Error:'.red, message);
        },

        deprecate(message) {
        console.log('Knex Deprecation Warning:'.magenta, message);
        },

        debug(message) {
        console.log('Knex Debug:'.blue, message);
        },
    },
}