import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DB_URL)
export default {
  development: {
    client: 'pg',
    connection: "postgres://ukegfydr:80YWjjZbHEOE78IKWDLUrnA5WP7alCvu@ruby.db.elephantsql.com:5432/ukegfydr"
    ,migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
