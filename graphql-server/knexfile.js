require('dotenv').config();
console.log(process.env.DB_URL)
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_URL
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
