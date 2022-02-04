const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {});
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }

  res.render("login");
});

router.get("/homepage", (req, res) => {
  console.log(req.session);
  res.render("homepage");

  // other logic...
});

module.exports = router;
