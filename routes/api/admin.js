const express = require("express");
const router = express.Router();
const passport = require("passport");

const adminController = require("../../controllers/admin");

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get("/test", adminController.test);

// @route   POST api/admin/createUser
// @desc    create User
// @access  Private
router.post(
  "/createUser",
  passport.authenticate("jwt", { session: false }),
  adminController.createUser
);

// @route   POST api/admin/createLocation
// @desc    create Location
// @access  Private
router.post(
  "/createLocation",
  passport.authenticate("jwt", { session: false }),
  adminController.createLocation
);

// @route   POST api/admin/createRestaurant
// @desc    create restaurant
// @access  Private
router.post(
  "/createRestaurant",
  passport.authenticate("jwt", { session: false }),
  adminController.createRestaurant
);

// @route   POST api/admin/createRestaurantBranch
// @desc    create restaurant branch
// @access  Private
router.post(
  "/createRestaurantBranch",
  passport.authenticate("jwt", { session: false }),
  adminController.createRestaurantBranch
);

module.exports = router;
