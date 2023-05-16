const orderRoutes = require("express").Router();
const orderController = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


orderRoutes.post("/order/new",isAuthenticatedUser,orderController.newOrder);
orderRoutes.get("/order/me",isAuthenticatedUser,orderController.myOrders)
orderRoutes.get("/order/:id",isAuthenticatedUser,orderController.getSingleOrder);

module.exports = orderRoutes;

