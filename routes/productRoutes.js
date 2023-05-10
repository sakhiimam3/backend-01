const productRouter = require("express").Router();
const productControler = require("../controllers/productControler");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

productRouter.get("/products",  productControler.getAllproducts);
productRouter.get("/products/:id", productControler.getProductDetail);
productRouter.post("/products/create",isAuthenticatedUser, authorizeRoles('admin'),productControler.createProductController);
productRouter.put("/products/:id",isAuthenticatedUser,authorizeRoles('admin'), productControler.updateProduct);
productRouter.delete("/products/:id",isAuthenticatedUser,authorizeRoles('admin'),productControler.deleteProduct);


module.exports = productRouter;
