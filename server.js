const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

//assets
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

//set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Listening on port  ${PORT}`);
});
// cp node_modules/laravel-mix/setup/webpack.mix.js ./