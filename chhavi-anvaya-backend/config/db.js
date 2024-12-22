const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: "postgres",
  logging: true, // Disable query logging set to false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
