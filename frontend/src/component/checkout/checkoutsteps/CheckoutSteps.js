import React from 'react';
import './CheckoutSteps.css';
import { Typography,Stepper,Step,StepLabel } from '@mui/material';
import { FaShippingFast,FaBox,FaRupeeSign } from "react-icons/fa";


function CheckoutSteps({activeStep}) {
   
  const steps = [
       {
           label: <Typography>Checkout Details</Typography>,
           icon: <FaShippingFast/>
       },
       {
           label: <Typography>Confirm Order</Typography>,
           icon: <FaBox/>
       },
       {
           label: <Typography>Payment</Typography>,
           icon: <FaRupeeSign/>
       }
  ];

  const stepperStyle = {
      margin:"10%",
      color:"rgb(37, 133, 45)",
    }

  return (
    <> 
       <Stepper alternativeLabel activeStep={activeStep} style={stepperStyle}>
          {steps.map((item,index)=>{
             return <Step key={index} active={activeStep === index ?true : false} completed={activeStep >= index ? true : false}>
                 <StepLabel icon={item.icon} style={{color: activeStep >= index ? "rgb(37, 133, 45)" : "rgba(37, 133, 45,0.3)" }}>{item.label}
                 </StepLabel>
              </Step>
          })}
       </Stepper>
    </>
  )
}

export default CheckoutSteps