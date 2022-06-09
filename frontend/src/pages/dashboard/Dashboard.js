import React, {useEffect} from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {getProductAdmin} from '../../actions/productActions';
import { Chart as ChartJS, registerables } from "chart.js";
import { useSelector,useDispatch } from "react-redux";
import { ordersAdmin } from "../../actions/orderActions";
import { getUsersAdmin } from "../../actions/userActions";
ChartJS.register(...registerables);

function Dashboard() {
  //useDispatch
  const dispatch = useDispatch();

  //Get products from state
  const {products} = useSelector(state => state.products);
  //Get the orders from state
  const {orders} = useSelector(state => state.adminOrders);
  //Get the users from state
  const {users} = useSelector((state) => state.usersAdmin);
     
  let outOfStock = 0;

  products && products.forEach((item) => {
      if(item.stock === 0) {
        outOfStock += 1;
      }
  });
  
  //useEffect
  useEffect(() => {

    dispatch(getProductAdmin());
    dispatch(ordersAdmin());
    dispatch(getUsersAdmin());
  }, [dispatch]);

  let totalAmount = 0;
  orders && orders.forEach(item => {
    totalAmount += item.totalPrice;
  })

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["rgb(201, 106, 106)"],
        hoverBackgroundColor: ["rgb(150, 150, 150)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["rgb(98, 179, 98)", "rgb(201, 106, 106)"],
        hoverBackgroundColor: ["rgb(73, 137, 73)", "rgb(171, 91, 91)"],
        data: [outOfStock, products.length-outOfStock],
      },
    ],
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> &#8377;{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
