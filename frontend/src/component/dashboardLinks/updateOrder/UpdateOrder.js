import React, { useEffect, useState } from "react";
import "./UpdateOrder.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../layout/title/MetaData";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Sidebar from "../../../pages/dashboard/Sidebar";
import { clearErrors, orderDetails } from "../../../actions/orderActions";
import { useAlert } from "react-alert";
import Loader from "../../layout/loader/Loader";
import { MdAccountTree } from "react-icons/md";
import { updateOrdersAdmin } from "../../../actions/orderActions";
import { ADMIN_UPDATE_ORDER_RESET } from "../../../constants/orderConstant";

function UpdateOrder() {
  // Dispatch
  const dispatch = useDispatch();
  //Get id from params
  const { id } = useParams();
  //To alert
  const alert = useAlert();
  //Get order details from orderDetails state
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  //Get value from updateOrder
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateOrder
  );
  //Status state
  const [status, setStatus] = useState(" ");

  // useEffect
  useEffect( () => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: ADMIN_UPDATE_ORDER_RESET });
    }
     dispatch(orderDetails(id));
  }, [dispatch, error, alert, id, isUpdated, updateError]);

  //Form submit handler
  const updateOrderSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrdersAdmin(id, myForm));
  };

  return (
    <>
      <MetaData title="Order Details" />
      <div className="dashboard">
        <Sidebar />
        <div className="createProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="confirmOrder" 
            style={{ display: order.orderStatus === "Delivered" ? "block" : "grid"}}
            >
              <div>
                <div className="confirmCheckoutDetails">
                  <Typography className="checkoutDetailsHeading">
                    Order Details
                  </Typography>
                  <div className="orderDetailsInfo">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pincode}`}
                      </span>
                    </div>
                  </div>
                </div>
                <Typography className="paymentHeading">Payment</Typography>
                <div className="orderDetailsInfo">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "Paid"
                        : "Unpaid"}
                    </p>
                  </div>
                  <div>
                    <p>Account:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
                <Typography className="orderStatusHeading">
                  Order Status
                </Typography>
                <div className="orderDetailsInfo">
                  <div>
                    <p
                      className={
                        order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
               style={{display: order.orderStatus === "Delivered" ?"none" : "block"}}
               >
              <form
                className="createOrderForm"
                encType="multipart/form-data"
                onSubmit={updateOrderSubmit}
              >
                <h1 className="updateOrderHeading">Update Order</h1>

                <div 
                >
                  <MdAccountTree />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Options</option>
                    {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                    )}
                    {order.orderStatus === "Shipped" && (
                       <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  className="createOrderBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Update
                </Button>
              </form>
              </div>

              <div className="confirmCartItems">
                <Typography className="orderItemsHeading">
                  Order Items
                </Typography>
                <div className="confirmCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => {
                      return (
                        <div key={item.productId}>
                          <Link to={`/product/${item.productId}`}>
                            <img src={item.image} alt={item.name} />
                          </Link>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}:{""}
                          </Link>
                          <span>
                            {item.quantity} x &#8377;{item.price} ={" "}
                            <b>&#8377;{item.quantity * item.price}</b>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="empty">{""}</div>
            </div>
            )}
        </div>
      </div>
    </>
  );
}

export default UpdateOrder;
