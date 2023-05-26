
const responses = require("../constant/responses.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const productSchema = require("../model/productSchema.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandeler.js");

// create product  --admin
const createProductController = catchAsyncErrors(async (req, res,next) => {
   req.body.user=req.user.id
    const product = await productSchema.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  });


// Get All Product
const getAllproducts = catchAsyncErrors(async (req, res,next) => {
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

// Get All Product (Admin)
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await productSchema.find();

  res.status(200).json({
    success: true,
    products,
  });
});


// update product 
const updateProduct = catchAsyncErrors (async (req, res,next) => {

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
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }

  await productSchema.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});



// product detail

const getProductDetail = catchAsyncErrors(async (req, res,next) => {
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


// Create New Review or Update the review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productSchema.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  console.log(isReviewed,"12345677888")

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await productSchema.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});


module.exports = { getAllproducts, createProductController, updateProduct, deleteProduct, getProductDetail,createProductReview,getAdminProducts,getProductReviews ,deleteReview};
