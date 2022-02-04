const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");
const axios = require("axios");
const config = {
  headers: {
    "Duffel-Version": "beta",
    Authorization: `Bearer duffel_live_DtDz8y-Guv18G8A8BMD9vt6AxnUZu5Fk6z4Aecy1Lb4`,
  },
};
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
<<<<<<< HEAD
      // render this with the data obj
      console.log(response.data.offers);
      res.render("homepage", response.data.offers);
=======
      console.log(response.data.data.offers);
      const offers = response.data.data.offers;
      res.render("homepage", offers);
>>>>>>> 76590d8069b7f735844494392bce1f0df9ac5cae
    });

  // other logic...
});

module.exports = router;
