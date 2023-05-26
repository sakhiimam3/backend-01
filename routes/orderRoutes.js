const orderRoutes = require("express").Router();
const orderController = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


orderRoutes.post("/order/new",isAuthenticatedUser,orderController.newOrder);
orderRoutes.get("/order/me",isAuthenticatedUser,orderController.myOrders)
orderRoutes.get("/order/:id",isAuthenticatedUser,orderController.getSingleOrder);
orderRoutes.get("/admin/Orders",isAuthenticatedUser,authorizeRoles("admin"),orderController.getAllOrder);
orderRoutes.put("/admin/Order/:id",isAuthenticatedUser,authorizeRoles("admin"),orderController.updateOrder)
orderRoutes.delete("/admin/Order/:id",isAuthenticatedUser,authorizeRoles("admin"),orderController.deleteOrder);



module.exports = orderRoutes;

