// App
import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import React, { useContext } from "react";
import { Container } from "react-bootstrap";
// This is a react-router-dom@5.3.4 app
// import { useHistory  } from 'react-router'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderSuccessPage from "./components/OrderSuccessPage";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
// import FavouritesScreen from "./components/profiles/FavouritesScreen";
import SearchScreen from "./components/screens/SearchScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import LoginScreen from "./components/screens/LoginScreen";
import CartScreen from "./components/screens/CartScreen";
import CheckoutScreen from "./components/screens/CheckoutScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import ShipmentScreen from "./components/screens/ShipmentScreen";
import ReviewScreen from "./components/screens/ReviewScreen";
import AddReviewScreen from "./components/screens/AddReviewScreen";
import EditReviewScreen from "./components/screens/EditReviewScreen";
import CreditPointScreen from "./components/screens/CreditPointScreen";

import SendEmailOtp from "./components/emailOtp/SendEmailOtp";
import VerifyEmailOtp from "./components/emailOtp/VerifyEmailOtp";
import ResendEmailOtp from "./components/emailOtp/ResendEmailOtp";
import UserProfile from "./components/profiles/UserProfile";
import DeleteAccount from "./components/profiles/DeleteAccount";
import ChangePassword from "./components/profiles/ChangePassword";
import ResetPasswordRequest from "./components/profiles/ResetPasswordRequest";
import ResetPassword from "./components/profiles/ResetPassword";
import Orders from "./components/profiles/Orders";
import Payments from "./components/profiles/Payments";
import Dashboard from "./components/profiles/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      {/* <Router forceRefresh={true}> */}
      <Container fluid>
        {/* <section class="container-fliud"> */}
        <Header userInfo={userInfo} />
        <main className=" py-3">
          <Route exact path="/" component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/products/search/:keyword" component={SearchScreen} />
          <Route path="/checkout" component={CheckoutScreen} />
          <Route path="/payment" component={PaymentScreen} />

          <Route path="/shipment/:id" component={ShipmentScreen} />
          {/* <Route path="/favourites" component={FavouritesScreen} /> */}
          <Route path="/send-email-otp" component={SendEmailOtp} />
          <Route path="/verify-email-otp" component={VerifyEmailOtp} />
          <Route path="/resend-email-otp" component={ResendEmailOtp} />
          <Route
            path="/order-success/:reference"
            component={OrderSuccessPage}
          />
          <Route path="/user/profile" component={UserProfile} />
          <Route path="/delete-account" component={DeleteAccount} />
          <Route path="/change-password" component={ChangePassword} />
          <Route
            path="/reset-password-request"
            component={ResetPasswordRequest}
          />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/orders" component={Orders} />
          <Route path="/payments" component={Payments} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/review-list/:productId" component={ReviewScreen} />

          <Route path="/add-review/" component={AddReviewScreen} />
          {/* <Route path="/add-review/:orderItemId" component={AddReviewScreen} /> */}
          <Route path="/edit-review/" component={EditReviewScreen} />
          <Route path="/credit-point/" component={CreditPointScreen} />
          {/* <Route path="/get-credit-point" component={CreditPoint} /> */}

          {/* <Route path="/send-message" component={SendMessageScreen} />
          <Route path="/message-inbox" component={MessageInboxScreen} /> */}
        </main>
        <Footer />
        {/* </section> */}
      </Container>
    </Router>
  );
}

export default App;
