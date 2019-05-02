const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Location = require("../models/location");
const Restaurant = require("../models/restaurant");

exports.test = (req, res, next) => res.json({ msg: "Admin Works" });

exports.createUser = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }).then(user => {
    if (user) {
      return res.status(400).json("Email already exists");
    } else if (req.user.roleId !== 1) {
      return res.status(403).send("User is not authorized");
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          return User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            roleId: req.body.role === "admin" ? 1 : 2
          })
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

exports.createLocation = (req, res, next) => {
  Location.findOne({ where: { name: req.body.name } }).then(location => {
    if (location) {
      return res.status(400).json("Location already exists");
    } else if (req.user.roleId !== 1) {
      return res.status(403).send("User is not authorized");
    } else {
      return Location.create({
        name: req.body.name
      })
        .then(location => res.status(200).json(location))
        .catch(err => console.log(err));
    }
  });
};

exports.createRestaurant = (req, res, next) => {
  User.findOne({ where: { email: req.body.ownerEmail } }).then(user => {
    if (!user) {
      return res.status(400).json("Owner not exists");
    } else if (req.user.roleId !== 1) {
      return res
        .status(403)
        .send("User is not authorized ot create restaurant");
    } else {
      return user
        .createRestaurant({
          name: req.body.restaurantName
        })
        .then(restaurant => res.status(200).json(restaurant))
        .catch(err => console.log(err));
    }
  });
};

exports.createRestaurantBranch = (req, res, next) => {
  Restaurant.findOne({ where: { name: req.body.restaurantName } }).then(
    restaurant => {
      if (!restaurant) {
        return res.status(400).json("Restaurant not exists");
      } else if (req.user.roleId !== 1) {
        return res
          .status(403)
          .send("User is not authorized ot create restaurant branch");
      } else {
        return restaurant
          .createRestaurantBranch({
            name: req.body.branchName
          })
          .then(branch =>
            Location.findOne({ where: { name: req.body.locationName } })
              .then(location => {
                if (location) {
                  branch.locationId = location.id;
                  return branch.save();
                } else {
                  return branch.createLocation({
                    name: req.body.locationName
                  });
                }
              })
              .then(result => res.status(200).json(branch))
              .catch(err => console.log(err))
          );
      }
    }
  );
};
