const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//Create Product -- Need Admin Access
exports.createProduct = catchAsyncError(async (req, res, next) => {
  //Image array
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  //Save link in the new array
  let imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  //Add imagesLink to images array
  req.body.images = imagesLink;
  //Add user id in req.body
  req.body.user = await req.user.id;
  //create new product
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  //Total product
  const productsCount = await Product.countDocuments();
  // Number of product you want to send
  const productsPerPage = 20;
  //Include the search, filter, pagination to your api
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  //Get product after search and filter
  let filterproducts = await apiFeature.query;
  //Count Product after filter
  const filteredProductsCount = filterproducts.length;
  //Pagination
  apiFeature.pagination(productsPerPage);
  //Get products by cloning the query to allow executing the query again
  const products = await apiFeature.query.clone();
  // Send response
  res.status(201).json({
    success: true,
    products,
    productsCount,
    productsPerPage,
    filteredProductsCount,
  });
});

//Get all product for admin
exports.getAllProductsAdmin = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(201).json({
    success: true,
    products,
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  //Find product
  let product = await Product.findById(req.params.id);
  // If product not found show error
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  // Send response
  res.status(200).json({
    success: true,
    product,
  });
});

// Update product -- Need Admin Access
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  // Find product
  let product = await Product.findById(req.params.id);
  // If product not found show error
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //Image array
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    //Delete product image from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    //Save link in the new array
    let imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Products",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
  }
  // Update the product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  //Send response
  res.status(200).json({
    success: true,
    product,
  });
});
//Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  // Find product
  let product = await Product.findById(req.params.id);
  // If product not found show error
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //Delete product image from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  //Delete product
  await product.remove();
  //Send response
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Write a review or Update a review
exports.createReview = catchAsyncError(async (req, res, next) => {
  //Get the values from request
  const { rating, comment, productId } = req.body;
  //Review object
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  //Find Product
  const product = await Product.findById(productId);
  //Check whether user reviewed the product or not
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  //Condition whether product already reviewed or not
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  //Average product rating
  let avg = 0;
  product.reviews.forEach((review) => {
    return (avg += review.rating);
  });
  product.ratings = avg / product.reviews.length;
  //Save the product
  await product.save({ validateBeforeSave: false });
  //Send response
  res.status(200).json({
    success: true,
    message: "Review saved successfully",
  });
});

//Get product's all reviews by admin
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  //Get query from request url
  const { productid } = req.query;
  //Find Product
  const product = await Product.findById(productid);
  //If product not found
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //Send response
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  //Get query form request url
  const { productid, reviewid } = req.query;
  //Find Product
  const product = await Product.findById(productid);
  //If product not found
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //Delete review
  const remainingReviews = product.reviews.filter(
    (review) => review._id.toString() !== reviewid.toString()
  );
  //Update number of reviews and rating of the product
  let avg = 0;
  remainingReviews.forEach((review) => {
    return (avg += review.rating);
  });

   let ratings = 0
   if(remainingReviews.length === 0) {
     ratings = 0
   } else {
     ratings = avg / remainingReviews.length;
   }
   
  const numberOfReviews = remainingReviews.length;

  //Update the product
  await Product.findByIdAndUpdate(
    productid,
    {
      reviews: remainingReviews,
      ratings,
      numberOfReviews,  
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  //Send response
  res.status(200).json({
    success: true,
    message: "Review has been deleted successfully",
  });
});
