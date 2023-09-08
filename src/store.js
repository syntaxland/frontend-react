// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
  // productTrackSaveReducer,
  saveProductReducer,
  userFavoriteProductsReducer,
  userViewedProductsReducer,
  removeProductReducer,
  updateProductSaveCountReducer,
  viewedProductReducer,
  recommendedProductsReducer,
  productSearchReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducers } from "./reducers/userReducers";
import { userRegisterReducers } from "./reducers/userReducers";

import {
  orderCreateReducer,
  shipmentSaveReducer,
  userShipmentsReducer,
allUserShipmentsReducer,
  orderListReducer,
  allOrderListReducer,
  orderDeleteReducer,
  orderItemsListReducer,
  confirmDeliveryReducer,
  // shippingAddressReducer,
  reviewListReducer,
  orderAddReviewReducer,
  orderEditReviewReducer,
} from "./reducers/orderReducers";

import {
  paymentCreateReducer,
  paymentListReducer,
  listAllPaymentsReducer,
} from "./reducers/paymentReducers";
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

import {
  creditPointRequestCreateReducer,
  creditPointListReducer,
  creditPointAllListReducer,
  creditPointBalanceReducer,
} from "./reducers/creditPointReducers";

import { messagingReducer, emailReducer } from './reducers/messagingReducers';
import { chatReducer } from './reducers/chatReducers';

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
  productSave: saveProductReducer,
  userFavoriteProducts: userFavoriteProductsReducer,
  userViewedProducts: userViewedProductsReducer,
  viewedProduct: viewedProductReducer,
  productRemove: removeProductReducer,
  updateProductSaveCount: updateProductSaveCountReducer,
  recommendedProducts: recommendedProductsReducer,
  productSearch: productSearchReducer,
  cart: cartReducer,

  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,

  orderCreate: orderCreateReducer,
  shipmentSave: shipmentSaveReducer,
  userShipments: userShipmentsReducer,
  allUserShipments: allUserShipmentsReducer,
  orderItemsList: orderItemsListReducer,
  confirmDelivery: confirmDeliveryReducer,
  // shippingAddress: shippingAddressReducer,

  reviewList: reviewListReducer,
  orderAddReview: orderAddReviewReducer,
  orderEditReview: orderEditReviewReducer,

  creditPointRequestCreate: creditPointRequestCreateReducer,
  creditPointList: creditPointListReducer,
  creditPointAllList: creditPointAllListReducer,
  creditPointBal: creditPointBalanceReducer,

  orderList: orderListReducer,
  allOrderList: allOrderListReducer,
  orderDelete: orderDeleteReducer,

  paymentCreate: paymentCreateReducer,
  paymentList: paymentListReducer,
  listAllPayments: listAllPaymentsReducer,

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

  messaging: messagingReducer,
  emailMessaging: emailReducer,
  chat: chatReducer,
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
