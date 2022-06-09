import * as productActionType from "../constants/productConstant";

//Reducer for fetching the products
export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productActionType.ALL_PRODUCT_REQUEST:
    case productActionType.ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case productActionType.ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.data.products,
        productsCount: action.payload.data.productsCount,
        resultPerPage: action.payload.data.productsPerPage,
        filteredProductsCount: action.payload.data.filteredProductsCount,
      };
    case productActionType.ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case productActionType.ALL_PRODUCT_FAIL:
    case productActionType.ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case productActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Reducer for product details
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productActionType.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case productActionType.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.data.product,
      };
    case productActionType.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case productActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Reducer for add review of the product
export const addReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productActionType.ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActionType.ADD_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case productActionType.ADD_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case productActionType.ADD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Reducer for creating a new product -- accessed by Admin
export const createNewProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productActionType.ADMIN_CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActionType.ADMIN_CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case productActionType.ADMIN_CREATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case productActionType.ADMIN_CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Reducer for updating a product -- accessed by Admin
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productActionType.ADMIN_UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActionType.ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case productActionType.ADMIN_UPDATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };
    case productActionType.ADMIN_UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Reducer for deleting a product -- accessed by Admin
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productActionType.ADMIN_DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActionType.ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case productActionType.ADMIN_DELETE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };
    case productActionType.ADMIN_DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Reducer for all reviews by admin
export const reviewsReducerAdmin = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case productActionType.ADMIN_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActionType.ADMIN_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case productActionType.ADMIN_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Reducer for delete review of the product by admin
export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productActionType.ADMIN_DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActionType.ADMIN_DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case productActionType.ADMIN_DELETE_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };
    case productActionType.ADMIN_DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
