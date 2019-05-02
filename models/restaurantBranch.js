const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Location = require("./location");
const Restaurant = require("./restaurant");

const RestaurantBranch = sequelize.define("restaurantBranch", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = RestaurantBranch;
