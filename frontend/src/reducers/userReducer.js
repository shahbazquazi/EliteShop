import * as userActionType from '../constants/userConstant'

export const userReducer = (state={user:{}}, action) => {
    switch (action.type) {
        case userActionType.LOGIN_REQUEST:
        case userActionType.SIGNUP_REQUEST:
        case userActionType.GET_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case userActionType.LOGIN_SUCCESS:
        case userActionType.SIGNUP_SUCCESS:
        case userActionType.GET_USER_SUCCESS:    
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }    
        case userActionType.LOGIN_FAIL:
        case userActionType.SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case userActionType.GET_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case userActionType.LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case userActionType.LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
                
            }

        case userActionType.CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }        
            
    
        default:
          return state;
    }
}

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case userActionType.UPDATE_PROFILE_REQUEST:
        case userActionType.UPDATE_PASSWORD_REQUEST:
            return {
               ...state,
               loading: true
            }
        case userActionType.UPDATE_PROFILE_SUCCESS:
        case userActionType.UPDATE_PASSWORD_SUCCESS:
            return {
               ...state,
               loading: false,
               isUpdated: action.payload.data.success
            }
        case userActionType.UPDATE_PROFILE_RESET:
        case userActionType.UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case userActionType.UPDATE_PROFILE_FAIL:
        case userActionType.UPDATE_PASSWORD_FAIL:
            return {
                ...state,
               loading: false,
               error: action.payload,
            }
        case userActionType.CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }   
            
        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case userActionType.FORGOT_PASSWORD_REQUEST:
        case userActionType.RESET_PASSWORD_REQUEST:
            return {
               ...state,
               loading: true,
               error: null
            }
        case userActionType.FORGOT_PASSWORD_SUCCESS:
            return {
               ...state,
               loading: false,
               message: action.payload.data.message
            }
        case userActionType.RESET_PASSWORD_SUCCESS:
            return {
               ...state,
               loading: false,
               success: action.payload.data.success
            }
        case userActionType.FORGOT_PASSWORD_FAIL:
        case userActionType.RESET_PASSWORD_FAIL:
            return {
                ...state,
               loading: false,
               error: action.payload,
            }
        case userActionType.CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }   

        default:
            return state;
    }
}

export const usersReducerAdmin = (state={users:[]}, action) => {
    switch (action.type) {
        case userActionType.USERS_REQUEST_ADMIN:
            return {
                ...state,
                loading: true,
            }
        case userActionType.USERS_SUCCESS_ADMIN:    
            return {
                ...state,
                loading: false,
                users: action.payload
            }    
        case userActionType.USERS_FAIL_ADMIN:
            return {
                loading: false,
                error: action.payload
            }
        case userActionType.CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }        

        default:
          return state;
    }
}

export const userDetailsReducerAdmin = (state={user:{}}, action) => {
    switch (action.type) {
        case userActionType.USER_DETAILS_REQUEST_ADMIN:
            return {
                ...state,
                loading: true,
            }
        case userActionType.USER_DETAILS_SUCCESS_ADMIN:    
            return {
                ...state,
                loading: false,
                user: action.payload
            }    
        case userActionType.USER_DETAILS_FAIL_ADMIN:
            return {
                loading: false,
                error: action.payload
            }
        case userActionType.CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }        

        default:
          return state;
    }
}

export const updateUserReducerAdmin = (state = {}, action) => {
    switch (action.type) {
        case userActionType.ADMIN_UPDATE_USER_REQUEST:
            return {
               ...state,
               loading: true
            }
        case userActionType.ADMIN_UPDATE_USER_SUCCESS:
            return {
               ...state,
               loading: false,
               isUpdated: action.payload.success
            }
        case userActionType.ADMIN_UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case userActionType.ADMIN_UPDATE_USER_FAIL:
            return {
                ...state,
               loading: false,
               error: action.payload,
            }
        case userActionType.CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }   
            
        default:
            return state;
    }
}

export const deleteUserReducerAdmin = (state = {}, action) => {
    switch (action.type) {
        case userActionType.ADMIN_DELETE_USER_REQUEST:
            return {
               ...state,
               loading: true
            }
        case userActionType.ADMIN_DELETE_USER_SUCCESS:
            return {
               ...state,
               loading: false,
               isDeleted: action.payload.data.success,
               message: action.payload.data.message
            }
        case userActionType.ADMIN_DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case userActionType.ADMIN_DELETE_USER_FAIL:
            return {
                ...state,
               loading: false,
               error: action.payload,
            }
        case userActionType.CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }   
            
        default:
            return state;
    }
}
