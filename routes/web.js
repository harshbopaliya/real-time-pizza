const authController = require("../app/http/contollers/authController")
const cartController = require("../app/http/contollers/customers/cartContoller");
const homeController = require("../app/http/contollers/homeController");

// Middlewares
const guest = require("../app/http/middelware/guest");

const initRoutes = (app) => {
  // Home Page
  app.get("/", homeController().index);

  // Login-Register-Logout
  app.get("/login", authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  // Cart Page
  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);
};

module.exports = initRoutes;
