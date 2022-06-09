import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {getUsersAdmin, clearErrors, deleteUserAdmin} from '../../../actions/userActions';
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/title/MetaData";
import Sidebar from "../../../pages/dashboard/Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {ADMIN_DELETE_USER_RESET} from '../../../constants/userConstant';

function UserList() {
  //To dispatch
  const dispatch = useDispatch();
  //For alert
  const alert = useAlert();
  //To navigate 
  const navigate = useNavigate();
  //Get values from delete user state
  const {error:deleteError, isDeleted, message} = useSelector(state => state.deleteUserAdmin);
  //Get the values from user state
  const { error, users} = useSelector((state) => state.usersAdmin);
  //To delete a user 
  const deleteUserHandler = (id) => {
   dispatch(deleteUserAdmin(id));
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
      alert.success(message);
      navigate('/admin/users');
      dispatch({type: ADMIN_DELETE_USER_RESET});
    }
    dispatch(getUsersAdmin());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  //Column
  const columns = [
    {
      field: "id",
      headerName: "User Id",
      headerClassName: "headerCell",
      minWidth: 250,
      flex: 1
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "headerCell",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "headerCell",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
              to={`/admin/user/${params.getValue(params.id, "id")}`}
            >
              <FaEdit />
            </Link>
            <Button className="deleteBtn" onClick={()=> deleteUserHandler(params.getValue(params.id, "id"))}>
              <FaTrashAlt />
            </Button>
          </>
        );
      },
    },
  ];

  //Rows
  const rows = [];

  users &&
  users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      });
    });

  return (
    <>
      <MetaData title={"Admin - All Users"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Users</h1>
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

export default UserList;
