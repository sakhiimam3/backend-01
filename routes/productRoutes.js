const productRouter = require("express").Router();
const productControler = require("../controllers/productControler");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

productRouter.get("/products",  productControler.getAllproducts);
productRouter.get("/products/:id", productControler.getProductDetail);
productRouter.post("/admin/products/create",isAuthenticatedUser, authorizeRoles('admin'),productControler.createProductController);

productRouter.get("/admin/products",isAuthenticatedUser, authorizeRoles('admin'),  productControler.getAdminProducts);
productRouter.put("/admin/products/:id",isAuthenticatedUser,authorizeRoles('admin'), productControler.updateProduct);
productRouter.delete("/admin/products/:id",isAuthenticatedUser,authorizeRoles('admin'),productControler.deleteProduct);
productRouter.put("/review",isAuthenticatedUser,productControler.createProductReview);
productRouter.get("/review",productControler.getProductReviews)
productRouter.delete("/review",isAuthenticatedUser,productControler.deleteReview);

module.exports = productRouter;
