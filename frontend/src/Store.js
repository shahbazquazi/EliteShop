import {createStore,combineReducers, applyMiddleware,} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer, addReviewReducer, createNewProductReducer, deleteProductReducer, updateProductReducer, reviewsReducerAdmin, deleteReviewReducer } from './reducers/productReducer';
import { userReducer,profileReducer,forgotPasswordReducer,usersReducerAdmin, userDetailsReducerAdmin, updateUserReducerAdmin, deleteUserReducerAdmin } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { deleteOrderReducerAdmin, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducerAdmin, updateOrderReducerAdmin } from './reducers/orderReducer';
import { contactFormReducer } from './reducers/contactReducer';

//To combine all reducers
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    addReview: addReviewReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    order: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newProduct: createNewProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
    adminOrders: ordersReducerAdmin,
    updateOrder: updateOrderReducerAdmin,
    deleteOrder: deleteOrderReducerAdmin,
    usersAdmin: usersReducerAdmin,
    userDetailsAdmin: userDetailsReducerAdmin,
    updateUserAdmin: updateUserReducerAdmin,
    deleteUserAdmin: deleteUserReducerAdmin,
    reviewsAdmin: reviewsReducerAdmin,
    deleteReview: deleteReviewReducer,
    contactForm: contactFormReducer
});

//Setting initial value of state
let initialState = {
    cart: {
        cartItems : localStorage.getItem('Cart_Items') ?
        JSON.parse(localStorage.getItem('Cart_Items')) : [],
        checkoutInfo: localStorage.getItem('checkoutInfo') ? JSON.parse(localStorage.getItem('checkoutInfo')) : [],
    }
};

//Array of middleware
const middleware = [thunk];

//Make a store
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;