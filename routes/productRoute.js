const productRouter = require("express").Router();
const productControler = require("../controlers/productControler");

productRouter.get("/products", productControler.getAllproducts);
productRouter.get("/products/:id", productControler.getSingleProduct);
productRouter.post("/products/new", productControler.createProductController);
productRouter.put("/products/:id", productControler.updateProduct);
productRouter.delete("/products/:id", productControler.deleteProduct);



module.exports = productRouter;
