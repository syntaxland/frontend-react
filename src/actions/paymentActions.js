import axios from 'axios';
import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
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

