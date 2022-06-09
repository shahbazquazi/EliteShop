import * as contactActionType from '../constants/contactConstant';

export const contactFormReducer = (state = {}, action) => {
    switch (action.type) {
      case contactActionType.CONTACT_FORM_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case contactActionType.CONTACT_FORM_SUCCESS:
        return {
          loading: false,
          message: action.payload.data,
        };
      case contactActionType.CONTACT_FORM_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case contactActionType.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };