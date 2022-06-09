import React from 'react';
import './Cart.css';
import CartItem from '../../component/cartItem/CartItem';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart,removeFromCart} from '../../actions/cartActions';
import { MdRemoveShoppingCart } from "react-icons/md";
import Typography from '@mui/material/Typography';
import {Link,useNavigate} from 'react-router-dom';
import MetaData from '../../component/layout/title/MetaData';

function Cart() {
    //To navigate
    const navigate = useNavigate();
    //Dispatch
    const dispatch = useDispatch();
    //Get the cart items from state
    const {cartItems,checkoutInfo} = useSelector(state => state.cart);
    //Get the user from state
    const {user} = useSelector(state => state.user);
    // //Get the value of checkoutInfo from local storage
    // const checkoutInfo = JSON.parse(localStorage.getItem('checkoutInfo'));
    
    //show cart for the loggedin user
    const myCart = []
    cartItems.forEach((cartItem) => {
        if(user && cartItem.userId === user._id) {
            myCart.push(cartItem);
        }
    });

    const myCheckoutInfo = []
    const notCheckoutInfo = {
        phoneNo:"",
        address:"",
        city:"",
        pincode:"",
        country:"",
        state:"",
    }
    const saveMyCheckoutInfo = async () => {
    await checkoutInfo.forEach((item) => {
        if(user && item.userId === user._id) {
            myCheckoutInfo.push(item);
        }
    });
     myCheckoutInfo.push(notCheckoutInfo);

     localStorage.setItem('myCheckoutInfo',JSON.stringify(myCheckoutInfo));
}


    //increase quantity in cart state
    const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if(quantity >= stock){
        return;
    }
    dispatch(addToCart(id,newQuantity));
    }
    //decrease quantity in cart state
    const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if(quantity <= 1){
        return;
    }
    dispatch(addToCart(id,newQuantity));
    }
    //Remove from cart
    const removeHandle = (id) =>{
        dispatch(removeFromCart(id));
    }
    //cart Total
    const cartTotalPrice = (accumulator , item) => {
        return (accumulator + item.quantity * item.price)
    };
    //Place order 
    const OrderHandle = () => { 
        saveMyCheckoutInfo();
        navigate('/login?redirect=/checkout');
    }


  return (
    <>
    <MetaData title={"Cart"}/>
    
    {myCart.length === 0 ? (
     <div className="emptyCart">
        <MdRemoveShoppingCart/>
        <Typography>Your Cart is Empty</Typography>
        <Link to={'/products'}>Shop Now</Link>
     </div>   
    ) : 
    (<>
      <div className="mycart">
          <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
          </div>
         {myCart && myCart.map((item)=>{
             return (<div key={item.productId}className="cartContainer">
             <CartItem  item={item} removeHandle={removeHandle}/>
             <div className="cartInput">
                 <button onClick={()=>decreaseQuantity(item.productId,item.quantity)}>-</button>
                 <input readOnly value={item.quantity} type="number" />
                 <button onClick={()=>increaseQuantity(item.productId,item.quantity,item.stock)}>+</button>
             </div>
             <div className="cartSubTotal">
             &#8377;{item.price*item.quantity} 
             </div>
         </div>)
         })}
          <div className="cartTotal">
              <div></div>
              <div className="cartTotalBox">
                  <p>Total:</p>
                  <p>&#8377;{`${myCart.reduce(cartTotalPrice,0)}`}</p>
              </div>
              <div></div>
              <div className="placeOrderBtn">
                  <button onClick={OrderHandle}>Place Order</button>
              </div>
          </div>
      </div>
    </>)}
    </>
  )
}

export default Cart