import React from 'react';
import './ConfirmOrder.css';
import { useSelector } from 'react-redux';
import MetaData from '../../layout/title/MetaData';
import { Link,useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import CheckoutSteps from '../checkoutsteps/CheckoutSteps';

function ConfirmOrder() {
    //To Navigate
    const navigate = useNavigate();
    //Get the value of cartItems and checkoutInfo from cart state
    const { cartItems} = useSelector(state => state.cart);
    //Get user from user state
    const { user } = useSelector(state => state.user);

    //show cart for the loggedin user
    const myCart = []
    cartItems.forEach((cartItem) => {
        if(user && cartItem.userId === user._id) {
            myCart.push(cartItem);
        }
    });

    //Get the myCheckoutInfo from local storage
    const myCheckoutInfo = JSON.parse(localStorage.getItem('myCheckoutInfo'));

    ///subtotal
    const subtotal = myCart.reduce(
        (accumulator, item) => accumulator + item.quantity * item.price
        , 0);

    //Shipping Charges
    const shippingCharges = subtotal > 1000 ? 0 : 200;

    //Tax
    const tax = subtotal * 0.18;

    //Total Price
    const totalPrice = subtotal + shippingCharges + tax;

    //Address
    const address = `${myCheckoutInfo.address},${myCheckoutInfo.city},${myCheckoutInfo.state},${myCheckoutInfo.pincode},${myCheckoutInfo.country}`; 

    const paymentHandle = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }
        sessionStorage.setItem("OrderInfo",JSON.stringify(data));
        navigate("/process/payment");
    }


    return (
        <>
            <MetaData title={"Confirm Order"} />
            <CheckoutSteps activeStep={1} />

            <div className="confirmOrder">
                <div>
                    <div className='confirmCheckoutDetails'>
                        <Typography>Checkout Details</Typography>
                        <div className="confirmCheckoutBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{myCheckoutInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>&#8377;{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>&#8377;{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>&#8377;{tax}</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p><b>Total:</b></p>
                        <span>&#8377;{totalPrice}</span>
                    </div>

                    <button className='paymentBtn' onClick={paymentHandle}>Proceed to Payment</button>
                </div>


                <div className="confirmCartItems">
                    <Typography>Cart Items</Typography>
                    <div className="confirmCartItemsContainer">
                        {cartItems && myCart.map((item) => {
                            return <div key={item.productId}>
                                <Link to={`/product/${item.productId}`}>
                                    <img src={item.image} alt={item.name} /></Link>
                                <Link to={`/product/${item.productId}`}>{item.name}:{""}</Link>
                                <span>
                                    {item.quantity} x &#8377;{item.price} = <b>&#8377;{item.quantity * item.price}</b>
                                </span>
                            </div>
                        })}
                    </div>
                </div>
                <div className='empty'>
                    {""}
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder

