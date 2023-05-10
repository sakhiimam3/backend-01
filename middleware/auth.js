const ErrorHander = require("../utils/errorHandeler");
const catchAsyncErrors = require("./catchAynscErros");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const  {token} = req.cookies;
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
 
   req.user = await User.findById(decodedData.id);
   let data=await User.findById(decodedData.id);
   console.log(data,"data123")

   next();
});


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
           403
        )
      );
    }

    next();
  };
};