// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config({path: __dirname + '/.env'})

module.exports = {

  development: {
    client: process.env['db_client'],
    connection: {
      host : process.env['db_host'],
      port : process.env['db_port'],
      database: process.env['db_database'],
      user:     process.env['db_user'],
      password: process.env['db_password']
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: process.env['db_client'],
    connection: {
      host : process.env['db_host'],
      port : process.env['db_port'],
      database: process.env['db_database'],
      user:     process.env['db_user'],
      password: process.env['db_password']
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env['db_client'],
    connection: {
      host : process.env['db_host'],
      port : process.env['db_port'],
      database: process.env['db_database'],
      user:     process.env['db_user'],
      password: process.env['db_password']
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
