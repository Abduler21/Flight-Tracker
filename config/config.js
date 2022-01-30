const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

module.exports = new Sequelize(
  process.env.DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
