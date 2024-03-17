const Order = require("../../../models/order");

function adminOrderController() {
  return {
    async index(req, res) {
      try {
        const orders = await Order.find({ status: { $ne: "completed" } })
          .sort({ createdAt: -1 })
          .populate("customerId", "-password")
          .exec();

        if (req.xhr) {
          return res.json(orders);
        } else {
          return res.render("admin/orders", { orders: orders });
        }
      } catch (err) {
        // Handle errors
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    },
  };
}

module.exports = adminOrderController;
