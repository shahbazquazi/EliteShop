import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import {TreeView, TreeItem} from '@mui/lab';
import { MdDashboard,MdKeyboardArrowRight,MdExpandMore,MdPostAdd,MdAdd,MdListAlt,MdPeople,MdRateReview } from "react-icons/md";

function Sidebar() {
  return (
    <>
     <div className="sidebar">
         <Link to="/">
             <img src="/images/logo.png" alt="EliteShop"  />
             <span className='title'>EliteShop</span>
         </Link>
         <Link to="/dashboard">
          <p>
           <MdDashboard/> Dashboard
          </p>
         </Link>
         {/* <Link to="/"> */}
         <span className='dropDownLink'>
          <TreeView
           defaultCollapseIcon={<MdExpandMore className='svgIcon' />}
           defaultExpandIcon={<MdKeyboardArrowRight className='svgIcon' />}
          >
             <TreeItem nodeId="1" label="Products">
                 <Link to="/admin/products" className='productsLink'>
                 <TreeItem nodeId='2' label="All" icon={<MdPostAdd/>}/>
                 </Link>
                 <Link to="/admin/new/product" className='productsLink'>
                 <TreeItem nodeId='3' label="Create" icon={<MdAdd/>}/>
                 </Link>
             </TreeItem>
          </TreeView>
          </span>
         {/* </Link> */}
         <Link to="/admin/orders">
           <p>
             <MdListAlt/> Orders
           </p>
         </Link>
         <Link to="/admin/users">
           <p>
             <MdPeople/> Users
           </p>
         </Link>
         <Link to="/admin/reviews">
           <p>
             <MdRateReview/> Reviews
           </p>
         </Link>
     </div>
    </>
  )
}

export default Sidebar