import React, { useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { getProductAdmin, deleteProductAdmin, clearErrors } from "../../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/title/MetaData";
import Sidebar from "../../../pages/dashboard/Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {ADMIN_DELETE_PRODUCT_RESET} from "../../../constants/productConstant";

function ProductList() {
  //To dispatch
  const dispatch = useDispatch();
  //For alert
  const alert = useAlert();
  //To navigate 
  const navigate = useNavigate();
  //Get values from delete product state
  const {error:deleteError, isDeleted} = useSelector(state => state.deleteProduct);
  //Get the values from products state
  const { error, products } = useSelector((state) => state.products);
  //To delete a product 
  const deleteProductHandler = (id) => {
   dispatch(deleteProductAdmin(id));
  }
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
      alert.success("Product Deleted Successfully");
      navigate('/admin/products');
      dispatch({type: ADMIN_DELETE_PRODUCT_RESET});
    }
    dispatch(getProductAdmin());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  //Column
  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      headerClassName: "headerCell",
      minWidth: 250,
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "headerCell",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 150,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              className="editBtn"
              to={`/admin/product/${params.getValue(params.id, "id")}`}
            >
              <FaEdit />
            </Link>
            <Button className="deleteBtn" onClick={()=> deleteProductHandler(params.getValue(params.id, "id"))}>
              <FaTrashAlt />
            </Button>
          </>
        );
      },
    },
  ];

  //Rows
  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });

  return (
    <>
      <MetaData title={"Admin - All Products"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Products</h1>
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

export default ProductList;
