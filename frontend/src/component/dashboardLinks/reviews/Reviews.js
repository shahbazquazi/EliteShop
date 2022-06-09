import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {clearErrors, getReviewsAdmin, deleteReviewAdmin } from "../../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/title/MetaData";
import Sidebar from "../../../pages/dashboard/Sidebar";
import {ADMIN_DELETE_REVIEW_RESET} from "../../../constants/productConstant";
import { FaStar,FaTrashAlt } from "react-icons/fa";



function Reviews() {
  //To dispatch
  const dispatch = useDispatch();
  //For alert
  const alert = useAlert();
  //To navigate 
  const navigate = useNavigate();
  //Get values from delete product state
  const {error:deleteError, isDeleted} = useSelector(state => state.deleteReview);
  //Get the values from products state
  const { error, reviews, loading} = useSelector((state) => state.reviewsAdmin);
  //state
  const [productId, setProductId] = useState("");
  //To delete a product 
  const deleteReviewHandler = (reviewId) => {
   dispatch(deleteReviewAdmin(productId, reviewId));
  }

  //Form submit
  const reviewFormSubmit = (e) => {
   e.preventDefault();

   dispatch(getReviewsAdmin(productId));
  }
  //useEffect
  useEffect(() => {
    if (productId.length === 24) {
        dispatch(getReviewsAdmin(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate('/admin/reviews');
      dispatch({type: ADMIN_DELETE_REVIEW_RESET});
    }

  }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

  //Column
  const columns = [
    {
      field: "id",
      headerName: "Review Id",
      headerClassName: "headerCell",
      minWidth: 250,
      flex: 1
    },
    {
        field: "userid",
        headerName: "User Id",
        headerClassName: "headerCell",
        minWidth: 200,
        flex: 1,
      },
    {
      field: "comment",
      headerName: "Comment",
      headerClassName: "headerCell",
      minWidth: 200,
      flex: 1,
      cellContentClassName: "commentRow"
    },
    {
      field: "rating",
      headerName: "Rating",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor" 
          : "redColor";
      },
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
            <Button className="deleteBtn" onClick={()=> deleteReviewHandler(params.getValue(params.id, "id"))}>
              <FaTrashAlt />
            </Button>
          </>
        );
      },
    },
  ];

  //Rows
  const rows = [];

  reviews &&
  reviews.forEach((item) => {
      rows.push({
        id: item._id,
        userid: item.user,
        comment: item.comment,
        rating: item.rating,
      });
    });

  return (
    <>
      <MetaData title={"Admin - All Reviews"} />
      <div className="dashboard">
        <Sidebar />
        <div className="reviewListContainer">
        <form
              className="reviewForm"
              onSubmit={reviewFormSubmit}
            >
              <h1>Reviews</h1>
  
              <div>
                <FaStar />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
  
              <Button
                className="reviewBtn"
                type="submit"
                disabled={loading ? true : false || productId === "" ? true : false}
              >
                Search
              </Button>
            </form>
          
          {reviews && reviews.length > 0 ? (
              <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              
            />) : (
                <h1 className="noReviewsHeading">
                    No Reviews Found
                </h1>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Reviews