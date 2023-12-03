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
} from "../constants/marketplaceSellerConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  sellerAccount: [],
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
