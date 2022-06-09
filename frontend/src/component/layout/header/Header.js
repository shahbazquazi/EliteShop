import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { NavLink,useNavigate} from "react-router-dom";
import { AiOutlineMenu} from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import {MdKeyboardArrowUp} from "react-icons/md"
import { FaShoppingCart,FaUserAlt,FaSearch } from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import {ProfilebarData} from "./ProfilebarData";
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userActions';
import { useSelector } from 'react-redux';
import {useAlert} from 'react-alert';

function Header() {
  //useRef
  const profileRef = useRef(null);
  //Alert
  const alert = useAlert();
  //get the values of user state
  const {isAuthenticated,user} = useSelector(state => state.user);
  //get the values of cart state
  const {cartItems} = useSelector(state => state.cart);
  //Dispatch
  const dispatch = useDispatch();
  //To Navigate url
  const navigate = useNavigate();
  //state for sidebar
  const [sidebar, setSidebar] = useState(false);
  //state for searchbar
  const [searchTerm, setSearchTerm] = useState("");
  //user profile
  const [profileBar, setprofileBar] = useState(false);
  //show arrow
  const [arrow, setArrow] = useState(false);
  //To show sidebar
  const showSidebar = ()=> {
    setSidebar(!sidebar);
    setArrow(!arrow);
  }
  //Profile dropdown
  const userProfileHandle = () => {
     setprofileBar(!profileBar);
  } 
  //Submit search
  const submitHandler = (e)=> {
     e.preventDefault();
     if(searchTerm.trim()) {
       navigate(`/products/${searchTerm}`);
     }
     else {
       navigate(`/products`);
     }
  }
  //Cart button onclick
  const cartHandle = () => {
    navigate(`/cart`);
  }
  //Login button onclick
  const loginHandle = () => {
    navigate(`/login`);
  }
   //Logout button onclick
  const logoutHandle = () => {
     dispatch(logout());
     alert.success("Logout successful");
  }
  
  //show cart badge for the loggedin user
  const myCart = []
  cartItems.forEach((cartItem) => {
      if(user && cartItem.userId === user._id) {
          myCart.push(cartItem);
      }
  });

  useEffect(() => {

    const clickedOutside = e => {
      if (profileBar && profileRef.current && !profileRef.current.contains(e.target)) {
        setprofileBar(false);
      }
    }
    document.addEventListener("mousedown", clickedOutside)
  
    return () => {
      document.removeEventListener("mousedown", clickedOutside)
    }
  }, [profileBar])
  
  return <div>
      <nav className='navbar'>
        <div id='logosection'>
          <span>
            <img id='logo' src="/images/logo.png" alt="Eliteshop"/>
          </span>
        <span id='logotitle'>
          <h4>EliteShop</h4>
        </span>
        </div>
        <div id='navbarlinks'>
          <ul id='links'>
               <li><NavLink className="mylink"  aria-current="page" to="/" >Home</NavLink></li>
               <li><NavLink   className="mylink"aria-current="page" to="/about" >About</NavLink></li>
               <li><NavLink  className="mylink"aria-current="page" to="/products" >Products</NavLink></li>
               <li><NavLink   className="mylink"aria-current="page" to="/contact" >Contact</NavLink></li>
          </ul>
        </div>
        <div id='searchsection'>
          <form className="searchbar" onSubmit={submitHandler}>
            <input type="text" placeholder='Search' value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}}/>
            <button type='submit' id='searchbtn'><FaSearch /></button>
          </form>

          <div id='featuresection'>
             <FaShoppingCart className="featurebtn" onClick={cartHandle} id='cartbtn'/>
             {cartItems[0] && 
             <span className='badge'>{myCart.length}</span>}

             {isAuthenticated ? <FaUserAlt onClick={userProfileHandle} className='featurebtn' id='loggedInUser'/> :
             <FaUserAlt className="featurebtn" onClick={loginHandle} id='loginbtn'/>} 
             {profileBar ? <MdKeyboardArrowUp className='arrow'/> : ""}
          </div>
        </div>
        <div  id='mobile-menu'>
          {sidebar ? <IoMdClose id='closebtn' onClick={showSidebar}/> :  <AiOutlineMenu id='menubtn' onClick={showSidebar}/> }
        </div>
        </nav>  

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
          {SidebarData.map((item,index)=>{ 
            if(isAuthenticated && item.title === "Logout") {
              return <li key={index} className={item.cName}>
              <NavLink onClick={logoutHandle} to={item.path}>{item.icon}<span>{item.title}</span></NavLink>
            </li>
             }
            if(isAuthenticated && user.role === "user" && item.title === "Dashboard") { 
              return ""; 
            }
            if(!isAuthenticated && item.title === "Logout"){
              return "";
            }
            if(!isAuthenticated && item.title === "Dashboard"){
              return "";
            }
            if(!isAuthenticated && item.title === "My Account"){
              return "";
            }
            if(!isAuthenticated && item.title === "My Orders"){
              return "";
            }
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path}>{item.icon}<span>{item.title}</span></NavLink>
                </li>
              )
             
          })};
          </ul>
        </nav>
       
         <div className="loginToggle">
        <nav className={profileBar ? 'profileBar-active' : 'profileBar-close'}>
         <ul className='profileBar-items' ref={profileRef} onClick={userProfileHandle}>
        
         {ProfilebarData.map((item,index)=>{ 
           if(item.title === "Logout") { 
            return <li key={index} className={item.cName}>
            <NavLink onClick={logoutHandle} to={item.path}>{item.icon}<span>{item.title}</span></NavLink>
          </li>
           }
           if(isAuthenticated && user.role === "user" && item.title === "Dashboard") { 
              return ""; 
            }
             return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path}>{item.icon}<span>{item.title}</span></NavLink>
                </li>
              )
             
             })};
             
         </ul>
        </nav>
        </div>
  </div>;
}

export default Header;
