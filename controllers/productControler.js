
const responses = require("../constant/responses.js");
const catchAynscErros = require("../middleware/catchAynscErros.js");
const productSchema = require("../model/productSchema.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandeler.js");

// create product 
const createProductController = catchAynscErros(async (req, res,next) => {
   req.body.user=req.user.id
    const product = await productSchema.create(req.body);
    if (!product) {
      return next(new ErrorHandler("Product not  created ", 404));
    
    } else {
      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS,
          data: product,
        })
      );
    }
  });


// all  product
const getAllproducts = catchAynscErros(async (req, res,next) => {
  const resultPerPage=5
  const productsCount = await productSchema.countDocuments();
  const apiFeature = new ApiFeatures(productSchema.find(),req.query).search().filter().pagination(resultPerPage)


  let data = await apiFeature.query;
    if (!data) {
      res.send(
        responses.genericResponse(500, false, null, {
          message: responses.FAILED,
        })
      );
    
    } else {
      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS,
          data: data,
          productsCount: productsCount,
        })
      );
    
    }
});


// update product 
const updateProduct = catchAynscErros (async (req, res,next) => {

  let data = await productSchema.findById(req.params.id)
   if (!data) {
      res.send(
        responses.genericResponse(500, false, null, {
          message: responses.FAILED,
        })
      );
    }
    else {
      data = await productSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
      })
      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS,
          data: data,
        })
      );
    }
});


// Delete product 
const deleteProduct =  catchAynscErros( async (req, res,next) => {
  const data = await productSchema.findByIdAndDelete(req.params.id);
    if (!data) {
      return next(new ErrorHandler("Product not found", 404));
      
    } else {
      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS_DELETE,

        })
      );
    }
  
});

// product detail

const getProductDetail = catchAynscErros(async (req, res,next) => {
  const data = await productSchema.findById(req.params.id);


    if (!data) {
      return next(new ErrorHandler("Product not found", 404));
    } 
    
    else {

      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS,
          data: data,
        })
      );
 
    }
});




module.exports = { getAllproducts, createProductController, updateProduct, deleteProduct, getProductDetail };
