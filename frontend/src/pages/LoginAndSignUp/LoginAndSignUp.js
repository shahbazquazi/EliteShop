import React, {useRef, useState, useEffect} from 'react';
import './LoginAndSignUp.css';
import Loader from '../../component/layout/loader/Loader';
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { login, clearErrors, signUp } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import imageCompression from 'browser-image-compression';

function LoginAndSignUp () {
  //use location
  const location = useLocation();
  //image compression option
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 720,
    useWebWorker: true
  }
  //Rediect url
  const urlRedirect = location.search ? location.search.split("=")[1]: "/account";
  //To navigate
  const navigate = useNavigate(); 
  //Alert
  const alert = useAlert();
  //Dispatch
  const dispatch = useDispatch();
  //useRef
  const loginTab = useRef(null);
  const signUpTab = useRef(null);
  const switchBtn = useRef(null);
  //Get the values form state
  const {loading, error, isAuthenticated} = useSelector(state => state.user);
  //useEffect
  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if(isAuthenticated) {
      navigate(urlRedirect);
    }  
  }, [dispatch,alert,error,navigate,isAuthenticated,urlRedirect]) 
  
  //function for toggle
  const switchTabs = (e, val) => {
    if(val === "login") {
      switchBtn.current.classList.add("normal");
      switchBtn.current.classList.remove("shiftToRight");

      signUpTab.current.classList.remove("shiftToNormal");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if(val === "signup") {
      switchBtn.current.classList.add("shiftToRight");
      switchBtn.current.classList.remove("normal");

      signUpTab.current.classList.add("shiftToNormal");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

   //State for login
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");

   //State for Sign Up
  const [user, setUser] = useState({
      name: "",
      email: "",
      password: ""
  })
  //Getting values from signup form state
  const { name, email , password} = user;

  //state for avatar and avatar preview
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.png");

 
  // Submit login form
  const loginSubmit = (e) => {
     e.preventDefault();
     dispatch(login(
       loginEmail,
       loginPassword
     ));
     
  };
  
  //Submit signup form
  const signUpSubmit = (e) => {

    e.preventDefault();
      const signUpData = new FormData();
      signUpData.set("name",name);
      signUpData.set("email",email);
      signUpData.set("password",password);
      signUpData.set("avatar",avatar);

      dispatch(signUp(signUpData));
  }
  
  // Onchange in signup form 
  const signUpHandle = async (e) => {
      if(e.target.name === "avatar") {
          const reader = new FileReader();
          const compressedFile = await imageCompression(e.target.files[0], options);
          reader.readAsDataURL(compressedFile);
      
              reader.onload = () => {
                if(reader.readyState === 2) {
                  setAvatarPreview(reader.result);
                  setAvatar(reader.result);
                }
              };
      } else {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        });
      }
  };
  
  return (
    <>
    {loading ? <Loader/> : (
      
    <><div className="container">
    <div className="box">
      <div>
      <div className="loginAndSignupToggle">
        <p onClick={(e)=> switchTabs(e,"login")}>login</p>
        <p onClick={(e)=> switchTabs(e,"signup")}>Sign Up</p>
      </div>
      <button ref={switchBtn}></button>
      </div>
    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
      <div className="loginEmail">
     <FaEnvelope className='icon'/>
     <input type="email" placeholder='Email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value) } required/>
     </div>
     <div className="loginPassword">
      <FaLock className='icon'/>
      <input type="password" placeholder='Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value) } required/>
     </div>
     <Link to="/password/forgot">Forgot Password ?</Link>
     <input type="submit" value="login" className="loginBtn" />
    </form>
    <form className='signUpForm' ref={signUpTab} encType="multipart/form-data" onSubmit={signUpSubmit}>
    <div className="signUpName">
     <FaUser className='icon'/>
     <input type="text" placeholder='Name' name='name' value={name} onChange={signUpHandle} required/>
    </div>
    <div className="signUpEmail">
    <FaEnvelope className='icon'/>
     <input type="email" placeholder='Email' name='email' value={email} onChange={signUpHandle} required/>
    </div>
    <div className="signUpPassword">
    <FaLock className='icon'/>
     <input type="password" placeholder='Password' name='password' value={password} onChange={signUpHandle} required/>
    </div>
    <div className="signUpImage">
      <img src={avatarPreview} alt="Avatar Preview" />
      <input type="file" name='avatar' accept='image/*'onChange={signUpHandle} />
    </div>
    <input type="submit" value="signUp" className='signUpBtn' disabled = { loading ? true : false} />
    </form>

    </div>
  </div>
  </>
    )}
    </>
  )
}

export default LoginAndSignUp