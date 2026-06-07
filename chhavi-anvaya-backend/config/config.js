const dotenv = require("dotenv");
const { sqlLogger } = require("./logger");
dotenv.config();

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: "postgres",
    port: process.env.PG_PORT,
    logging: sqlLogger,
  },

  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: "postgres",
    port: process.env.PG_PORT,
    logging: false,
  },

  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: "postgres",
    port: process.env.PG_PORT,
    logging: false,
  },
};
