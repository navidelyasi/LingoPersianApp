const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelizeDB = new Sequelize(
  `postgres://postgres:${process.env.DB_PASS}@localhost:5432/${process.env.DB_NAME}`
);

module.exports = sequelizeDB;
