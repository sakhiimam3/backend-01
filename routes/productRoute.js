const productRouter = require("express").Router();
const productControler = require("../controlers/productControler");

productRouter.get("/products", productControler.getAllproducts);
productRouter.post("/products", productControler.createProductController);
module.exports = productRouter;
