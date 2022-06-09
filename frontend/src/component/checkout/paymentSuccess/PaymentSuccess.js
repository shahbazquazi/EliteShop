import React,{useEffect} from 'react';
import './PaymentSuccess.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";

function PaymentSuccess() {
  
  useEffect(() => {
    localStorage.removeItem('myCheckoutInfo')
  }, []);
  
  return (
    <>
       <div className="paymentSuccess">
           <FaCheckCircle/>
           <Typography>
               Your order has been placed successfully
           </Typography>
           <Link to="/orders">Your Orders</Link>
       </div>

    </>
  )
}

export default PaymentSuccess