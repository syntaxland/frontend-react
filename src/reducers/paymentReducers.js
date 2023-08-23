// paymentReducers.js

import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
  PAYMENT_LIST_FAIL,

  ADMIN_PAYMENT_LIST_REQUEST,
  ADMIN_PAYMENT_LIST_SUCCESS,
  ADMIN_PAYMENT_LIST_FAIL,

  } from '../constants/paymentConstants';
  
  const initialState = {
    payments: [],
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
  
  export const paymentListReducer = (state = initialState, action) => {
    switch (action.type) {
      case PAYMENT_LIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case PAYMENT_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          payments: action.payload,
        };
      case PAYMENT_LIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const adminPaymentListReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADMIN_PAYMENT_LIST_REQUEST:
        return { ...state, loading: true };
      case ADMIN_PAYMENT_LIST_SUCCESS:
        return { loading: false, payments: action.payload };
      case ADMIN_PAYMENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
