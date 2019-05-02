const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "tarbeeta_db",
  username: "root",
  password: "root",
  dialect: "mysql"
});

module.exports = sequelize;
