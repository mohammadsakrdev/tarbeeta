const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Role = require("./role");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

// User.belongsTo(Role);
// Role.hasMany(User);

module.exports = User;