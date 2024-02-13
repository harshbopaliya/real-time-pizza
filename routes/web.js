const authController = require("../app/http/contollers/authController");
const cartContoller = require("../app/http/contollers/customers/cartContoller");
const homeController = require("../app/http/contollers/homeController");

function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/cart", cartContoller().index);
  app.get("/login", authController().login);
  app.get("/register", authController().register);
}

module.exports = initRoutes;
