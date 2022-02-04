import { Duffel } from "@duffel/api";

const duffel = new Duffel({
  token: process.env.DUFFEL_API_TOKEN,
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

const offers = await duffel.offers.list(offerRequest.data.id);
console.log("flights are active" + offers);
