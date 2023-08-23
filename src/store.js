// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducers } from "./reducers/userReducers";
import { userRegisterReducers } from "./reducers/userReducers";

import { 
  orderCreateReducer, 
  orderListReducer, 
  orderDeleteReducer,
  orderItemsListReducer,
  confirmDeliveryReducer,
  shippingAddressReducer,

  reviewListReducer,
  orderAddReviewReducer,
  orderEditReviewReducer,
  
 } from "./reducers/orderReducers";

import { paymentCreateReducer, paymentListReducer, adminPaymentListReducer } from "./reducers/paymentReducers";
// import { paymentListReducer } from './reducers/paymentReducers';
// import { adminPaymentListReducer } from './reducers/adminReducers';

import { favoriteReducer } from "./reducers/favoriteReducers";

import { 
  getUserProfileReducer,
  changePasswordReducer,
  updateUserProfileReducer,
  deleteUserProfileReducer,
  updateUserAvatarReducer,

  sendPasswordResetLinkReducer,
  resetPasswordReducer,

} from "./reducers/userProfileReducers";


import {
  emailOtpSendReducer,
  emailOtpVerifyReducer,
  emailOtpResendReducer,
} from "./reducers/emailOtpReducers";



import axios from "axios";
import { logout } from "./actions/userActions";

// Axios instance setup
const axiosInstance = axios.create({
  // ...other configurations
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, token expired
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,

  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,

  orderCreate: orderCreateReducer, 
  orderItemsList: orderItemsListReducer,
  confirmDelivery: confirmDeliveryReducer,
  shippingAddress: shippingAddressReducer,

  reviewList: reviewListReducer,
  orderAddReview: orderAddReviewReducer,
  orderEditReview: orderEditReviewReducer,

  orderList: orderListReducer, 
  orderDelete: orderDeleteReducer,

  paymentCreate: paymentCreateReducer,
  paymentList: paymentListReducer,
  adminPaymentList: adminPaymentListReducer,

  favorites: favoriteReducer,

  emailOtpSend: emailOtpSendReducer,
  emailOtpVerify: emailOtpVerifyReducer,
  emailOtpResend: emailOtpResendReducer,

  userProfile: getUserProfileReducer,
  updateProfile: updateUserProfileReducer,
  userChangePassword: changePasswordReducer,
  deleteProfile: deleteUserProfileReducer,
  updateUserAvatar: updateUserAvatarReducer,

  sendPasswordResetLink: sendPasswordResetLinkReducer,
  resetPassword: resetPasswordReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState, // Use the correct variable name here
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
