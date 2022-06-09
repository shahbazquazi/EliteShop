import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title:'Home',
    path:'/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title:'About',
    path:'/about',
    icon: <AiIcons.AiFillInfoCircle />,
    cName: 'nav-text'
  },
  {
    title:'Products',
    path:'/products',
    icon: <FaIcons.FaBoxOpen />,
    cName: 'nav-text'
  },
  {
    title:'Contact',
    path:'/contact',
    icon: <FaIcons.FaEnvelope />,
    cName: 'nav-text'
  },
  {
    title:'Cart',
    path:'/cart',
    icon: <FaIcons.FaShoppingCart />,
    cName: 'nav-text'
  },
  {
    title:'My Account',
    path:'/account',
    icon: <MdIcons.MdAccountCircle/>,
    cName: 'nav-text'
  },
  {
    title:'My Orders',
    path:'/orders',
    icon: <FaIcons.FaBox />,
    cName: 'nav-text'
  },
  {
    title:'Dashboard',
    path:'/dashboard',
    icon: <MdIcons.MdDashboard/>,
    cName: 'nav-text'
  },
  {
    title:'Login',
    path:'/login',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title:'Logout',
    path:'/',
    icon: <FaIcons.FaFileExport />,
    cName: 'nav-text'
  },
]
