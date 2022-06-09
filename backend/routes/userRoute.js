const express = require("express");
const router = express.Router();

const {registerUser,loginUser,logoutUser,forgotPassword,resetPassword,getUserDetails,updatePassword,updateProfile,getAllUsers,getUserDetailsByAdmin,roleChange,deleteUser} = require("../controllers/userController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

//Register
router.post("/signup",registerUser);
//Login
router.post("/login",loginUser);
//Forget Password
router.post("/password/forgot",forgotPassword);
//Reset Password
router.put("/password/reset/:token",resetPassword);
//Logout
router.get("/logout",logoutUser);
//User Profile - Accessed by user
router.get("/user/profile",isAuthenticatedUser,getUserDetails);
//User Password Update - Accessed by user
router.post("/user/password/update",isAuthenticatedUser,updatePassword);
//User Profile Update - Accessed by user
router.put("/user/profile/update",isAuthenticatedUser,updateProfile);
//Get All Users - Accessed by admin
router.get("/admin/users",isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
//Get User Details - Accessed by admin
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),getUserDetailsByAdmin);
//User Role Changed - Accessed by admin
router.put("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),roleChange);
//User Deleted - Accessed by admin
router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser);



module.exports = router;