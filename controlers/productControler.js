const {
  getAllproductsService,
  upDateProductService,
  deleteProductService
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


// all  product
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


// update product 
const updateProduct = async (req, res) => {
  const data = await upDateProductService(req.params.id,req.body);
  try {
   
    if (!data) {
      res.send(
        responses.genericResponse(500, false, null, {
          message: responses.PRODUCT_NOT_FOUND,
          data: data,
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


// Delete product 
const deleteProduct = async (req, res) => {
  const data = await deleteProductService(req.params.id);
  try {
   
    if (!data) {
      res.send(
        responses.genericResponse(500, false, null, {
          message: responses.PRODUCT_NOT_FOUND,
        })
      );
      return;
    } else {
      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS_DELETE,
         
        })
      );
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req, res) => {
  const data = await productSchema.findById(req.params.id);
  try {
   
    if (!data) {
      res.send(
        responses.genericResponse(500, false, null, {
          message: responses.PRODUCT_NOT_FOUND,
          data: data,
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




module.exports = { getAllproducts, createProductController,updateProduct,deleteProduct ,getSingleProduct};
