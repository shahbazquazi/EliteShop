import * as userActionType from "../constants/userConstant";
import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const {data} = await axios.post("/api/login", { email, password }, config);

    dispatch({
      type: userActionType.LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: userActionType.LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Signup
export const signUp = (signUpData) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.SIGNUP_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const {data} = await axios.post("/api/signup", signUpData, config);
    dispatch({
      type: userActionType.SIGNUP_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: userActionType.SIGNUP_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get user
export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.GET_USER_REQUEST,
    });

    const {data} = await axios.get("/api/user/profile");

    dispatch({
      type: userActionType.GET_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: userActionType.GET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/logout");

    dispatch({
      type: userActionType.LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: userActionType.GET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update profile
export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.UPDATE_PROFILE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const data = await axios.put(
      "/api/user/profile/update",
      profileData,
      config
    );

    dispatch({
      type: userActionType.UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update password
export const updatePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.UPDATE_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      "/api/user/password/update",
      passwordData,
      config
    );

    dispatch({
      type: userActionType.UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.FORGOT_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post("/api/password/forgot", email, config);

    dispatch({
      type: userActionType.FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Reset password
export const resetPassword = (token, passwordData) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.RESET_PASSWORD_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.put(
      `/api/password/reset/${token}`,
      passwordData,
      config
    );

    dispatch({
      type: userActionType.RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get users by admin
export const getUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.USERS_REQUEST_ADMIN,
    });

    const { data } = await axios.get("/api/admin/users");

    dispatch({
      type: userActionType.USERS_SUCCESS_ADMIN,
      payload: data.allUsers,
    });
  } catch (error) {
    dispatch({
      type: userActionType.USERS_FAIL_ADMIN,
      payload: error.response.data.message,
    });
  }
};

// Get user details by admin
export const getUserDetailsAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.USER_DETAILS_REQUEST_ADMIN,
    });

    const { data } = await axios.get(`/api/admin/user/${id}`);

    dispatch({
      type: userActionType.USER_DETAILS_SUCCESS_ADMIN,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: userActionType.USER_DETAILS_FAIL_ADMIN,
      payload: error.response.data.message,
    });
  }
};

//Update user
export const updateUserAdmin = (id, updateData) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.ADMIN_UPDATE_USER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.put(`/api/admin/user/${id}`, updateData, config);

    dispatch({
      type: userActionType.ADMIN_UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.ADMIN_UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete user
export const deleteUserAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.ADMIN_DELETE_USER_REQUEST,
    });

    const {data} = await axios.delete(`/api/admin/user/${id}`);

    dispatch({
      type: userActionType.ADMIN_DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.ADMIN_DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action for clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: userActionType.CLEAR_ERRORS,
  });
};
