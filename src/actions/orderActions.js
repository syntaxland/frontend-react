import axios from "axios";
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
 
const API_URL =  process.env.REACT_APP_API_URL;

export const createOrder = (order) => async (dispatch, getState) => { 
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { userLogin: { userInfo }, } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      }, 
    };

    const { data } = await axios.post(`${API_URL}/api/create-order/`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/get-user-orders/`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.delete(`${API_URL}/api/delete-orders/${id}/`, config);

    dispatch({ type: ORDER_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};


export const listOrderItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ITEMS_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/get-order-items/`, config);

    dispatch({
      type: ORDER_ITEMS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ITEMS_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};


export const addReview = (productId, reviewData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_ADD_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(`${API_URL}/api/products/${productId}/add-review/`, reviewData, config);

    dispatch({
      type: REVIEW_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ADD_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const confirmDelivery = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONFIRM_DELIVERY_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.put(`${API_URL}/api/order/${orderId}/confirm-delivery/`, {}, config);

    dispatch({ type: CONFIRM_DELIVERY_SUCCESS });
  } catch (error) {
    dispatch({
      type: CONFIRM_DELIVERY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
