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
} from "../constants/marketplaceSellerConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  sellerAccount: [],
  sellerPhoto: [],
  ads: [],
  sellerApiKey: [],
  sellerAvatarUrl: [],
};

export const getSellerApiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_API_KEY_REQUEST:
      return { loading: true };
    case GET_SELLER_API_KEY_SUCCESS:
      return { loading: false, success: true, sellerApiKey: action.payload };
    case GET_SELLER_API_KEY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerApiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_API_KEY_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_API_KEY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_SELLER_API_KEY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFreeAdDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FREE_AD_DETAIL_REQUEST:
      return { loading: true };
    case GET_FREE_AD_DETAIL_SUCCESS:
      return { loading: false, success: true, 
        ads: action.payload.data,
        sellerApiKey: action.payload.sellerApiKey,
        sellerAvatarUrl: action.payload.seller_avatar_url,
       };
    case GET_FREE_AD_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPaidAdDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAID_AD_DETAIL_REQUEST:
      return { loading: true };
    case GET_PAID_AD_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload.data,
        sellerApiKey: action.payload.sellerApiKey,
        sellerAvatarUrl: action.payload.seller_avatar_url,
      };
    case GET_PAID_AD_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FREE_AD_REQUEST:
      return { loading: true };
    case GET_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload.data,
        sellerApiKey: action.payload.sellerApiKey,
      };

    case GET_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FREE_AD_REQUEST:
      return { loading: true };
    case UPDATE_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FREE_AD_REQUEST:
      return { loading: true };
    case DELETE_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case DELETE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FREE_AD_REQUEST:
      return { loading: true };
    case GET_ALL_FREE_AD_SUCCESS:
      return { loading: false, success: true, ads: action.payload };
    case GET_ALL_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAID_AD_REQUEST:
      return { loading: true };
    case GET_PAID_AD_SUCCESS:
      return { loading: false, success: true, ads: action.payload };
    case GET_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAID_AD_REQUEST:
      return { loading: true };
    case UPDATE_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PAID_AD_REQUEST:
      return { loading: true };
    case DELETE_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PAID_AD_REQUEST:
      return { loading: true };
    case GET_ALL_PAID_AD_SUCCESS:
      return { loading: false, success: true, ads: action.payload };
    case GET_ALL_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
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
