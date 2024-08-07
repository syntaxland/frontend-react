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
  getPaymentApiKeysReducer,
  paymentCreateReducer,
  paysofterPaymentCreateReducer,
  debitPaysofterAccountReducer,
  debitPaysofterUsdAccountReducer,
  createPaysofterPromiseReducer,
  paymentListReducer,
  listAllPaymentsReducer,
} from "./reducers/paymentReducers";
// import { paymentListReducer } from './reducers/paymentReducers';
// import { adminPaymentListReducer } from './reducers/adminReducers';

import { favoriteReducer } from "./reducers/favoriteReducers";
import {
  createSupportTicketReducer,
  createSupportMessageReducer,
  listSupportTicketReducer,
  listSupportMessageReducer,
  replySupportTicketReducer,
  listSupportTicketReplyReducer,
  ticketDetailListReducer,
  allTicketListReducer,
  allTicketResponseReducer,
} from "./reducers/supportReducers";
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
  otpSendReducer,
  otpVerifyReducer,
  otpVerifyUsdPromiseReducer,
} from "./reducers/accountFundOtpReducers";

import { messagingReducer, emailReducer } from "./reducers/messagingReducers";
import {
  // chatReducer,
  chatRoomsReducer,
  chatMessagesReducer,
} from "./reducers/chatReducers";
import {
  referralReducer,
  referralButtonReducer,
  getUserReferralsReducer,
  applyPomoCodeReducer,
  createPromoCodeReducer,
  promoProductListReducer,
} from "./reducers/promoReducer";

import {
  feedbackCreateReducer,
  feedbackListReducer,
} from "./reducers/feedbackReducers";

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

 

  orderList: orderListReducer,
  allOrderList: allOrderListReducer,
  orderDelete: orderDeleteReducer,

  getPaymentApiKeysState: getPaymentApiKeysReducer,
  paymentCreate: paymentCreateReducer,
  paysofterPayment: paysofterPaymentCreateReducer,
  debitPaysofterAccountState: debitPaysofterAccountReducer,
  debitPaysofterUsdAccountState: debitPaysofterUsdAccountReducer,
  createPaysofterPromiseState: createPaysofterPromiseReducer,
  paymentList: paymentListReducer,
  listAllPayments: listAllPaymentsReducer,

  favorites: favoriteReducer,

  emailOtpSend: emailOtpSendReducer,
  emailOtpVerify: emailOtpVerifyReducer,
  emailOtpResend: emailOtpResendReducer,

  otpSendState: otpSendReducer,
  otpVerifyState: otpVerifyReducer,
  otpVerifyUsdPromiseState: otpVerifyUsdPromiseReducer,
  userProfile: getUserProfileReducer,
  updateProfile: updateUserProfileReducer,
  userChangePassword: changePasswordReducer,
  deleteProfile: deleteUserProfileReducer,
  updateUserAvatar: updateUserAvatarReducer,

  sendPasswordResetLink: sendPasswordResetLinkReducer,
  resetPassword: resetPasswordReducer,

  messaging: messagingReducer,
  emailMessaging: emailReducer,
  // chat: chatReducer,
  chatRooms: chatRoomsReducer,
  chatMessages: chatMessagesReducer,

  createSupportTicketState: createSupportTicketReducer,
  createSupportMessageState: createSupportMessageReducer,
  listSupportTicketState: listSupportTicketReducer,
  listSupportMessageState: listSupportMessageReducer,
  replySupportTicketState: replySupportTicketReducer,
  listSupportTicketReplyState: listSupportTicketReplyReducer,
  ticketDetailList: ticketDetailListReducer,
  allTicketList: allTicketListReducer,
  allTicketResponse: allTicketResponseReducer,
  feedbackCreate: feedbackCreateReducer,
  feedbackList: feedbackListReducer,

  referral: referralReducer,
  referralButton: referralButtonReducer,
  userReferralState: getUserReferralsReducer,
  applyPomoCodeState: applyPomoCodeReducer,
  createPromoCodeState: createPromoCodeReducer,
  promoProductList: promoProductListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userRegisterFromStorage = localStorage.getItem("registerData")
  ? JSON.parse(localStorage.getItem("registerData"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: { registerData: userRegisterFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState, // Use the correct variable name here
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
