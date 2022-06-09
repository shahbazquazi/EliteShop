import * as cartActionType from '../constants/cartConstant';
import axios from 'axios';

//Add to Cart
export const addToCart = (id, quantity,user) => async (dispatch,getState) => {

        const {data} = await axios.get(`/api/product/${id}`);

        dispatch({
            type: cartActionType.ADD_TO_CART,
            payload: {
                productId : data.product._id,
                userId : user._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            }
        });
  
        localStorage.setItem('Cart_Items', JSON.stringify(getState().cart.cartItems));
};

//Remove from cart
export const removeFromCart = (id) => async (dispatch,getState) => {
    dispatch({
        type: cartActionType.REMOVE_FROM_CART,
        payload: id,
    })
    localStorage.setItem('Cart_Items', JSON.stringify(getState().cart.cartItems));
}

//Cart checkout info
export const cartCheckoutInfo = (info) => async (dispatch,getState) => {
     dispatch({
         type: cartActionType.CART_CHECKOUT_INFO,
         payload: info
     })
     localStorage.setItem('checkoutInfo',JSON.stringify(getState().cart.checkoutInfo));
}