// UserProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../../actions/userProfileActions";
import { resendEmailOtp } from "../../actions/emailOtpActions";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

function UserProfile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    avatar: "",
    password: "",
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userProfile && userProfile.profile) {
      const profile = userProfile.profile;
      setUserData({
        ...userData,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        avatar: profile.avatar,
      });
    }
  }, [userProfile, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(userData));
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      dispatch(deleteUserAccount());
    }
  };

  const handleResendEmailOtp = () => {
    dispatch(resendEmailOtp(userInfo.email, userInfo.first_name));
    history.push("/verify-email-otp"); 
  };

  const handleFavourite = () => {
    history.push("/favourites"); 
  };
  

  const handleVerifyEmail = () => {
    if (!userInfo.is_verified) {
      handleResendEmailOtp();
    }
  };

  const handleChangePassword = () => {
    // Logic to handle changing password
    // You can implement a modal or redirect to a separate change password page
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center">Bio</h2>
          <p>
            Verified{" "}
            <input type="checkbox" checked={userInfo.is_verified} readOnly />
          </p>
          <Form>
            {/* {userInfo.is_verified ? (
              <p>Verified</p>
            ) : (
              <Button variant="primary" onClick={handleVerifyEmail}>
                Verify Email
              </Button>
            )} */}
            {!userInfo.is_verified && (
              <Button variant="primary" onClick={handleVerifyEmail}>
                Verify Email
              </Button>
            )}
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={userInfo.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={userInfo.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Adress</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={userInfo.phone_number}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                readOnly
                onChange={handleInputChange}
              />
              <Button variant="primary" onClick={handleChangePassword}>
                Change Password
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateProfile}>
              Update Profile
            </Button>{" "}
          </Form>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {/* Orders Section */}
          <h2 className="text-center">Orders</h2>
          {/* Orders content */}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {/* Orders Shipments Section */}
          <h2 className="text-center">Orders Shipments</h2>
          {/* Orders Shipments content */}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {/* Payments Section */}
          <h2 className="text-center">Payments</h2>
          {/* Payments content */}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {/* Reviews Section */}
          <h2 className="text-center">Reviews</h2>
          {/* Reviews content */}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {/* Payment Setting Section */}
          <h2 className="text-center">Payment Setting</h2>
          {/* Payment Setting content */}
        </Col>
      </Row>
      <div className="d-flex justify-content-between pt-3">
        <Button
          variant="primary"
          onClick={handleFavourite}
          className="btn-primary"
        >
          Favourites
        </Button>
        <Button
          variant="danger"
          onClick={handleDeleteAccount}
          className="btn-danger"
        >
          Delete Account
        </Button>
      </div>
    </Container>
  );
}

export default UserProfile;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getUserProfile,
//   updateUserProfile,
// } from "../../actions/userProfileActions";
// // import { updateUser } from '../../actions/userActions';
// import { deleteUserAccount } from "../../actions/userProfileActions";

// function UserProfile() {
//   const dispatch = useDispatch();
//   const userProfile = useSelector((state) => state.userProfile);
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const [userData, setUserData] = useState({
//     first_name: "",
//     last_name: "",
//     phone_number: "",
//     avatar: "",
//   });

//   useEffect(() => {
//     if (userInfo) {
//       dispatch(getUserProfile()); // Fetch user profile data
//     }
//   }, [dispatch, userInfo]);

//   useEffect(() => {
//     if (userProfile && userProfile.profile) {
//       const profile = userProfile.profile;
//       setUserData({
//         ...userData,
//         first_name: profile.first_name,
//         last_name: profile.last_name,
//         phone_number: profile.phone_number,
//         avatar: profile.avatar,
//       });
//     }
//   }, [userProfile, userData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleUpdateProfile = () => {
//     dispatch(updateUserProfile(userData)); // Update user profile
//     // dispatch(updateUser({ ...userInfo, ...userData }));
//   };

//   const handleDeleteAccount = () => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete your account? This action cannot be undone."
//       )
//     ) {
//       dispatch(deleteUserAccount());
//     }
//   };

//   return (
//     <div>
//       <h2>Bio</h2>
//       <div>
//         <label>First Name</label>
//         <input
//           type="text"
//           name="first_name"
//           value={userData.first_name}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Last Name</label>
//         <input
//           type="text"
//           name="last_name"
//           value={userData.last_name}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Phone Number</label>
//         <input
//           type="text"
//           name="phone_number"
//           value={userData.phone_number}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label>Avatar</label>
//         <input
//           type="file"
//           name="avatar"
//           accept="image/*"
//           onChange={handleInputChange}
//         />
//       </div>
//       <button onClick={handleUpdateProfile}>Update Profile</button>
//       <div>
//         <button onClick={handleDeleteAccount} className="btn btn-danger">
//           Delete Account
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;
