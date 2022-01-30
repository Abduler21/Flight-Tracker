const express = require("express");
const router = express.Router();
const User = require("../Models/Users");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      console.log("Users not found");
    }

    console.log(`Users were found! =====: ${users}`);
  } catch (err) {
    console.log(`Could not get all users ${err}`);
  }
});
router.post("/", async (req, res) => {
  console.log("route hit");
  return res.status(200).json({
    status: "success",
    message: "signed up",
  });
});
module.exports = router;
