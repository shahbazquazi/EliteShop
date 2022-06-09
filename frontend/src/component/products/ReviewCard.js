import React from 'react';
import { Rating } from '@mui/material';
import { FaUserCircle } from "react-icons/fa";


function ReviewCard({review}) {

     //Options for react star component
     const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5
    }
  return (
  <>
      <div className="reviewCard">
          <div><FaUserCircle size={40}/></div>
          <p>{review.name}</p>
          <Rating className='ReviewCardRating' {...options}/>
          <span>{review.comment}</span>
      </div>
  </>
  );
}

export default ReviewCard;
