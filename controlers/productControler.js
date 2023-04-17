const {
  getAllproductsService,
  createProductService,
} = require("../services/productService.js");
const responses = require("../constant/responses.js");
const productSchema = require("../model/productSchema.js");

// create product
const createProductController = async (req, res) => {
  try {
    const product = await productSchema.create(req.body);
    if (!product) {
      res.send(
        responses.genericResponse(500, false, null, {
          message: responses.FAILED,
        })
      );
    } else {
      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS,
          data: product,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllproducts = async (req, res) => {
  const data = await getAllproductsService();
  try {
    if (!data) {
      res.send(
        responses.genericResponse(500, false, null, {
          message: responses.FAILED,
        })
      );
      return;
    } else {
      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS,
          data: data,
        })
      );
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllproducts, createProductController };
