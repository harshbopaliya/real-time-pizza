const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const url =
  "mongodb+srv://Harsh:Harsh%406790@cluster0.zxig3bj.mongodb.net/pizza";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((e) => console.log("No connection"));

//assets
app.use(express.static("public"));

// Connection URL

// Database options

//set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Listening on port  ${PORT}`);
});
// cp node_modules/laravel-mix/setup/webpack.mix.js ./
