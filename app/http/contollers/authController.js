function authController() {
  //factory function
  return {
    //crud controller
    login(req, res) {
      res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    },
  };
}

module.exports = authController;
