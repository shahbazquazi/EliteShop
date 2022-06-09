const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const {sendEmail} = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");


//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const myCloudinary = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "Avatars",
        width: 150,
        crop: "scale"
    })

    const { name, email, password } = req.body;
    //create user
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloudinary.public_id,
            url: myCloudinary.secure_url
        }
    });
   // Once the user is created send him the jwt token
   sendToken(user,201,res);

});

//Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    //Checking whether a credential is given or not
    if (!email || !password) {
        return next(new ErrorHandler("Enter your credentials", 400))
    };
    //Checking user's given credentials in the database
    const user = await User.findOne({ email }).select("+password");
    //user is not there in database
    if (!user) {
        return next(new ErrorHandler("Invalid Email and Password", 401));
    }
    //Match the user's password
    const passwordMatched = await user.comparePassword(password);
    //Password not matched
    if (!passwordMatched) {
        return next(new ErrorHandler("Invalid Email and Password", 401))
    }
    // if user credentials is matched, login the user and send the jwt token
    sendToken(user,200,res);
});

//Logout User
exports.logoutUser = catchAsyncError(async (req,res,next)=>{
    //Clear cookie
    res.cookie("Token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });
    //Sending response
    res.status(200).json({
        success:true,
        message: "Successfully loggedout"
    })
});

// Forgot Password
exports.forgotPassword = catchAsyncError( async (req,res,next)=>{
    //Find the user who is requesting to change the password
     const user = await User.findOne({email:req.body.email});
     // if user not found show him error
     if(!user){
         return next(new ErrorHandler("Email does not exist",404));
     };
     //Get reset password token from a method
     const resetToken = user.getResetPasswordToken();
     //Save the user to save the values in resetPasswordToken and resetPasswordExpire
     await user.save({ validateBeforeSave:false });
     //Url for reset password
     const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;
     //Message to user of reset password
     const message = `Hi ${user.name}, \n\nYour password reset token is : \n\n ${resetPasswordUrl} \n\n This token is only valid for 15 minutes.`;

     try {
         //Send Email to user
         await sendEmail({
             useremail: user.email,
             subject:'Eliteshop Password Recovery',
             message
         });
         //Send response
         res.status(200).json({
             success: true,
             message: `Email sent to ${user.email} successfully`
         });
     } catch (error) {
         //If error occurs first set the user's resetPasswordToken and resetPasswordExpire property to undefined 
         user.resetPasswordToken = undefined;
         user.resetPasswordExpire = undefined;
         //Save the user again
         await user.save({ validateBeforeSave:false });
         // Send Error
         return next(new ErrorHandler(error.message,500));
     }

});

//Reset Password
exports.resetPassword = catchAsyncError( async (req,res,next)=>{
    //Get the token from request url
    const token = req.params.token;
    //Hash the token
     const resetPasswordToken =  crypto.createHash("sha256").update(token).digest("hex");
     //Find the user with the token
     const user = await User.findOne({
         resetPasswordToken,
         resetPasswordExpire: { $gt: Date.now() }
        });
     //If user not found show error
     if(!user){
         return next(new ErrorHandler("Token has been expired",400))
     };
     // if user is found, Match the password with the confirm password   
     if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password not matched",400))
     };
     // change the password
     user.password = req.body.password;
     // Change the value of resetPasswordToken and resetPasswordExpire
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;
     //Save the user
     await user.save();
     //Login the user
     sendToken(user,200,res);
});

//Get user details
exports.getUserDetails = catchAsyncError(async (req,res,next)=>{
    //find the user
    const user = await User.findById(req.user.id);
    
    //Send response
    res.status(200).json({
        success: true,
        user
    })
});

//Update password - by loggedin user
exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    //get values from request
    const {oldPassword,newPassword,confirmPassword} = req.body;
    //find user
    const user = await User.findById(req.user.id).select("+password");
     //Match the user's password
     const passwordMatched = await user.comparePassword(oldPassword);
     //Password not matched
     if (!passwordMatched) {
         return next(new ErrorHandler("Password does not match", 401))
     }
     //New password not matched with confirm password
     if (newPassword !== confirmPassword) {
         return next(new ErrorHandler("New Password and Confirm Password are not same", 401));
     }
    //Change password
    user.password = newPassword;
    //save user with new password
    await user.save();
    //Send token 
    sendToken(user,200,res);
});

//Update user profile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    //Get values from request
    const {name,email,avatar} = req.body;
    //Save request values in a object
    const updatedEntries = {
         name,
         email
    };
    if(avatar !== "") {
        const user = await User.findById(req.user.id);
        const imgId = user.avatar.public_id;
         //Delete image in cloudinary
        await cloudinary.v2.uploader.destroy(imgId);
        //Upload a new image in cloudinary
        const myCloudinary = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: "Avatars",
            width: 150,
            crop: "scale"
        });
        updatedEntries.avatar = {
            public_id: myCloudinary.public_id,
            url: myCloudinary.secure_url
        }
    }
    //update user profile
     await User.findByIdAndUpdate(req.user.id,updatedEntries,{
        new:true,
        runValidators:true,
        useFindAndModify: false 
    });
   //Send response
   res.status(200).json({
       success: true,
   })
});

//Get all the users - Accessed by admin
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
     //find all the users
     const allUsers = await User.find();
     //Send response
     res.status(200).json({
         success:true,
         allUsers
     });
});

//Get user detail - Accessed by admin
exports.getUserDetailsByAdmin = catchAsyncError(async(req,res,next)=>{
    //Get the id from request url
     const {id} = req.params;
     //Find the desired user
     const user = await User.findById(id);
     //if User not found
     if(!user){
         return next(new ErrorHandler(`User does not exist with id:${id}`,400));
     };
     //Send response
     res.status(200).json({
         success:true,
         user
     });
});

//Change the role of user - Accessed by admin
exports.roleChange = catchAsyncError(async(req,res,next)=>{
     //Get the values from request
     const {name,email,role} = req.body;
     const {id} = req.params;
     //object for update the user
     const changeUserRole = {
         name,
         email,
         role
     };
     // Update the changes
     const user = await User.findByIdAndUpdate(id,changeUserRole,{
         new:true,
         runValidators:true,
         useFindAndModify:false
     });
     //If user not found 
     if(!user){
         return next(new ErrorHandler(`User does not exist with id: ${id}`));
     };

     // Send response
     res.status(200).json({
         success:true,
         user
     });
});

//User deleted - Accessed by admin
exports.deleteUser = catchAsyncError(async(req,res,next)=>{
     //Get the id from request url
     const {id} = req.params;
     //Find user
     const user = await User.findById(id); 
     //If user not found
     if (!user) {
        return next(new ErrorHandler(`User does not exist with id:${id}`,400));
     }; 
     //Image id
     const imgId = user.avatar.public_id;
     //Delete image in cloudinary
    await cloudinary.v2.uploader.destroy(imgId);
     //Delete user
     await user.remove();
     //Send response
     res.status(200).json({
         success:true,
         message:"User deleted successfully"
     });
});