import './App.css';
import { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import Header from "./component/layout/header/Header.js"
import Footer from './component/layout/footer/Footer.js';
import Home from './component/home/Home.js';
import ProductDetails from './component/product/ProductDetails.js';
import Products from './component/product/Products.js';
import Search from './component/product/Search.js';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import LoginSignup from './component/user/LoginSignup.js';
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from "./component/user/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/user/UpdateProfile.js';
import UpdatePassword from './component/user/UpdatePassword.js';
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/user/ResetPassword.js";
import Cart from "./component/cart/Cart.js";
import Shipping from "./component/cart/Shipping.js";
import ConfirmOrder from "./component/cart/ConfirmOrder.js";
import Payment from "./component/cart/Payment.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/cart/OrderSuccess.js';
import MyOrders from './component/order/MyOrders.js';
import OrderDetails from './component/order/OrderDetails.js';
import Dashboard from './component/admin/Dashboard.js';
import ProductList from './component/admin/ProductList.js';
import NewProduct from './component/admin/NewProduct.js';
import UpdateProduct from './component/admin/UpdateProduct.js';
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from './component/admin/ProcessOrder.js';
import UsersList from './component/admin/UsersList.js';
import UpdateUser from './component/admin/UpdateUser.js';
import ProductReviews from './component/admin/ProductReviews.js';
import Contact from './component/layout/contact/Contact.js';
import About from './component/layout/about/About.js';
import NotFound from './component/layout/notFound/NotFound.js';
function App() {

  const {isAuthenticated,user} = useSelector((state)=>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
      store.dispatch(loadUser());
      getStripeApiKey();
  },[])
  

  // window.addEventListener("contextmenu",(e)=>e.preventDefault());

  return (
    <Router>
      <Header/>
        {isAuthenticated && <UserOptions user = {user}/>}
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/product/:id" element = {<ProductDetails/>}/>
          <Route path = "/products" element = {<Products/>}/>
          <Route path = "/products/:keyword" element = {<Products/>}/>
          <Route path = "/search" element = {<Search/>}/>
          <Route path = "/login" element = {<LoginSignup/>}/>
          <Route path = "/contact" element = {<Contact/>}/>
          <Route path = "/about" element = {<About/>}/>
          <Route path="/account" element = {<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/me/update" element = {<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
          <Route path="/password/update" element = {<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
          <Route path="/password/forgot" element = {<ForgotPassword/>}/>
          <Route path="/password/reset/:token" element = {<ResetPassword/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/login/shipping" element = {<ProtectedRoute><Shipping/></ProtectedRoute>}/>
          <Route path='/order/confirm' element = {<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
          <Route path='/process/payment' element = {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute><Payment/></ProtectedRoute></Elements>}/>
          <Route path='/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
          <Route path='/orders' element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
          <Route path='/order/:id' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin = {true}><Dashboard/></ProtectedRoute>}/>
          <Route path='/admin/products' element={<ProtectedRoute isAdmin = {true}><ProductList/></ProtectedRoute>}/>
          <Route path='/admin/product' element={<ProtectedRoute isAdmin = {true}><NewProduct/></ProtectedRoute>}/>
          <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin = {true}><UpdateProduct/></ProtectedRoute>}/>
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin = {true}><OrderList/></ProtectedRoute>}/>
          <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin = {true}><ProcessOrder/></ProtectedRoute>}/>
          <Route path='/admin/users' element={<ProtectedRoute isAdmin = {true}><UsersList/></ProtectedRoute>}/>
          <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin = {true}><UpdateUser/></ProtectedRoute>}/>
          <Route path='/admin/reviews' element={<ProtectedRoute isAdmin = {true}><ProductReviews/></ProtectedRoute>}/>
          <Route path='*' element={window.location.pathname === "/process/payment" ? null :<NotFound/>}
        />
        </Routes>
      <Footer/>
    </Router>
  );
}
 
export default App;
