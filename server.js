const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Starting up server for node (universal code)//

app.listen(PORT, function () {
  console.log(
    "==>   Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
