import axios from 'axios';
import * as productActionType from '../constants/productConstant';

//Action for get products
export const getProduct = (keyword="", currentPage=1,price=[0,500000],category,ratings=0) => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.ALL_PRODUCT_REQUEST,
        })
        let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
            link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        //Fetch all products
        const data = await axios.get(link);
        dispatch({
            type: productActionType.ALL_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: productActionType.ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    };
};

//Action for get products by admin
export const getProductAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.ADMIN_PRODUCT_REQUEST,
        })
        //Fetch all products
        const {data} = await axios.get('/api/admin/products');
        dispatch({
            type: productActionType.ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        });
    } catch (error) {
        dispatch({
            type: productActionType.ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    };
};

//Action for create a new product by admin
export const createNewProductAdmin = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.ADMIN_CREATE_PRODUCT_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post(`/api/admin/product/new`,productData,config);
        
        dispatch({
            type: productActionType.ADMIN_CREATE_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: productActionType.ADMIN_CREATE_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    };
};

//Action for updating a product by admin
export const updateProductAdmin = (id, productData) => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.ADMIN_UPDATE_PRODUCT_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.put(`/api/admin/product/${id}`,productData,config);
        
        dispatch({
            type: productActionType.ADMIN_UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: productActionType.ADMIN_UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    };
};

//Action for deleting a product by admin
export const deleteProductAdmin = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.ADMIN_DELETE_PRODUCT_REQUEST,
        })

        const {data} = await axios.delete(`/api/admin/product/${id}`);
        
        dispatch({
            type: productActionType.ADMIN_DELETE_PRODUCT_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: productActionType.ADMIN_DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    };
};

//Action for product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.PRODUCT_DETAILS_REQUEST,
        })
        //Fetch all products
        const data = await axios.get(`/api/product/${id}`);
        dispatch({
            type: productActionType.PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: productActionType.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    };
};

//Action for adding review of the product
export const addReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.ADD_REVIEW_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.put(`/api/review`,reviewData,config);
        
        dispatch({
            type: productActionType.ADD_REVIEW_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: productActionType.ADD_REVIEW_FAIL,
            payload: error.response.data.message
        });
    };
};

//Action for all reviews of the product by admin
export const getReviewsAdmin = (productid) => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.ADMIN_REVIEWS_REQUEST,
        })

        const {data} = await axios.get(`/api/reviews?productid=${productid}`);
        
        dispatch({
            type: productActionType.ADMIN_REVIEWS_SUCCESS,
            payload: data.reviews
        });
    } catch (error) {
        dispatch({
            type: productActionType.ADMIN_REVIEWS_FAIL,
            payload: error.response.data.message
        });
    };
};

//Action for delete review of the product by admin
export const deleteReviewAdmin = (productid, reviewid) => async (dispatch) => {
    try {
        dispatch({
            type: productActionType.ADMIN_DELETE_REVIEW_REQUEST,
        })

        const {data} = await axios.delete(`/api/reviews?productid=${productid}&reviewid=${reviewid}`);
        
        dispatch({
            type: productActionType.ADMIN_DELETE_REVIEW_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: productActionType.ADMIN_DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        });
    };
};

// Action for clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: productActionType.CLEAR_ERRORS
    });
};