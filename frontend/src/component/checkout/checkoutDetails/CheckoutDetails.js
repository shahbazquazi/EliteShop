import React, {useState} from 'react';
import './CheckoutDetails.css';
import {useAlert} from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { cartCheckoutInfo } from '../../../actions/cartActions';
import MetaData from '../../layout/title/MetaData';
import {Country , State} from 'country-state-city';
import { FaAddressBook,FaCity,FaGlobeAmericas,FaMapMarkedAlt,FaPhoneAlt,FaMapMarker } from "react-icons/fa";
import CheckoutSteps from '../checkoutsteps/CheckoutSteps';

function CheckoutDetails() {

    //Alert
    const alert = useAlert();
    //To Navigate
    const navigate = useNavigate();
    //useDispatch
    const dispatch = useDispatch();
    //Get the values from the state
    const {user} = useSelector(state => state.user);
    //Get value from local storage
    const myCheckoutInfo = JSON.parse(localStorage.getItem('myCheckoutInfo'));
    
    

    //states
    const [address, setAddress] = useState(myCheckoutInfo[0].address);
    const [city, setCity] = useState(myCheckoutInfo[0].city);
    const [state, setState] = useState(myCheckoutInfo[0].state);
    const [country, setCountry] = useState(myCheckoutInfo[0].country);
    const [pincode, setPincode] = useState(myCheckoutInfo[0].pincode);
    const [phoneNo, setPhoneNo] = useState(myCheckoutInfo[0].phoneNo);

    //form submit
    const checkoutSubmit = (e) => {
       e.preventDefault();

       if(phoneNo.length < 10 || phoneNo.length > 10) {
           alert.error("Phone number should be of 10 digits");
           return;
       };
       dispatch(cartCheckoutInfo({
           phoneNo,
           address,
           city,
           pincode,
           country,
           state,
           userId: user._id
       }));
        const myCheckoutInfo = {
            phoneNo,
           address,
           city,
           pincode,
           country,
           state,
           userId: user._id
        };
       localStorage.setItem('myCheckoutInfo',JSON.stringify(myCheckoutInfo));
       navigate('/order/confirm');
    }

  return (
    <>
       <MetaData title={"Checkout Details"}/>
       
       <CheckoutSteps activeStep={0}/>

       <div className="checkoutContainer">
           <div className="checkoutBox">
               <h2 className="checkoutHeading">Checkout Details</h2>

               <form className="checkoutForm" encType="multipart/form-data" onSubmit={checkoutSubmit}>
                
                <div>
                    <FaPhoneAlt/>
                    <input type="number" placeholder='PhoneNo.' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} required/>
                </div>
                <div>
                    <FaAddressBook/>
                    <input type="text" placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                </div>
                <div>
                    <FaCity/>
                    <input type="text" placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)} required/>
                </div>
                <div>
                    <FaMapMarker/>
                    <input type="number" placeholder='Pincode' value={pincode} onChange={(e)=>setPincode(e.target.value)} required/>
                </div>
                <div>
                    <FaGlobeAmericas/>
                    <select value={country} onChange={(e)=>setCountry(e.target.value)} required>
                        <option value="">Country</option>
                        {Country && Country.getAllCountries().map((item)=>{
                             return (
                                 <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                             )
                        })}
                    </select>
                </div>
                {country && (
                    <div>
                       <FaMapMarkedAlt/>
                       <select value={state} onChange={(e)=>setState(e.target.value)} required>
                           <option value="">State</option>
                           {State && State.getStatesOfCountry(country).map((item)=>{
                               return (
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                               )
                           })}
                       </select>
                    </div>
                )}
                  <input type="submit" value="Continue" className="checkoutBtn" disabled={state ? false : true}/>
               </form>
           </div>
       </div>
    </>
  )
}

export default CheckoutDetails