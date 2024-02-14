const authController = require("../app/http/contollers/authController");
const cartContoller = require("../app/http/contollers/customers/cartContoller");
const homeController = require("../app/http/contollers/homeController");

function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/login", authController().login);
  app.get("/register", authController().register);

  app.get("/cart", cartContoller().index);
  app.post("/update-cart", cartContoller().update);
}

module.exports = initRoutes;
