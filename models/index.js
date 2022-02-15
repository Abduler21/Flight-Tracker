const PORT = 3005;
const axios = require("axios");
const express = require("express");
const app = express();

const User = require("./Users");
const Flights = require("./Flights");

module.exports = { User, Flights };
