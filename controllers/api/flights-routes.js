const router = require("express").Router();
const axios = require("axios");
const Flights = require("../../Models/Flights");

// route to look up flights from duffel API
router.post("/lookup", (req, res) => {
  console.log(req.body);
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
          passengers: [
            {
              type: req.body.type,
            },
          ],
        },
      },
      config
    )
    .then(function (response) {
      const offers = response.data.data.offers;

      if (!response) {
        return res.status(401).json({
          status: "failed",
          message: "There are not flights for this ticket",
        });
      }

      return res.status(200).json({
        status: "success",
        data: {
          offers,
        },
      });
    });
});

// Save a flight route
router.post("/", (req, res) => {
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
    user_id: req.body.user_id,
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
      res.status(500).json(err);
    });
});
// update flight route

// delete flight route
module.exports = router;
