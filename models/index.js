const PORT = 3005;
const axios = require("axios");
const express = require("express");
const app = express();

const User = require("./users");
const Flights = require("./flights");

module.exports = { User, Flights };
