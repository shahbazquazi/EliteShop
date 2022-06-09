import * as cartActionType from '../constants/cartConstant';

export const cartReducer = (state={ cartItems:[], checkoutInfo:[] },action) =>{
     switch (action.type) {
         case cartActionType.ADD_TO_CART:

             const item = action.payload;

             const isProductExistInCart = state.cartItems.find((inCartItem) => inCartItem.productId === item.productId);
             if(isProductExistInCart) {
                 return {
                     ...state,
                     cartItems: state.cartItems.map((inCartItem)=>  inCartItem.productId === isProductExistInCart.productId ? item : inCartItem)
                 }
             } else {
                 return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                 };
             }
        case cartActionType.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item)=> item.productId !== action.payload)
            }
        case cartActionType.CART_CHECKOUT_INFO:
            const info = action.payload
            return {
                ...state,
                checkoutInfo: [...state.checkoutInfo, info]
            }
     
         default:
             return state;
     }
}