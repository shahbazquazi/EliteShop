const express = require("express");
const router = express.Router();

const { getAllProducts,getAllProductsAdmin,createProduct,updateProduct,deleteProduct,getProductDetails,createReview,getAllReviews,deleteReview} = require("../controllers/productController");

const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

//Get all products
router.get("/products",getAllProducts);
//Get all products - Accessed by admin
router.get("/admin/products",isAuthenticatedUser,authorizeRoles("admin"),getAllProductsAdmin);
//Create new product - Accessed by admin
router.post("/admin/product/new",isAuthenticatedUser,authorizeRoles("admin"),createProduct);
//update product - Accessed by admin
router.put("/admin/product/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
//Delete product - Accessed by admin
router.delete("/admin/product/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
//Get product details - Accessed by user and admin
router.get("/product/:id",getProductDetails);
//Create and update review - Accessed by user and admin
router.put("/review",isAuthenticatedUser,createReview);
//Get all reviews - Accessed by user and admin
router.get("/reviews",getAllReviews);
//Delete review - Accessed by user and admin
router.delete("/reviews",isAuthenticatedUser,deleteReview);


module.exports = router;