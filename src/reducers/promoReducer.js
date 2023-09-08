// src/reducers/promoReducer.js
import {
    APPLY_PROMO_SUCCESS,
    APPLY_PROMO_ERROR,
    SET_TIMER,

    REFERRAL_SUCCESS,
    REFERRAL_ERROR,
  } from "../constants/promoConstants";
  
  const initialState = {
    promoCode: null,
    promoError: null,
    timer: 0, // Timer in seconds

    referralCode: null,
    referralError: null,
  };
  
  export const promoReducer = (state = initialState, action) => {
    switch (action.type) {
      case APPLY_PROMO_SUCCESS:
        return {
          ...state,
          promoCode: action.payload,
          promoError: null,
        };
      case APPLY_PROMO_ERROR:
        return {
          ...state,
          promoCode: null,
          promoError: action.payload,
        };
      case SET_TIMER:
        return {
          ...state,
          timer: action.payload,
        };
      default:
        return state;
    }
  };

  export const referralReducer = (state = initialState, action) => {
    switch (action.type) {
      case REFERRAL_SUCCESS:
        return {
          ...state,
          referralCode: action.payload,
          referralError: null,
        };
      case REFERRAL_ERROR:
        return {
          ...state,
          referralCode: null,
          referralError: action.payload,
        };
      default:
        return state;
    }
  };
  