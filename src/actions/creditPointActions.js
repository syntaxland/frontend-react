// creditPointActions.js
import axios from 'axios';
import {
  CREDIT_POINT_REQUEST_CREATE_REQUEST,
  CREDIT_POINT_REQUEST_CREATE_SUCCESS,
  CREDIT_POINT_REQUEST_CREATE_FAIL,

  CREDIT_POINT_LIST_REQUEST,
  CREDIT_POINT_LIST_SUCCESS,
  CREDIT_POINT_LIST_FAIL,

  CREDIT_POINT_ALL_LIST_REQUEST,
  CREDIT_POINT_ALL_LIST_SUCCESS,
  CREDIT_POINT_ALL_LIST_FAIL,
} from '../constants/creditPointConstants';

const API_URL = process.env.REACT_APP_API_URL;

export const createCreditPointRequest = creditPointRequest => async (dispatch, getState) => {
  try {
    dispatch({ type: CREDIT_POINT_REQUEST_CREATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(`${API_URL}/api/credit-point-request/`, creditPointRequest, config);

    dispatch({ type: CREDIT_POINT_REQUEST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREDIT_POINT_REQUEST_CREATE_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const getCreditPointList = () => async (dispatch, getState) => {
    try {
      dispatch({ type: CREDIT_POINT_LIST_REQUEST });
  
      const { userLogin: { userInfo } } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
  
      const { data } = await axios.get(`${API_URL}/api/get-credit-point/`, config);
  
      dispatch({ type: CREDIT_POINT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREDIT_POINT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const getCreditPointAllList = () => async (dispatch, getState) => {
    try {
      dispatch({ type: CREDIT_POINT_ALL_LIST_REQUEST });
  
      const { userLogin: { userInfo } } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
  
      const { data } = await axios.get(`${API_URL}/api/get-all-credit-points/`, config);
  
      dispatch({ type: CREDIT_POINT_ALL_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREDIT_POINT_ALL_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
