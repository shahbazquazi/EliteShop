import React, {useEffect} from 'react';
import './OrderDetails.css';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import MetaData from '../layout/title/MetaData';
import Typography from '@mui/material/Typography';
import {useAlert} from 'react-alert';
import Loader from '../layout/loader/Loader';
import { orderDetails, clearErrors } from '../../actions/orderActions';

function OrderDetails() {

    //Get the value from orderDetails state
    const {order, loading, error} = useSelector(state => state.orderDetails);
    //useDispatch
    const dispatch = useDispatch();
    //Alert
    const alert = useAlert();
    //Params
    const params = useParams();

    //useEffect
    useEffect(() => {
     if (error) {
         alert.error(error);
         dispatch(clearErrors());
     }
     dispatch(orderDetails(params.id));
    }, [dispatch,alert,error,params.id])
    

  return (
    <>
       {loading ? <Loader/> : (
           <>
            <MetaData title="Order Details"/>

            <div className="orderDetails">
                 <div className="orderDetailsContainer">
                     <Typography component="h1">Order #{order && order._id}</Typography>
                     <Typography>Shipping Info</Typography>
                     <div className="orderDetailsBox">
                         <div>
                             <p>Name:</p>
                             <span>{order.user && order.user.name}</span>
                         </div>
                         <div>
                             <p>Phone:</p>
                             <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                         </div>
                         <div>
                             <p>Address:</p>
                             <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pincode}`}</span>
                         </div>
                     </div>
                     <Typography>Payment</Typography>
                        <div className="orderDetailsBox">
                             <div>
                                 <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>

                                 {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "Paid" : "Unpaid"} 

                                 </p>
                             </div>
                             <div>
                                 <p>Account:</p>
                                 <span>{order.totalPrice && order.totalPrice}</span>
                             </div>
                        </div>
                        <Typography>Order Status</Typography>
                        <div className="orderDetailsBox">
                              <div>
                                  <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>

                                  {order.orderStatus && order.orderStatus}
                                  </p>
                              </div>
                        </div>
                 </div>
                <div className="orderItems">
                    <Typography>Ordered Products</Typography>
                    <div className="orderItemsContainer">
                          {order.orderItems && 
                          order.orderItems.map((item)=>{
                            return  (<div key={item.productId}>
                                <Link to={`/product/${item.productId}`}>
                                    <img src={item.image} alt={item.name} /></Link>
                                <Link to={`/product/${item.productId}`}>{item.name}:{""}</Link>
                                <span>
                                    {item.quantity} x &#8377;{item.price} = <b>&#8377;{item.quantity * item.price}</b>
                                </span>
                            </div>)
                          })
                          }
                    </div>
                </div>
            </div>
           </>
       )}
    </>
  )
}

export default OrderDetails