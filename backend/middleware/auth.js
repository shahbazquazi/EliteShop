const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {Token} = req.cookies;

    // if cookie has no value for token send error
    if(!Token){
        return next(new ErrorHandler("Please login to access this feature",401));
    }
    // if token is present
    const verifyToken = jsonwebtoken.verify(Token,process.env.JWT_SECRET);

   req.user =  await User.findById(verifyToken.id);
   next();
});

exports.authorizeRoles = (...roles)=>{
   return (req,res,next) => {
       // Check whether user is admin or not
       if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this feature`,403));
       }
       next();
   }
};
