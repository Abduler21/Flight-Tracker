const router = require("express").Router();
// import { Duffel } from "@duffel/api";
const { Duffel } = require("@duffel/api");

router.post("/lookup", async (req, res) => {
  // try {
  const duffel = new Duffel({
    token: "duffel_live_DtDz8y-Guv18G8A8BMD9vt6AxnUZu5Fk6z4Aecy1Lb4",
  });
  const offerRequest = await duffel.offerRequests.create({
    slices: [
      {
        origin: "JFK",
        destination: "LAX",
        departure_date: "2022-08-01T19:47:55.004Z",
      },
    ],
    passengers: [{ type: "adult" }],
    cabin_class: null,
  });

  // If no flights found error handler
  if (!offerRequest) {
    console.log(
      `==================Request could not be made==================`
    );
    return res.status(400).json({
      status: "failed",
      message: "Error making the offer request",
    });
  }

  const offers = await duffel.offers.list(offerRequest.data.id);
  if (!offers) {
    console.log(
      `==================No tickets could be found==================`
    );
    return res.status(400).json({
      status: "failed",
      message: "Could not find any flights",
    });
  }
  console.log("flights are active" + offers);
  // } catch (err) {
  //   console.log(`There was an error connecting to Duffel: ${err}`);
  // }
});

module.exports = router;
