const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");

const config = {
  headers: {
    "Duffel-Version": "beta",
    Authorization: `Bearer duffel_live_DtDz8y-Guv18G8A8BMD9vt6AxnUZu5Fk6z4Aecy1Lb4`,
  },
};
// get all posts for homepage
router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("login");
    return;
  }
  res.render("landing", {
    loggedIn: req.session.loggedIn
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.render("landing", {
      loggedIn: req.session.loggedIn
    });

    return;
  }

  res.render("login");
});

router.get("/homepage", (req, res) => {
  console.log(req.session);
  axios
    .post(
      "https://api.duffel.com/air/offer_requests",
      {
        data: {
          cabin_class: "economy",
          slices: [
            {
              departure_date: "2022-04-04",
              destination: "JFK",
              origin: "ADA",
            },
          ],
          passengers: [
            {
              type: "child",
            },
          ],
        },
      },
      config
    )

    .then(function (response) {
      console.log(response.data.data.offers);
      const offers = response.data.data.offers;
      res.render("homepage", offers);
    });

  // other logic...
});

module.exports = router;
