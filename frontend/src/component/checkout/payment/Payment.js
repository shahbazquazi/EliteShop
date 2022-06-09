import './Payment.css';
import React, {useEffect,useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import MetaData from '../../layout/title/MetaData';
import CheckoutSteps from '../checkoutsteps/CheckoutSteps';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import {CardCvcElement, CardExpiryElement,CardNumberElement, useStripe,useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import { FaCreditCard,FaCalendarAlt,FaKey} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import { clearErrors, createOrder } from '../../../actions/orderActions';

function Payment() {
  
    //useRef
    const payRef = useRef(null);
    //To navigate
    const navigate = useNavigate();
    //Dispatch
    const dispatch = useDispatch();
    //Alert
    const alert = useAlert();
    //Stripe
    const stripe = useStripe();
    //Element
    const elements = useElements();
    // Get the values from session storage
    const orderInfo = JSON.parse(sessionStorage.getItem('OrderInfo'));
    //Get the values of checkout from local storage
    const myCheckoutInfo = JSON.parse(localStorage.getItem('myCheckoutInfo'));
    //Get the value from cart and user and order state 
    const {cartItems} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.user);
    const {error} = useSelector(state => state.order);

   //paymentData 
   const paymentData = {
       amount: Math.round(orderInfo.totalPrice * 100),
   };

   //order
   const order = {
       shippingInfo: myCheckoutInfo,
       orderItems: cartItems,
       itemsPrice: orderInfo.subtotal,
       taxPrice: orderInfo.tax,
       shippingPrice: orderInfo.shippingCharges,
       totalPrice: orderInfo.totalPrice

   }

   // On submit 
    const submitHandle = async (e) => {
       e.preventDefault();

       payRef.current.disabled = true;
       try {
           const config = {
               headers: {
                   "Content-Type": "application/json",
               } 
           };
           
           const {data} = await axios.post('/api/payment/process',paymentData,config);
           
           const client_secret = data.client_secret;

           if(!stripe || !elements) {
               return;
           }

           const result = await stripe.confirmCardPayment(client_secret,{
               payment_method: {
                   card: elements.getElement(CardNumberElement),
                   billing_details: {
                       name: user.name,
                       email: user.email,
                       address: {
                           line1: myCheckoutInfo.address,
                           city: myCheckoutInfo.city,
                           state: myCheckoutInfo.state,
                           postal_code: myCheckoutInfo.pincode,
                           country: myCheckoutInfo.country
                       }
                   }
               }
           });

           if(result.error) {
               payRef.current.disabled = false;
               alert.error(result.error.message);
           }else {
               if(result.paymentIntent.status === "succeeded") {
                   //Add paymentInfo in order object
                   order.paymentInfo = {
                       id: result.paymentIntent.id,
                       status: result.paymentIntent.status,
                   } 
                   dispatch(createOrder(order));

                   navigate('/success');
               }else{
                   alert.error("Something went wrong while processing the payment");
               }
           }

       } catch (error) {
           payRef.current.disabled = false;
           alert.error(error.response.data.message);
       }

    }

   useEffect(() => {
     if(error) {
         alert.error(error);
         dispatch(clearErrors());
     }
   
     
   }, [dispatch, error, alert])
   

  return (
    <>
     <MetaData title={"Payment"}/>
     <CheckoutSteps activeStep={2}/>
     <div className="paymentContainer">
         <form onSubmit={submitHandle} className="paymentForm">
             <Typography>Card Info</Typography>
             <div>
                 <FaCreditCard/>
                 <CardNumberElement className='paymentInput'/>
             </div>
             <div>
                 <FaCalendarAlt/>
                 <CardExpiryElement className='paymentInput'/>
             </div>
             <div>
                 <FaKey/>
                 <CardCvcElement className='paymentInput'/>
             </div>
             
             <input type="submit" ref={payRef} value={`Pay - \u20B9${orderInfo && orderInfo.totalPrice }`} className="paymentBtn" />



         </form>
     </div>
    </>
  )
}

export default Payment