const dotenv = require('dotenv');
dotenv.config();  // Loads environment variables from the .env file

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT,
  },

  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT,
  }
};
