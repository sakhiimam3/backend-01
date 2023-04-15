const productRouter = require("express").Router();
const { productControler } = require("../controlers/productControler");

productRouter.get("/allproduct", productControler.getAllproducts);

module.exports = productRouter;
