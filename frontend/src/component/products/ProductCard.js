import React from 'react';
import { Rating } from '@mui/material';
import {Link} from 'react-router-dom';

function ProductCard({product}) {
    const options = {
        size: "medium",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    }
  return (
      <>
      <Link className='productCard' to={`/product/${product._id}`}>
       <img src={product.images[0].url} alt={product.name}/>
       <p>{product.name}</p>
       <div>
           <Rating  {...options}/>
           <span className='reviewTitle'>
               {`${product.numberOfReviews} reviews`}
           </span>
       </div>
       <span>&#8377; {product.price}</span>
      </Link>
      </>
  )

  
}

export default ProductCard;
