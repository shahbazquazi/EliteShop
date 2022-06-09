import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  ordersAdmin,
  deleteOrdersAdmin,
  clearErrors,
} from "../../../actions/orderActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/title/MetaData";
import Sidebar from "../../../pages/dashboard/Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ADMIN_DELETE_ORDER_RESET } from "../../../constants/orderConstant";

function OrderList() {
  //To dispatch
  const dispatch = useDispatch();
  //For alert
  const alert = useAlert();
  //To navigate
  const navigate = useNavigate();
  //Get values from delete product state
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteOrder
  );
  //Get the values from products state
  const { error, orders } = useSelector((state) => state.adminOrders);
  //To delete a product
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrdersAdmin(id));
  };
  //useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate('/admin/orders');
      dispatch({type: ADMIN_DELETE_ORDER_RESET});
    }
    dispatch(ordersAdmin());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  //Column
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "headerCell",
      minWidth: 250,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "headerCell",
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
      minWidth: 100,
      flex: 0.2,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              className="editBtn"
              to={`/admin/order/${params.getValue(params.id, "id")}`}
            >
              <FaEdit />
            </Link>
            <Button
              className="deleteBtn"
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <FaTrashAlt />
            </Button>
          </>
        );
      },
    },
  ];

  //Rows
  const rows = [];

  orders && orders.forEach((item) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      status: item.orderStatus,
      amount: item.totalPrice
    })
  });

  return (
    <>
      <MetaData title={"Admin - All Orders"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
}

export default OrderList;
