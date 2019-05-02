const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Location = sequelize.define("location", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = Location;
