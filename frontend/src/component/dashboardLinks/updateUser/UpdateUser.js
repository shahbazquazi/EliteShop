import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/title/MetaData";
import Sidebar from "../../../pages/dashboard/Sidebar";
import {
  MdEmail
} from "react-icons/md";
import { FaUserAlt,FaUserCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_UPDATE_USER_RESET } from "../../../constants/userConstant";
import { updateUserAdmin, clearErrors, getUserDetailsAdmin} from "../../../actions/userActions";
import Loader from "../../layout/loader/Loader";

function UpdateUser() {
  //Dispatch
  const dispatch = useDispatch();
  //Alert
  const alert = useAlert();
  //To navigate
  const navigate = useNavigate();
  //Get id from params
  const {id} = useParams();
  //Get user details from state
  const {loading, error, user} = useSelector(state => state.userDetailsAdmin);
  //Get the values from product state
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.updateUserAdmin);
  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  //useEffect
  useEffect(() => {
    if (user && user._id !== id) {
        dispatch(getUserDetailsAdmin(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
       
      }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User is updated successfully");
      navigate("/admin/users");
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, updateError, isUpdated, user, id]);

  //Submit form data
  const updateUserFormSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
   
    dispatch(updateUserAdmin(id, myForm));
  };

  

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="createProductContainer">
          {loading ? <Loader/> : (
              <form
              className="createProductForm"
              onSubmit={updateUserFormSubmit}
            >
              <h1>Update User</h1>
  
              <div>
                <FaUserAlt />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              <div>
                <MdEmail />
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
  
              <div>
                <FaUserCheck />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  
                </select>
              </div>
  
              <Button
                className="createProductBtn"
                type="submit"
                disabled={updateLoading ? true : false || role === "" ? true : false}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateUser