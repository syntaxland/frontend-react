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
  GET_SELLER_API_KEY_REQUEST,
  GET_SELLER_API_KEY_SUCCESS,
  GET_SELLER_API_KEY_FAIL,
  UPDATE_SELLER_API_KEY_REQUEST,
  UPDATE_SELLER_API_KEY_SUCCESS,
  UPDATE_SELLER_API_KEY_FAIL,
  CREATE_PAID_AD_MESSAGE_REQUEST,
  CREATE_PAID_AD_MESSAGE_SUCCESS,
  CREATE_PAID_AD_MESSAGE_FAIL,
  LIST_PAID_AD_MESSAGE_REQUEST,
  LIST_PAID_AD_MESSAGE_SUCCESS,
  LIST_PAID_AD_MESSAGE_FAIL,
  CREATE_FREE_AD_MESSAGE_REQUEST,
  CREATE_FREE_AD_MESSAGE_SUCCESS,
  CREATE_FREE_AD_MESSAGE_FAIL,
  LIST_FREE_AD_MESSAGE_REQUEST,
  LIST_FREE_AD_MESSAGE_SUCCESS,
  LIST_FREE_AD_MESSAGE_FAIL,
  EDIT_PAID_AD_REQUEST,
  EDIT_PAID_AD_SUCCESS,
  EDIT_PAID_AD_FAIL,
  DEACTIVATE_PAID_AD_REQUEST,
  DEACTIVATE_PAID_AD_SUCCESS,
  DEACTIVATE_PAID_AD_FAIL,
  REACTIVATE_PAID_AD_REQUEST,
  REACTIVATE_PAID_AD_SUCCESS,
  REACTIVATE_PAID_AD_FAIL,
} from "../constants/marketplaceSellerConstants";

const API_URL = process.env.REACT_APP_API_URL;

export const editPaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PAID_AD_REQUEST });

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
      `${API_URL}/api/edit-paid-ad/`,
      adData,

      config
    );

    dispatch({
      type: EDIT_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deactivatePaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEACTIVATE_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/deactivate-paid-ad/`,
      adData,
      config
    );

    dispatch({
      type: DEACTIVATE_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const reactivatePaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REACTIVATE_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/reactivate-paid-ad/`,
      adData,

      config
    );

    dispatch({
      type: REACTIVATE_PAID_AD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REACTIVATE_PAID_AD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createPaidAdMessage = (messageData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_PAID_AD_MESSAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-paid-ad-message/`,
      messageData,

      config
    );

    dispatch({
      type: CREATE_PAID_AD_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PAID_AD_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listPaidAdMessages = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_PAID_AD_MESSAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/list-paid-ad-messages/${pk}`,

      config
    );

    dispatch({
      type: LIST_PAID_AD_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_PAID_AD_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createFreeAdMessage = (messageData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_FREE_AD_MESSAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-free-ad-message/`,
      messageData,

      config
    );

    dispatch({
      type: CREATE_FREE_AD_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FREE_AD_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listFreeAdMessages = (pk) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_FREE_AD_MESSAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/list-free-ad-messages/${pk}`,

      config
    );

    dispatch({
      type: LIST_FREE_AD_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_FREE_AD_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSellerFreeAd = () => async (dispatch, getState) => {
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

export const deleteFreeAd = (adData) => async (dispatch, getState) => {
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

    const { data } = await axios.post(
      `${API_URL}/api/delete-free-ad/`,
      adData,
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

export const deletePaidAd = (adData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PAID_AD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/delete-paid-ad/`,
      adData,
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

export const getSellerPaysofterApiKey = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_API_KEY_REQUEST });

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
      `${API_URL}/api/get-seller-api-key/`,
      config
    );

    dispatch({
      type: GET_SELLER_API_KEY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_API_KEY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSellerPaysofterApiKey = (apiKeyFormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_SELLER_API_KEY_REQUEST });

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
      `${API_URL}/api/save-seller-api-key/`,
      apiKeyFormData,
      config
    );

    dispatch({
      type: UPDATE_SELLER_API_KEY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SELLER_API_KEY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
