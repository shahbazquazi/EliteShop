const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create new order
exports.newOrder = catchAsyncError(async(req,res,next)=>{
     //Get the value from request
     const {
         shippingInfo,
         orderItems,
         paymentInfo,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice
     } = req.body;

     //Create order
     const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
     });
     //Send response
     res.status(201).json({
         success: true,
         order
     });
});

//Get order details
exports.getOrderDetails = catchAsyncError(async(req,res,next)=>{
    //Get values from request url
    const {id} = req.params;
    //Find Order
    const order = await Order.findById(id).populate("user","name email");
    //If order not found 
    if (!order) {
        return next(new ErrorHandler(`Order does not found with ${id}`,404));
    };
    //Send response
    res.status(200).json({
        success:true,
        order
    });
});

//Get all orders
exports.userOrders = catchAsyncError(async(req,res,next)=>{
    //Find Order
    const orders = await Order.find({user:req.user._id});
    //If order not found 
    if (!orders) {
        return next(new ErrorHandler(`Order does not found`,404));
    };
    //Send response
    res.status(200).json({
        success:true,
        orders
    });
});

//Get all orders with total amount recieved - Accessed by admin 
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    //Find Order
    const orders = await Order.find();
    //If order not found 
    if (!orders) {
        return next(new ErrorHandler(`No Order found`,404));
    };
    //Total amount recieved
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    //Send response
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    });
});

//Update order status - Accessed by admin 

//Function for updating the stock
const updateStock = async (productid,quantity)=>{
    //Find product
    const product = await Product.findById(productid);
    //change the stock of product
    product.stock -= quantity;
    //Save product
    await product.save({ validateBeforeSave: false });
};
exports.updateOrderStatus = catchAsyncError(async(req,res,next)=>{
    //Find Order
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler(`Order does not found`,404));
    };
    //If order already delivered
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Order has been delivered",400));
    }
    //Update the stock
   if(req.body.status === "Shipped") {
    order.orderItems.forEach(async(item) => {
        await updateStock(item.productId,item.quantity);
    });
   }
    //Change the status
    order.orderStatus = req.body.status;   
    //If status is delivered in request
    if (req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    };
    //Save the order
    await order.save({ validateBeforeSave: false });
    //Send response
    res.status(200).json({
        success:true,
        message:"Order status has been updated successfully "
    });
});

//Delete order - Accessed by admin 
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    //Find Order
    const order = await Order.findById(req.params.id);
    //If order not found 
    if (!order) {
        return next(new ErrorHandler(`Order does not found`,404));
    };
    //Delete order
    await order.remove();
    //Send response
    res.status(200).json({
        success:true,
        message:"Order has been deleted successfully"
    });
});