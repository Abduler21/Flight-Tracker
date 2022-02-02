const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const flightRoutes = require("./flights-routes");

router.use("/users", userRoutes);
router.use("/flights", flightRoutes);
module.exports = router;
