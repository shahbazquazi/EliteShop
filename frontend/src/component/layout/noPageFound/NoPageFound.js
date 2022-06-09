import React from 'react';
import './NoPageFound.css';
import {Link} from 'react-router-dom';
import { MdError } from "react-icons/md";

function NoPageFound() {
  return (
    <>
    <div className="noPageContainer">
        <div className="noPageBox">
        <MdError/>
        <h1> 404 </h1>
        <p>No Page Found</p>
        <Link to="/">Go Back</Link>
        </div>
    </div>
    </>
  )
}

export default NoPageFound