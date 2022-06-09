import * as orderActionType from "../constants/orderConstant";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionType.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActionType.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case orderActionType.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionType.MY_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case orderActionType.MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case orderActionType.MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Fetch all orders by admin
export const ordersReducerAdmin = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionType.ADMIN_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case orderActionType.ADMIN_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case orderActionType.ADMIN_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Update order by admin
export const updateOrderReducerAdmin = (state = { }, action) => {
  switch (action.type) {
    case orderActionType.ADMIN_UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActionType.ADMIN_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case orderActionType.ADMIN_UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case orderActionType.ADMIN_UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Delete order by admin
export const deleteOrderReducerAdmin = (state = { }, action) => {
  switch (action.type) {
    case orderActionType.ADMIN_DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActionType.ADMIN_DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case orderActionType.ADMIN_DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case orderActionType.ADMIN_DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderActionType.ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case orderActionType.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case orderActionType.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
