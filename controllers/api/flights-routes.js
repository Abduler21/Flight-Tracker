const router = require("express").Router();
const axios = require("axios");
const Flights = require("../../Models/Flights");
// const moment = require("moment");

// route to look up flights from duffel API
router.post("/lookup", (req, res) => {
  console.log(req.body);

  let passNum = req.body.type.split(" ")[0];

  const passengers = [];
  for (let i = 0; i < passNum; i++) {
    const numberOfPassenger = {
      type: req.body.type.split(" ")[1],
    };
    passengers.push(numberOfPassenger);
  }

  const config = {
    headers: {
      "Duffel-Version": "beta",
      Authorization: `Bearer duffel_live_DtDz8y-Guv18G8A8BMD9vt6AxnUZu5Fk6z4Aecy1Lb4`,
    },
  };
  axios
    .post(
      "https://api.duffel.com/air/offer_requests",
      {
        data: {
          cabin_class: req.body.cabin,
          slices: [
            {
              departure_date: req.body.departure_date,
              destination: req.body.destination,
              origin: req.body.origin,
            },
          ],
          passengers,
        },
      },
      config
    )
    .then(function (response) {
      const offers = response.data.data;
      //console.log("The offers are ========", offers);

      if (!response) {
        return res.status(401).json({
          status: "failed",
          message: "There are not flights for this ticket",
        });
      }
      //  res.render("flights", {
      //   data: {
      //     offers
      //   }
      // });

      return res.status(200).json({
        status: "success",
        data: {
          offers,
        },
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
});

// Save a flight route
router.post("/", (req, res) => {
  console.log("The req.body is ==", req.body);
  console.log("The current user id ==", req.session.user_id);

  // 1. check if ticket is already saved
  Flights.findOne({
    where: {
      passenger_id: req.body.passenger_id,
    },
  }).then((ticket) => {
    if (ticket) {
      console.log("You already have a ticket with id");
      return;
    }
    // if not saved then save the new ticket
    Flights.create({
      totalAmount: req.body.totalAmount,
      passenger_id: req.body.passenger_id,
      cabin_class: req.body.cabin_class,
      originName: req.body.originName,
      timeZone: req.body.timeZone,
      operating_carrier: req.body.operating_carrier,
      destinationName: req.body.destinationName,
      departing_at: req.body.departing_at,
      arriving_at: req.body.arriving_at,
      duration: req.body.duration,
      origin_city: req.body.origin_city,
      destination_city: req.body.destination_city,
      user_id: req.session.user_id,
    })
      .then((flightData) => {
        return res.status(200).json({
          status: "success",
          data: {
            flightData,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
});

// get all flight tickets of user
router.get("/", (req, res) => {
  const userId = req.session.user_id; // current logged in userId

  Flights.findAll({
    where: {
      user_id: userId,
    },
  })
    .then((flightData) => {
      if (!flightData) {
        return res.status(400).json({
          status: "failed",
          message: "could not find any tickets with this user" + req.params.id,
        });
      }

      return res.status(200).json({
        status: "success",
        data: {
          flightData,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});
// update flight route
router.put("/:id", (req, res) => {
  Flights.update(req.body, {
    individualHooks: true,
    where: {
      passenger_id: req.params.id,
    },
  })
    .then((flightData) => {
      if (!flightData) {
        res.status(404).json({ message: "no user found with this id" });
        return;
      }
      return res.json(flightData);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

// delete flight route
router.delete("/:id", (req, res) => {
  Flights.destroy({
    where: {
      passenger_id: req.params.id,
    },
  })
    .then((flightData) => {
      if (!flightData) {
        res.status(404).json({ message: "No flights found with this id" });
        return;
      }
      return res.json(flightData);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});
module.exports = router;
