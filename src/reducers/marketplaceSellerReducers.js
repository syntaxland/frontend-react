// marketplaceSellerReducers.js
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
} from "../constants/marketplaceSellerConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  sellerAccount: [],
  sellerPhoto: [],
};

export const postPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PAID_AD_REQUEST:
      return { loading: true };
    case POST_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case POST_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FREE_AD_REQUEST:
      return { loading: true };
    case POST_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case POST_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getSellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case GET_SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true, sellerAccount: action.payload };
    case GET_SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const marketplaceSellerAccountReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_MARKETPLACE_SELLER_REQUEST:
      return { loading: true };
    case CREATE_MARKETPLACE_SELLER_SUCCESS:
      return { loading: false, success: true };
    case CREATE_MARKETPLACE_SELLER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const marketplaceSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARKETPLACE_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case MARKETPLACE_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true };
    case MARKETPLACE_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case GET_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true, sellerPhoto: action.payload };
    case GET_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
