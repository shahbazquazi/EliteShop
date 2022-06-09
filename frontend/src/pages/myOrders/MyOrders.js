import React,{useEffect} from 'react';
import './MyOrders.css';
import { DataGrid } from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderActions';
import Loader from '../../component/layout/loader/Loader';
import {Link} from 'react-router-dom';
import {useAlert} from 'react-alert';
import Typography from '@mui/material/Typography';
import MetaData from '../../component/layout/title/MetaData';
import { FaExternalLinkAlt } from "react-icons/fa";

function MyOrders() {
   
  //Dispatch
  const dispatch = useDispatch();
  //Alert
  const alert = useAlert();
  //Get value of orders from state
  const {orders, loading, error} = useSelector(state => state.myOrders);
 
  //Columns of the table
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "headerCell",
      minWidth: 300,
      flex: 1
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "headerCell",
      cellClassName: (params) => {
          return (params.getValue(params.id,"status") === "Delivered" ? "greenColor" : "redColor");
      },
      minWidth: 150,
      flex: 0.5
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 250,
      flex: 0.3
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 300,
      flex: 0.5
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "headerCell",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return <Link to={`/order/${params.getValue(params.id,"id")}`}><FaExternalLinkAlt className="linkSvg"/></Link>
      }
    }
  ];

   //Row of the table
   const rows = [];
   //fill the rows
   orders && orders.forEach((item,index) => {
     rows.push({
       id: item._id,
       itemsQty: item.orderItems.length,
       status: item.orderStatus,
       amount: item.totalPrice
     })
   });

  useEffect(() => {
   if(error) {
     alert.error(error);
     dispatch(clearErrors());
   }
  
    dispatch(myOrders());
  }, [dispatch, alert, error])
  

  return (
    <>
     <MetaData title={"My Orders"}/>

     {loading ? <Loader/> : (
       <div className="myorders">
         <Typography className='myOrdersHeading'>My Orders</Typography>
         <DataGrid
         rows={rows}
         columns={columns}
         pageSize={10}
         disableSelectionOnClick 
         className='myOrderTable'
         autoHeight
         />


       </div>
     )}
    </>
  )
}

export default MyOrders