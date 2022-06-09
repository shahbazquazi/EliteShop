import './ForgotPassword.css';
import React, { useState, useEffect } from 'react';
import Loader from '../../component/layout/loader/Loader';
import { FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import MetaData from '../layout/title/MetaData';

function ForgotPassword() {
     //Dispatch
     const dispatch = useDispatch();
     //Alert
    const alert = useAlert();
    //get values form state
    const {loading, message, error} = useSelector(state => state.forgotPassword);
    //state
    const [email, setEmail] = useState("");

    //submit form
    const forgotPasswordSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set("email",email);
    
        dispatch(forgotPassword(formData));
    }
    
    //useEffect
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }

    }, [dispatch, error, alert, message]);
    

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={"Forgot Password"} />

                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className='heading'>Forgot Password</h2>
                            <form className='forgotPasswordForm'  onSubmit={forgotPasswordSubmit}>
                                
                                <div className="forgotPasswordEmail">
                                    <FaEnvelope className='icon' />
                                    <input type="email" placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                              
                                <input type="submit" value="Send" className='forgotPasswordBtn' />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ForgotPassword