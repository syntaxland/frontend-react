// userProfileActions.js
import axios from 'axios';
import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  DELETE_USER_ACCOUNT_REQUEST,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAIL,
} from '../constants/userProfileConstants';

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get('/api/user/profile/', config);

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.put('/api/user/profile/', userData, config);

    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const deleteUserAccount = () => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_USER_ACCOUNT_REQUEST });
  
      const { userLogin: { userInfo } } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete('/api/user/profile/', config);
  
      dispatch({ type: DELETE_USER_ACCOUNT_SUCCESS });
  
      // Log user out after deleting the account
    //   dispatch({ type: USER_LOGOUT });
    } catch (error) {
      dispatch({
        type: DELETE_USER_ACCOUNT_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
    }
  };
