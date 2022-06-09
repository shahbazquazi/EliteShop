import './ResetPassword.css';
import React, { useState, useEffect } from 'react';
import Loader from '../../component/layout/loader/Loader';
import { FaLock,FaEye,FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import MetaData from '../layout/title/MetaData';
import {useParams} from 'react-router-dom';


function ResetPassword() {
     //To Navigate
     const navigate = useNavigate();
     //Dispatch
     const dispatch = useDispatch();
     //Alert
     const alert = useAlert();
     //Get the token from url
     const {token} = useParams();
     //Get the values from state
     const { success, loading, error } = useSelector(state => state.forgotPassword);
     //state
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
 
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 
     //useEffect
     useEffect(() => {
     
         if (error) {
             alert.error(error);
             dispatch(clearErrors());
         }
         if (success) {
             alert.success("Password reset successfully");
             navigate("/login");
            
         }
     }, [dispatch, error, alert, navigate, success]);
 
     const resetPasswordSubmit = (e) => {
         e.preventDefault();
         const passwordData = new FormData();
         passwordData.set("password",password);
         passwordData.set("confirmPassword",confirmPassword);
         
         dispatch(resetPassword(token,passwordData));
     }

  return (
     <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={"Reset Password"} />

                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className='heading'>Reset Password</h2>
                            <form className='resetPasswordForm'     onSubmit={resetPasswordSubmit}>
                                <div className="myPassword">
                                    <FaLock className='icon' />
                                    <input type={showPassword ? "text":"password"} placeholder='Password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                                    {showPassword === false ? <FaEye className='showPasswordIcon' onClick={()=>setShowPassword(true)}/>:<FaEyeSlash className='showPasswordIcon'  onClick={()=>setShowPassword(false)}/>}
                                </div>
                               
                                <div className="myPassword">
                                    <FaLock className='icon' />
                                    <input type={showConfirmPassword ? "text":"password"} placeholder='Confirm Password' name='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
                                    {showConfirmPassword === false ? <FaEye className='showPasswordIcon'  onClick={()=>setShowConfirmPassword(true)}/>:<FaEyeSlash className='showPasswordIcon'  onClick={()=>setShowConfirmPassword(false)}/>}
                                </div>

                                <input type="submit" value="Submit" className='resetPasswordBtn' />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
  )
}

export default ResetPassword