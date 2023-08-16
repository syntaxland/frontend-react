// App
import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import React, { useContext } from "react";
import { Container } from "react-bootstrap";
// This is a react-router-dom@5.3.4 app
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import FavouritesScreen from "./components/screens/FavouritesScreen";
import SearchScreen from "./components/screens/SearchScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import LoginScreen from "./components/screens/LoginScreen";
import CartScreen from "./components/screens/CartScreen";
import SendEmailOtp from "./components/emailOtp/SendEmailOtp";
import VerifyEmailOtp from "./components/emailOtp/VerifyEmailOtp";
import ResendEmailOtp from "./components/emailOtp/ResendEmailOtp";
import Checkout from "./components/screens/CheckoutScreen";
import UserProfile from "./components/profiles/UserProfile";
import Payment from "./components/screens/PaymentScreen";
import OrderSuccessPage from "./components/OrderSuccessPage";
import DeleteAccount from "./components/profiles/DeleteAccount";
import ChangePassword from "./components/profiles/ChangePassword"; 
import ResetPasswordRequest from './components/profiles/ResetPasswordRequest';
import ResetPassword from './components/profiles/ResetPassword';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      <Container fluid>
        {/* <section class="container-fliud"> */}
        <Header userInfo={userInfo} />
        <main className="container py-3">
          <Route exact path="/" component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/products/search/:keyword" component={SearchScreen} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route path="/favourites" component={FavouritesScreen} />
          <Route path="/send-email-otp" component={SendEmailOtp} />
          <Route path="/verify-email-otp" component={VerifyEmailOtp} />
          <Route path="/resend-email-otp" component={ResendEmailOtp} />
          <Route path="/order-success/:reference" component={OrderSuccessPage} />
          <Route path="/user/profile" component={UserProfile} />
          <Route path="/delete-account" component={DeleteAccount} />
          <Route path="/change-password" component={ChangePassword} />
          <Route exact path="/reset-password-request" component={ResetPasswordRequest} />
          <Route exact path="/reset-password/:token" component={ResetPassword} />
        </main>
        <Footer />
        {/* </section> */}
      </Container>
    </Router>
  );
}

export default App;

// import React from "react";
// import { useSelector } from "react-redux";
// // import { ToastContainer, toast } from "react-toastify";
// // import React, { useContext } from "react";
// import { Container } from "react-bootstrap";
// // This is a react-router-dom@5.3.4 app
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import HomeScreen from "./components/screens/HomeScreen";
// import ProductScreen from "./components/screens/ProductScreen";
// import FavouritesScreen from "./components/screens/FavouritesScreen";
// import SearchScreen from "./components/screens/SearchScreen";
// import RegisterScreen from "./components/screens/RegisterScreen";
// import LoginScreen from "./components/screens/LoginScreen";
// import CartScreen from "./components/screens/CartScreen";

// import SendEmailOtp from "./components/emailOtp/SendEmailOtp";
// import VerifyEmailOtp from "./components/emailOtp/VerifyEmailOtp";
// import ResendEmailOtp from "./components/emailOtp/ResendEmailOtp";

// import Checkout from "./components/screens/CheckoutScreen";
// import UserProfile from "./components/profiles/UserProfile";
// import Payment from "./components/screens/PaymentScreen";
// import OrderSuccessPage from "./components/OrderSuccessPage";

// function App() {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   return (
//     <Router>
//       <Header userInfo={userInfo} />

//       <main className="py-3">
//         <Container fluid>
//           <Route exact path="/" component={HomeScreen} />
//           <Route path="/product/:id" component={ProductScreen} />
//           <Route path="/login" component={LoginScreen} />
//           <Route path="/register" component={RegisterScreen} />
//           <Route path="/cart/:id?" component={CartScreen} />
//           <Route path="/products/search/:keyword" component={SearchScreen} />
//           <Route path="/checkout" component={Checkout} />
//           <Route path="/payment" component={Payment} />
//           <Route path="/favourites" component={FavouritesScreen} />

//           <Route path="/send-email-otp" component={SendEmailOtp} />
//           <Route path="/verify-email-otp" component={VerifyEmailOtp} />
//           <Route path="/resend-email-otp" component={ResendEmailOtp} />

//           <Route
//             path="/order-success/:reference"
//             component={OrderSuccessPage}
//           />
//           <Route path="/user/profile" component={UserProfile} />
//         </Container>
//       </main>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
