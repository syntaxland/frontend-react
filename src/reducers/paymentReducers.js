// paymentReducers.js

import {
    PAYMENT_CREATE_REQUEST,
    PAYMENT_CREATE_SUCCESS,
    PAYMENT_CREATE_FAIL,
  } from '../constants/paymentConstants';
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  export const paymentCreateReducer = (state = initialState, action) => {
    switch (action.type) {
      case PAYMENT_CREATE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case PAYMENT_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PAYMENT_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  