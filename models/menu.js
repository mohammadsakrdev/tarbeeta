const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Menu = sequelize.define("menu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = Menu;
