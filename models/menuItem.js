const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const MenuItem = sequelize.define("menuItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  image: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.DECIMAL
});

module.exports = MenuItem;
