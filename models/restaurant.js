const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require("./user");

const Restaurant = sequelize.define("restaurant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = Restaurant;
