// UserProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
} from "../../actions/userProfileActions";
import { resendEmailOtp } from "../../actions/emailOtpActions";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function UserProfile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const updateProfile = useSelector((state) => state.updateProfile);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, success, error } = updateProfile;
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  // const { loading: updateAvatarLoading, success: updateAvatarSuccess, error: updateAvatarError } = useSelector((state) => state.updateUserAvatar);

  const handleAvatarChange = (e) => {
    const avatar = e.target.files[0];
    if (avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      dispatch(updateUserAvatar(formData));
    }
  };

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    avatar: "",
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  // useEffect(() => {
  //   if (userProfile && userProfile.profile) {
  //     const profile = userProfile.profile;
  //     setUserData({
  //       ...userData,
  //       first_name: profile.first_name,
  //       last_name: profile.last_name,
  //       phone_number: profile.phone_number,
  //       avatar: profile.avatar,
  //     });
  //   }
  // }, [userProfile, userData]);

  useEffect(() => {
    if (userProfile && userProfile.profile) {
      setUserData({
        first_name: userProfile.profile.first_name,
        last_name: userProfile.profile.last_name,
        phone_number: userProfile.profile.phone_number,
        avatar: userProfile.profile.avatar,
      });
    }
  }, [userProfile]);

  

  useEffect(() => {
    if (userInfo) {
      setUserData({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone_number: userInfo.phone_number,
        avatar: userInfo.avatar,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); 
    }
  }, [success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(userData));
  };

  const handleDeleteAccount = () => {
    // setUserData({ ...userData, password: "" }); // Clear the password field
    history.push("/delete-account");
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
    history.push("/delete-account");
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center">Update Profile</h2>
          {loading && <Loader />}
          {/* {success && (
            <Message variant="success">Profile updated successfully.</Message>
          )} */}
          {successMessage && (
        <Message variant="success">{successMessage}</Message>
      )}
          {error && <Message variant="danger">{error}</Message>}
          {/* {deleteSuccessMessage && <Alert variant="success">{deleteSuccessMessage}</Alert>} */}
          <p>
            Verified{" "}
            <input type="checkbox" checked={userInfo.is_verified} readOnly />
          </p>
          <Form encType="multipart/form-data">
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
                value={userData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Adress</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={userInfo.email}
                readOnly
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <div className="d-flex justify-content-between pt-3">
                <Form.Control
                  type="password"
                  name="password"
                  value={userData.password}
                  readOnly
                  onChange={handleInputChange}
                />
                <Button variant="success" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-right pt-3">
              <Button variant="primary" onClick={handleUpdateProfile}>
                Update Profile
              </Button>{" "}
            </div>
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
          <h2 className="text-center">Order Shipments</h2>
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
