import React from 'react';
import './CartItem.css';
import {Link} from 'react-router-dom';

function CartItem({item,removeHandle}) {
  return (
    <>
       <div className="cartItemBox">
       <Link to={`/product/${item.productId}`}>    
           <img className='productImg' src={item.image} alt={item.name} />  
           </Link>
           <div>
               <Link to={`/product/${item.productId}`}>{item.name}</Link>
               <span>
                   {item.productId}
               </span>
               <span className='productPrice'>
                   {`Price: ${item.price}`}
               </span>
               <button onClick={() => removeHandle(item.productId)} className='removeBtn'>Remove</button>
           </div>
       </div>
    </>
  )
}

export default CartItem