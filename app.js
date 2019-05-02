const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const sequelize = require("./util/database");
const User = require("./models/user");
const Role = require("./models/role");
const Location = require("./models/location");
const Restaurant = require("./models/restaurant");
const RestaurantBranch = require("./models/restaurantBranch");
const Menu = require("./models/menu");
const MenuItem = require("./models/menuItem");

const adminRoutes = require("./routes/api/admin");
const userRoutes = require("./routes/api/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

RestaurantBranch.belongsTo(Restaurant);
Restaurant.hasMany(RestaurantBranch);

User.belongsTo(Role);
Role.hasMany(User);
Restaurant.belongsTo(User);
User.hasMany(Restaurant);
RestaurantBranch.belongsTo(Location);
Location.hasMany(RestaurantBranch);
Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu);
MenuItem.belongsTo(Menu);
Menu.hasMany(MenuItem);

sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {
    return User.findOne({ where: { id: 1 } });
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("1234", salt, (err, hash) => {
          if (err) {
            throw err;
          }
          return Role.bulkCreate([{ roleName: "admin" }, { roleName: "owner" }])
            .then(result => {
              return User.create({
                name: "admin",
                email: "admin@yahoo.com",
                password: hash,
                roleId: 1
              })
                .then(newUser => {
                  Location.bulkCreate([
                    { name: "cairo" },
                    { roleName: "alex" }
                  ]);
                  console.log("Admin Created");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        });
      });
    }
    return user;
  })
  .then(user => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
