import axios from 'axios';
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
 
const API_URL = process.env.REACT_APP_API_URL;

export const createPayment = (paymentData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },  } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-payment/`,
      paymentData,
      config
    );

    dispatch({
      type: PAYMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listPayments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/get-user-payments/`, config);

    dispatch({
      type: PAYMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAdminPayments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PAYMENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/get-payments/`, config);

    dispatch({
      type: ADMIN_PAYMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PAYMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
