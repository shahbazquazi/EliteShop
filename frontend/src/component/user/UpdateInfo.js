import './UpdateInfo.css';    
import React, {useState, useEffect} from 'react';
import Loader from '../../component/layout/loader/Loader';
import { FaEnvelope, FaUser } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, getUser, updateProfile } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/title/MetaData';
import imageCompression from 'browser-image-compression';

function UpdateInfo({user}) {
   //image compression option
   const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 720,
    useWebWorker: true
  }
  //To Navigate
  const navigate = useNavigate();
  //Dispatch
  const dispatch = useDispatch();
  //Alert
  const alert = useAlert(); 
  //Get the values from state
  const {isUpdated, loading , error} = useSelector(state => state.profile);
  //state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.png");

  //useEffect
  useEffect(() => {
      if(user) {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
      }
      if(error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if(isUpdated) {
        alert.success("Profile updated successfully");
        dispatch(getUser());
        navigate("/account");
        dispatch({
          type: UPDATE_PROFILE_RESET
        });
      }
  }, [dispatch,error,alert,navigate,user,isUpdated])
  
  //Update profile submit
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const profileData = new FormData();
    profileData.set("name",name);
    profileData.set("email",email);
    profileData.set("avatar",avatar);

    dispatch(updateProfile(profileData));
  }
  
  const updateAvatar = async (e) => {
      const reader = new FileReader();
      const compressedFile = await imageCompression(e.target.files[0], options);
      reader.readAsDataURL(compressedFile);
      reader.onload = ()=>{
        if(reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      }
  };

  return (
    <>
     {loading ? <Loader/> : (
       <>
       <MetaData title={"Update Profile"}/>

       <div className="updateProfileContainer">
         <div className="updateProfileBox">
           <h2 className='heading'>Update Profile</h2>
         <form className='updateProfileForm' encType="multipart/form-data" onSubmit={updateProfileSubmit}>
    <div className="updateProfileName">
     <FaUser className='icon'/>
     <input type="text" placeholder='Name' name='name' value={name} onChange={(e)=>setName(e.target.value)} required/>
    </div>
    <div className="updateProfileEmail">
    <FaEnvelope className='icon'/>
     <input type="email" placeholder='Email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
    </div>
    <div className="updateProfileImage">
      <img src={avatarPreview} alt="Avatar Preview" />
      <input type="file" name='avatar' accept='image/*'onChange={updateAvatar} />
    </div>
    <input type="submit" value="Submit" className='updateProfileBtn' />
    </form>
         </div>
       </div>
    </>
     )}
    </>
  )
}

export default UpdateInfo