import knexconfig from '../knexfile.js'
import knex from 'knex'
const environment = process.env.ENVIRONMENT || 'development'
const config = knexconfig[environment];
export default knex(config);