import * as orderActionType from "../constants/orderConstant";
import axios from "axios";

//Create order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: orderActionType.CREATE_ORDER_REQUEST,
    });
    //Config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //fetch data
    const { data } = await axios.post("/api/order/new", order, config);

    dispatch({
      type: orderActionType.CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderActionType.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get my orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: orderActionType.MY_ORDERS_REQUEST,
    });

    //fetch data
    const { data } = await axios.get("/api/orders");

    dispatch({
      type: orderActionType.MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: orderActionType.MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Fetch orders by admin
export const ordersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: orderActionType.ADMIN_ORDERS_REQUEST,
    });

    //fetch data
    const { data } = await axios.get("/api/admin/orders");

    dispatch({
      type: orderActionType.ADMIN_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: orderActionType.ADMIN_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//my order details
export const orderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: orderActionType.ORDER_DETAILS_REQUEST,
    });

    //fetch data
    const { data } = await axios.get(`/api/order/${id}`);

    dispatch({
      type: orderActionType.ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: orderActionType.ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update orders by admin
export const updateOrdersAdmin = (id, order) => async (dispatch) => {
  try {
    dispatch({
      type: orderActionType.ADMIN_UPDATE_ORDER_REQUEST,
    });

    //Config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Update data
    const { data } = await axios.put(`/api/admin/order/${id}`,order,config);

    dispatch({
      type: orderActionType.ADMIN_UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: orderActionType.ADMIN_UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete order by admin
export const deleteOrdersAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: orderActionType.ADMIN_DELETE_ORDER_REQUEST,
    });

    //delete data
    const { data } = await axios.delete(`/api/admin/order/${id}`);

    dispatch({
      type: orderActionType.ADMIN_DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: orderActionType.ADMIN_DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: orderActionType.CLEAR_ERRORS,
  });
};
