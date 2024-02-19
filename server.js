require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const url = process.env.MONGO_CONNECTION_URL;
const passport = require("passport");

//Database Connection
mongoose
  .connect(url, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((e) => console.log("No connection"));

//session store
// const connection = mongoose.connection;

let mongoStore = new MongoStore({
  //mongooseConnection: connection,
  mongoUrl: process.env.MONGO_CONNECTION_URL,
  collection: "sessions",
});

//session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours,
  })
);

//passport config

const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//global midddelware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// Database options

//set Template engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources", "views"));

// require("./routes/web").default(app);
const d = require("./routes/web");
d(app);

app.listen(PORT, () => {
  console.log(`Listening on port  ${PORT}`);
});
// cp node_modules/laravel-mix/setup/webpack.mix.js ./
