const authController = require("../app/http/contollers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");
const guest = require("../app/http/middelware/guest");
function initRoutes(app) {
  app.get("/", homeController().index);
  app.get("/login", guest, authController().login); // GET request for login page
  app.post("/login", authController().postLogin); // POST request for login action
  app.get("/register", authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);


  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);
}

module.exports = initRoutes;
