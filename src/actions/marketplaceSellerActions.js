// marketplaceSellerActions.js
import axios from "axios";
import {
  CREATE_MARKETPLACE_SELLER_REQUEST,
  CREATE_MARKETPLACE_SELLER_SUCCESS,
  CREATE_MARKETPLACE_SELLER_FAIL,
  MARKETPLACE_SELLER_PHOTO_REQUEST,
  MARKETPLACE_SELLER_PHOTO_SUCCESS,
  MARKETPLACE_SELLER_PHOTO_FAIL,

  POST_FREE_AD_REQUEST,
POST_FREE_AD_SUCCESS,
POST_FREE_AD_FAIL,
POST_PAID_AD_REQUEST,
POST_PAID_AD_SUCCESS,
POST_PAID_AD_FAIL,

} from "../constants/marketplaceSellerConstants";

const API_URL = process.env.REACT_APP_API_URL;

export const postPaidAd =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_PAID_AD_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/create-paid-ad/`,
        sellerData,
        config
      );

      dispatch({
        type: POST_PAID_AD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_PAID_AD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const postFreeAd =
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_FREE_AD_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/create-free-ad/`,
        sellerData,
        config
      );

      dispatch({
        type: POST_FREE_AD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_FREE_AD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const createMarketplaceSeller = 
  (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_MARKETPLACE_SELLER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/create-marketplace-seller/`,
        sellerData,
        config
      );

      dispatch({
        type: CREATE_MARKETPLACE_SELLER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_MARKETPLACE_SELLER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sellerPhoto = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARKETPLACE_SELLER_PHOTO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/marketplace-seller-photo/`,
      sellerData,
      config
    );

    dispatch({
      type: MARKETPLACE_SELLER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARKETPLACE_SELLER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
