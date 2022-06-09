import React from 'react';
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import { FaBox, FaFileExport } from "react-icons/fa";


export const ProfilebarData = [
      {
        title:'My Account',
        path:'/account',
        icon: <MdAccountCircle/>,
        cName: 'profilebar-text'
      },
      {
        title:'My Orders',
        path:'/orders',
        icon: <FaBox />,
        cName: 'profilebar-text'
      },
      {
        title:'Dashboard',
        path:'/dashboard',
        icon: <MdDashboard/>,
        cName: 'profilebar-text'
      },
      {
        title:'Logout',
        path:'/',
        icon: <FaFileExport />,
        cName: 'profilebar-text'
      },
    
]