// src/actions/promoActions.js
import axios from "axios";
import {
  APPLY_PROMO_SUCCESS,
  APPLY_PROMO_ERROR,
  SET_TIMER,

  REFERRAL_SUCCESS,
  REFERRAL_ERROR,
} from "../constants/promoConstants";

const API_URL = process.env.REACT_APP_API_URL;

export const applyPromoCode = (promoCode) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      },
    };

    const response = await axios.post(
      `${API_URL}/api/apply-promo/`,
      { promo_code: promoCode },
      config
    );

    dispatch({
      type: APPLY_PROMO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: APPLY_PROMO_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const setTimer = (seconds) => {
  return {
    type: SET_TIMER,
    payload: seconds,
  };
};

export const referUser = (referralCode) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      },
    };

    await axios.post(`${API_URL}/api/refer/`, { referral_code: referralCode }, config);

    dispatch({
      type: REFERRAL_SUCCESS,
      payload: referralCode,
    });
  } catch (error) {
    dispatch({
      type: REFERRAL_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
