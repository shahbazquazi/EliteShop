import React from 'react';
import './Footer.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="leftFooter">
        <h4>Download our App to Grab the Fastest Deals
        </h4>
        <div >
        <Link to="#">
        <FaIcons.FaApple className='downloadbtn'/></Link>
        <Link to="#"><AiIcons.AiFillAndroid className='downloadbtn'/></Link>
        </div>
      </div>
      <div className="midFooter">
        <div className="footertitle">
      <img src="/images/logo.png" alt="@"/>
      <h4>
          EliteShop
        </h4>
        </div>
        <p className='tagline'>We Deliver Love and Trust not Just Products
        </p>
        <p className='copyright'>
          Copyright 2022 &copy; Eliteshop
        </p>
      </div>
      <div className="rightFooter">
        <h4>
          Connect with Us:
        </h4>
        <Link to="#"><FaIcons.FaInstagramSquare className='socialmediabtn' /></Link>
        <Link to="#"><FaIcons.FaFacebook className='socialmediabtn'/></Link>
        <Link to="#"><FaIcons.FaWhatsappSquare className='socialmediabtn'/></Link>
      </div>
    </footer>
  )
}

export default Footer;
