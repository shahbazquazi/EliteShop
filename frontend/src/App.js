import './App.css';
import { React, useEffect, useState} from 'react';
import webFont from 'webfontloader';
import Header from './component/layout/header/Header.js';
import Home from './pages/home/Home';
import Footer from './component/layout/footer/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductDetails from './pages/productDetails/ProductDetails.js';
import Products from './pages/products/Products';
import LoginAndSignUp from './pages/LoginAndSignUp/LoginAndSignUp.js';
import { getUser } from './actions/userActions';
import store from './Store';
import MyAccount from './pages/myAccount/MyAccount';
import { useSelector } from 'react-redux';
import UpdateInfo from './component/user/UpdateInfo';
import UpdatePassInfo from './component/user/UpdatePassInfo';
import ForgotPassword from './component/forgotPassword/ForgotPassword';
import ResetPassword from './component/resetPassword/ResetPassword';
import Cart from './pages/cart/Cart';
import CheckoutDetails from './component/checkout/checkoutDetails/CheckoutDetails';
import ConfirmOrder from './component/checkout/confirmOrder/ConfirmOrder';
import axios from 'axios';
import Payment from './component/checkout/payment/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentSuccess from './component/checkout/paymentSuccess/PaymentSuccess';
import MyOrders from './pages/myOrders/MyOrders';
import OrderDetails from './component/orderDetails/OrderDetails';
import Dashboard from './pages/dashboard/Dashboard';
import ProductList from './component/dashboardLinks/productList/ProductList';
import CreateNewProduct from './component/dashboardLinks/createProduct/CreateNewProduct';
import UpdateProduct from './component/dashboardLinks/updateProduct/UpdateProduct';
import OrderList from './component/dashboardLinks/orderList/OrderList';
import UpdateOrder from './component/dashboardLinks/updateOrder/UpdateOrder';
import UserList from './component/dashboardLinks/userList/UserList';
import UpdateUser from './component/dashboardLinks/updateUser/UpdateUser';
import Reviews from './component/dashboardLinks/reviews/Reviews';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import NoPageFound from './component/layout/noPageFound/NoPageFound';


function App() {


  const {isAuthenticated, user} = useSelector(state => state.user);

  //State for stripe payment key
  const [stripeApiKey, setStripeApiKey] = useState("")
  //Fetch stripe api key
  const getStripeKey = async () => {
     const {data} = await axios.get("/api/stripeapikey");
     setStripeApiKey(data.stripeApiKey);
  }
  

  useEffect(() => {

   store.dispatch(getUser());

    webFont.load({
      google: {
        families: ["Dongle", "Roboto", "PT Sans"]
      }
    })
    getStripeKey();
  }, []);
  
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
      <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginAndSignUp />} />
        <Route exact path="/account" element={isAuthenticated && <MyAccount user={user} />} />
        <Route exact path="/account/update" element={isAuthenticated && <UpdateInfo user={user} />} />
        <Route exact path="/account/password/update" element={isAuthenticated && <UpdatePassInfo />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/api/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={isAuthenticated && <CheckoutDetails/>} />
        <Route exact path="/order/confirm" element={isAuthenticated && <ConfirmOrder/>} />
        <Route exact path="/process/payment" element={isAuthenticated && stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>} />
        <Route exact path="/success" element={isAuthenticated && <PaymentSuccess/>} />
        <Route exact path="/orders" element={isAuthenticated && <MyOrders/>} />
        <Route exact path="/order/:id" element={isAuthenticated && <OrderDetails/>} />
        <Route  exact path="/dashboard" element={(isAuthenticated && user.role === "admin" ? <Dashboard/> : <LoginAndSignUp/>)} />
        <Route exact path="/admin/products" element={(isAuthenticated && user.role === "admin" ? <ProductList/> : <LoginAndSignUp/>)} />
        <Route exact path="/admin/new/product" element={(isAuthenticated && user.role === "admin" ? <CreateNewProduct/> : <LoginAndSignUp/>)} />
        <Route exact path="/admin/product/:id" element={(isAuthenticated && user.role === "admin" ? <UpdateProduct/> : <LoginAndSignUp/>)} />
        <Route exact path="/admin/orders" element={(isAuthenticated && user.role === "admin" ? <OrderList/> : <LoginAndSignUp/>)} />
        <Route exact path="/admin/order/:id" element={(isAuthenticated && user.role === "admin" ? <UpdateOrder/> : <LoginAndSignUp/>)} />
        <Route exact path="/admin/users" element={(isAuthenticated && user.role === "admin" ? <UserList/> : <LoginAndSignUp/>)} />
        <Route exact path="/admin/user/:id" element={(isAuthenticated && user.role === "admin" ? <UpdateUser/> : <LoginAndSignUp/>)} />
        <Route exact path="/admin/reviews" element={(isAuthenticated && user.role === "admin" ? <Reviews/> : <LoginAndSignUp/>)} />
       
        <Route exact path='*' element={window.location.pathname === "/process/payment" ? null : <NoPageFound/>}/>
      </Routes>
      <Footer/>
      </Router>
  );
}

export default App;

