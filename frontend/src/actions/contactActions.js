import * as contactActionType from '../constants/contactConstant';
import axios from 'axios';

//send contact Form
export const contactForm = (contactFormData) => async (dispatch) => {
    try {
      dispatch({
        type: contactActionType.CONTACT_FORM_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const {data} = await axios.post("/api/contactus", contactFormData, config);
  
      dispatch({
        type: contactActionType.CONTACT_FORM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: contactActionType.CONTACT_FORM_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action for clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: contactActionType.CLEAR_ERRORS
    });
};