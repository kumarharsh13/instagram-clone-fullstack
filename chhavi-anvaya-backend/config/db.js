const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const { sqlLogger, log } = require("./logger");
dotenv.config();

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "production" ? false : sqlLogger,
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    log.dbConnected();
  } catch (error) {
    log.dbError(error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
