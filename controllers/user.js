const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

// Load  model
const User = require("../models/user");
const Restaurant = require("../models/restaurant");
const Menu = require("../models/menu");
const MenuItem = require("../models/menuItem");
const RestaurantBranch = require("../models/restaurantBranch");

exports.test = (req, res, next) => res.json({ msg: "Users Works" });

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    where: { email: email }
  }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json("User not found");
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, roleId: user.roleId }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

exports.register = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
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
            role: "member"
          })
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

exports.current = (req, res, next) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    roleId: req.user.roleId
  });
};

exports.createMenu = (req, res, next) => {
  req.user
    .getRestaurants({ where: { name: req.body.restaurantName } })
    .then(restaurants => {
      const restaurant = restaurants[0];
      if (!restaurant) {
        return res.status(400).json("Restaurant not exists");
      } else {
        return restaurant
          .createMenu({
            name: req.body.menuName
          })
          .then(menu => res.status(200).json(menu))
          .catch(err => console.log(err));
      }
    });
};

exports.createMenuItem = (req, res, next) => {
  req.user
    .getRestaurants({ where: { name: req.body.restaurantName } })
    .then(restaurants => {
      const restaurant = restaurants[0];
      if (!restaurant) {
        return res.status(400).json("Restaurant not exists");
      } else {
        restaurant
          .getMenus({ where: { name: req.body.menuName } })
          .then(menus => {
            const menu = menus[0];
            if (!menu) {
              return res.status(400).json("Menu not exists");
            } else {
              return menu
                .createMenuItem({
                  title: req.body.title,
                  image: req.body.image,
                  description: req.body.description,
                  price: req.body.price
                })
                .then(menuItem => res.status(200).json(menuItem))
                .catch(err => console.log(err));
            }
          });
      }
    });
};

exports.AllMenus = (req, res, next) => {
  let allMenus = [];
  User.findOne({
    where: { id: req.user.id },
    include: [
      {
        model: Restaurant,
        required: true,
        include: [{ model: Menu, required: true }]
      }
    ]
  }).then(user => {
    console.log(`User is ${JSON.stringify(user)}`);
    user.restaurants.forEach(restaurant => {
      restaurant.menus.forEach(val => {
        allMenus.push(val);
      });
    });
    console.log(allMenus);
    res.status(200).json(allMenus);
  });
};

exports.AllMenuItems = (req, res, next) => {
  let menuItems = [];
  User.findOne({
    where: { id: req.user.id },
    include: [
      {
        model: Restaurant,
        include: [
          {
            model: Menu,
            where: { name: req.body.menuName },
            include: [{ model: MenuItem }]
          }
        ]
      }
    ]
  }).then(user => {
    console.log(`User is ${JSON.stringify(user)}`);
    console.log(req.body.menuName);
    user.restaurants.forEach(restaurant => {
      restaurant.menus.forEach(menu => {
        menu.menuItems.forEach(item => {
          menuItems.push(item);
        });
      });
    });
    res.status(200).json(menuItems);
  });
};

exports.AllBranches = (req, res, next) => {
  let branches = [];
  User.findOne({
    where: { id: req.user.id },
    include: [
      {
        model: Restaurant,
        required: true,
        include: [{ model: RestaurantBranch, required: true }]
      }
    ]
  }).then(user => {
    console.log(`User is ${JSON.stringify(user)}`);
    user.restaurants.forEach(restaurant => {
      restaurant.restaurantBranches.forEach(val => {
        branches.push(val);
      });
    });
    console.log(branches);
    res.status(200).json(branches);
  });
};
