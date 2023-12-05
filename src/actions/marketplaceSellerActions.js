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
  GET_SELLER_ACCOUNT_REQUEST,
  GET_SELLER_ACCOUNT_SUCCESS,
  GET_SELLER_ACCOUNT_FAIL,
  UPDATE_SELLER_ACCOUNT_REQUEST,
  UPDATE_SELLER_ACCOUNT_SUCCESS,
  UPDATE_SELLER_ACCOUNT_FAIL,
  GET_SELLER_PHOTO_REQUEST,
  GET_SELLER_PHOTO_SUCCESS,
  GET_SELLER_PHOTO_FAIL,
  UPDATE_SELLER_PHOTO_REQUEST,
  UPDATE_SELLER_PHOTO_SUCCESS,
  UPDATE_SELLER_PHOTO_FAIL,
  GET_FREE_AD_REQUEST,
  GET_FREE_AD_SUCCESS,
  GET_FREE_AD_FAIL,
  UPDATE_FREE_AD_REQUEST,
  UPDATE_FREE_AD_SUCCESS,
  UPDATE_FREE_AD_FAIL,
  GET_ALL_FREE_AD_REQUEST,
  GET_ALL_FREE_AD_SUCCESS,
  GET_ALL_FREE_AD_FAIL,
  GET_PAID_AD_REQUEST,
  GET_PAID_AD_SUCCESS,
  GET_PAID_AD_FAIL,
  UPDATE_PAID_AD_REQUEST,
  UPDATE_PAID_AD_SUCCESS,
  UPDATE_PAID_AD_FAIL,
  GET_ALL_PAID_AD_REQUEST,
  GET_ALL_PAID_AD_SUCCESS,
  GET_ALL_PAID_AD_FAIL,
  DELETE_FREE_AD_REQUEST,
  DELETE_FREE_AD_SUCCESS,
  DELETE_FREE_AD_FAIL,
  DELETE_PAID_AD_REQUEST,
  DELETE_PAID_AD_SUCCESS,
  DELETE_PAID_AD_FAIL,

  GET_FREE_AD_DETAIL_REQUEST,
GET_FREE_AD_DETAIL_SUCCESS,
GET_FREE_AD_DETAIL_FAIL,
GET_PAID_AD_DETAIL_REQUEST,
GET_PAID_AD_DETAIL_SUCCESS,
GET_PAID_AD_DETAIL_FAIL,
} from "../constants/marketplaceSellerConstants";

const API_URL = process.env.REACT_APP_API_URL;

export const getFreeAd = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-free-ad/`,
      config
    );

    dispatch({
      type: GET_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getFreeAdDetail = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FREE_AD_DETAIL_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-free-ad-detail/${pk}`,
      
      config
    );

    dispatch({
      type: GET_FREE_AD_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FREE_AD_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteFreeAd = (businessFormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DELETE_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.delete(
      `${API_URL}/api/delete-free-ad/`,
      businessFormData,
      config
    );

    dispatch({
      type: DELETE_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateFreeAd = (businessFormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/update-free-ad/`,
      businessFormData,
      config
    );

    dispatch({
      type: UPDATE_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllFreeAd = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_FREE_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-free-ad/`,
      sellerData,
      config
    );

    dispatch({
      type: GET_ALL_FREE_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FREE_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// get-seller-free-ad
// update-seller-free-ad
// delete-free-ad
// get-all-free-ad
// get-seller-paid-ad
// update-seller-paid-ad
// delete-paid-ad
// get-all-paid-ad

export const getPaidAd = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-paid-ad/`,
      
      config
    );

    dispatch({
      type: GET_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPaidAdDetail = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PAID_AD_DETAIL_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-paid-ad-detail/${pk}`,
      
      config
    );

    dispatch({
      type: GET_PAID_AD_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAID_AD_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updatePaidAd = (businessFormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/update-paid-ad/`,
      businessFormData,
      config
    );

    dispatch({
      type: UPDATE_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletePaidAd = (businessFormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DELETE_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.delete(
      `${API_URL}/api/delete-paid-ad/`,
      businessFormData,
      config
    );

    dispatch({
      type: DELETE_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllPaidAd = (sellerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-paid-ad/`,
      sellerData,
      config
    );

    dispatch({
      type: GET_ALL_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const postPaidAd = (sellerData) => async (dispatch, getState) => {
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

export const postFreeAd = (sellerData) => async (dispatch, getState) => {
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

export const createMarketplaceSeller = (sellerData) => async (
  dispatch,
  getState
) => {
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

export const getSellerAccount = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_ACCOUNT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-marketplace-seller-account/`,
      config
    );

    dispatch({
      type: GET_SELLER_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSellerAccount = (businessFormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_SELLER_ACCOUNT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/update-marketplace-seller-account/`,
      businessFormData,
      config
    );

    dispatch({
      type: UPDATE_SELLER_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SELLER_ACCOUNT_FAIL,
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

export const getSellerPhoto = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_PHOTO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-marketplace-seller-photo/`,
      config
    );

    dispatch({
      type: GET_SELLER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSellerPhoto = (photoFormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_SELLER_PHOTO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/update-marketplace-seller-photo/`,
      photoFormData,
      config
    );

    dispatch({
      type: UPDATE_SELLER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SELLER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
