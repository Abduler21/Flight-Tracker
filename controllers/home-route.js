const router = require("express").Router();
const { default: axios } = require("axios");
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");


// get all posts for homepage
router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("login");
    return;
  }
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });

    return;
  }

  res.render("login");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
  // other logic...
});

module.exports = router;
