const authController = require("../app/http/contollers/authController");
const cartController = require("../app/http/contollers/customers/cartContoller");
const homeController = require("../app/http/contollers/homeController");
const orderController = require("../app/http/contollers/customers/customerOrderController");
const adminOrderController = require("../app/http/contollers/admin/adminOrderController");

// Middlewares
const guest = require("../app/http/middelware/guest");
const auth = require("../app/http/middelware/auth");
const admin = require("../app/http/middelware/admin");

// Routes
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

  //Customer routes
  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);

  //Admin routes
  app.get("/admin/orders", admin, adminOrderController().index);
};

module.exports = initRoutes;
