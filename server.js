//Dependencies//
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");

//connecting to mysql database//
const db = require("./config/config");
db.authenticate()
  .then(() => console.log("connected to mysql database"))
  .catch((err) => console.log(`error: ${err}`));

const app = express();
const PORT = process.env.PORT || 3005;
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//Middleware//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//routes API//
app.use("/api/user", require("./routes/user-routes"));
app.use("/", require("./routes/html-routes"));

// Starting up server for node (universal code)//
app.listen(PORT, function () {
  console.log(
    "==>   Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
