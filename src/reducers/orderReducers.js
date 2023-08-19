// orderReducers.js
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,

  ORDER_ITEMS_LIST_REQUEST,
  ORDER_ITEMS_LIST_SUCCESS,
  ORDER_ITEMS_LIST_FAIL,

  REVIEW_ADD_REQUEST,
  REVIEW_ADD_SUCCESS,
  REVIEW_ADD_FAIL,

  CONFIRM_DELIVERY_REQUEST,
  CONFIRM_DELIVERY_SUCCESS,
  CONFIRM_DELIVERY_FAIL,
  } from "../constants/orderConstants"; 
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
    order: {},
  };
  
  export const orderCreateReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ORDER_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          order: action.payload,
        };
      case ORDER_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true, orders: [] };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };
      case ORDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ORDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const orderItemsListReducer = (state = { orderItems: [] }, action) => {
    switch (action.type) {
      case ORDER_ITEMS_LIST_REQUEST:
        return { loading: true, orderItems: [] };
      case ORDER_ITEMS_LIST_SUCCESS:
        return { loading: false, orderItems: action.payload };
      case ORDER_ITEMS_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const reviewAddReducer = (state = {}, action) => {
    switch (action.type) {
      case REVIEW_ADD_REQUEST:
        return { loading: true };
      case REVIEW_ADD_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case REVIEW_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const confirmDeliveryReducer = (state = {}, action) => {
    switch (action.type) {
      case CONFIRM_DELIVERY_REQUEST:
        return { loading: true };
      case CONFIRM_DELIVERY_SUCCESS:
        return { loading: false, success: true };
      case CONFIRM_DELIVERY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
