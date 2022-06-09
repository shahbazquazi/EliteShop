const express = require('express');
const router = express.Router();

const { newOrder,getOrderDetails,userOrders,getAllOrders,updateOrderStatus,deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

//Create order
router.post("/order/new",isAuthenticatedUser,newOrder); 
//Get desire order details 
router.get("/order/:id",isAuthenticatedUser,getOrderDetails); 
//Get all orders
router.get("/orders",isAuthenticatedUser,userOrders); 
//For all orders and Total amount - Accessed by admin
router.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
//To update order status
router.put("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus);
//To delete order
router.delete("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);  



module.exports = router;

