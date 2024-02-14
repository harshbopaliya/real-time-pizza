const Menu = require("../../models/menu");
/*
function homeController() {
  //factory function
  return {
    //crud controller
    async index(req, res) {
      const pizzas = await Menu.find();
      console.log(pizzas);
      return res.render("home", { pizzas: pizzas });
    },
  };
}
*/
function homeController() {
  return {
    async index(req, res) {
      try {
        const pizzas = await Menu.find();
        //console.log(pizzas);
        return res.render("home", { pizzas: pizzas });
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
    },
  };
}

module.exports = homeController;
