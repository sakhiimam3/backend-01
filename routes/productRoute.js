const productRouter = require("express").Router();
const productControler = require("../controlers/productControler");

productRouter.get("/products", productControler.getAllproducts);

module.exports = productRouter;
