import './UpdatePassInfo.css';
import React, { useState, useEffect } from 'react';
import Loader from '../../component/layout/loader/Loader';
import { FaLock,FaLockOpen,FaEye,FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/title/MetaData';


function UpdatePassInfo() {
    //To Navigate
    const navigate = useNavigate();
    //Dispatch
    const dispatch = useDispatch();
    //Alert
    const alert = useAlert();
    //Get the values from state
    const { isUpdated, loading, error } = useSelector(state => state.profile);
    //state
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //useEffect
    useEffect(() => {
    
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password updated successfully");
            navigate("/account");
            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const passwordData = new FormData();
        passwordData.set("oldPassword",oldPassword);
        passwordData.set("newPassword",newPassword);
        passwordData.set("confirmPassword",confirmPassword);
        
    
        dispatch(updatePassword(passwordData));
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={"Change Password"} />

                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className='heading'>Change Password</h2>
                            <form className='updatePasswordForm'     onSubmit={updatePasswordSubmit}>
                                <div className="myPassword">
                                    <FaLockOpen className='icon' />
                                    <input type={showOldPassword ? "text":"password"} placeholder='Old Password' name='password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} required />
                                    {showOldPassword === false ? <FaEye className='showPasswordIcon' onClick={()=>setShowOldPassword(true)}/>:<FaEyeSlash className='showPasswordIcon'  onClick={()=>setShowOldPassword(false)}/>}
                                </div>
                                <div className="myPassword">
                                    <FaLock className='icon' />
                                    <input type={showNewPassword ? "text":"password"} placeholder='New Password' name='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required />
                                    {showNewPassword === false ? <FaEye className='showPasswordIcon'  onClick={()=>setShowNewPassword(true)}/>:<FaEyeSlash className='showPasswordIcon'  onClick={()=>setShowNewPassword(false)}/>}
                                </div>
                                <div className="myPassword">
                                    <FaLock className='icon' />
                                    <input type={showConfirmPassword ? "text":"password"} placeholder='Confirm Password' name='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
                                    {showConfirmPassword === false ? <FaEye className='showPasswordIcon'  onClick={()=>setShowConfirmPassword(true)}/>:<FaEyeSlash className='showPasswordIcon'  onClick={()=>setShowConfirmPassword(false)}/>}
                                </div>

                                <input type="submit" value="Submit" className='updatePasswordBtn' />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdatePassInfo