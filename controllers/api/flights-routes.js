const router = require("express").Router();
const axios = require("axios");

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

module.exports = router;
