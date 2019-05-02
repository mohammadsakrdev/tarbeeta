const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../../controllers/user");

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get("/test", userController.test);

// @route   GET api/user/register
// @desc    Register user
// @access  Public
router.post("/register", userController.register);

// @route   GET api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", userController.login);

// @route   GET api/user/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.current
);

// @route   POST api/user/createMenu
// @desc    create Menu
// @access  Public
router.post(
  "/createMenu",
  passport.authenticate("jwt", { session: false }),
  userController.createMenu
);

// @route   POST api/user/createMenuItem
// @desc    create Menu
// @access  Public
router.post(
  "/createMenuItem",
  passport.authenticate("jwt", { session: false }),
  userController.createMenuItem
);

// @route   GET api/user/allMenus
// @desc    get All Menus
// @access  Public
router.get(
  "/allMenus",
  passport.authenticate("jwt", { session: false }),
  userController.AllMenus
);

// @route   GET api/user/allMenuItems
// @desc    get All Menu items
// @access  Public
router.post(
  "/allMenuItems",
  passport.authenticate("jwt", { session: false }),
  userController.AllMenuItems
);

// @route   GET api/user/allBranches
// @desc    get All Branches
// @access  Public
router.get(
  "/allBranches",
  passport.authenticate("jwt", { session: false }),
  userController.AllBranches
);

module.exports = router;
