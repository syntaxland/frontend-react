// RegisterScreen.js
import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { sendEmailOtp } from "../../actions/emailOtpActions";
import FormContainer from "../FormContainer";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function RegisterScreen({ location, history }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [selectedCountry] = useState("US");
  const [successMessage, setSuccessMessage] = useState("");
  const [isValid, setIsValid] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
  });

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  

  const handleInputChange = (field, value) => {
    if (field === "confirmPassword") {
      setIsValid((prevIsValid) => ({
        ...prevIsValid,
        [field]: value === password,
      }));
    } else {
      setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: !!value }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      console.log("Dispatching registration...");
      try {

      dispatch(register(firstName, lastName, email, password, phoneNumber));

        // console.log("Checking conditions...");
        // console.log("Loading:", loading);
        // console.log("Error:", error);
        // console.log("User Info:", userRegister.userInfo);

        // if (!loading && !error && userRegister.userInfo) {
        //   console.log("Dispatching email OTP...");
        //   dispatch(sendEmailOtp(email, firstName));
        // }
      //  await dispatch(sendEmailOtp(email, firstName));
      } catch (error) {
        setMessage(error.response.data.detail);
        // console.log(error);
        console.log("Error object:", error);
      }
    }
  };

  useEffect(() => {
    if (userInfo && !error) {
      if (!userInfo.is_verified) {
        history.push("/verify-email-otp");
        setSuccessMessage("Please verify your email.");

        
      } else {
        // dispatch({ type: "USER_REGISTER_SUCCESS" });
        setSuccessMessage("User already exists. Please login.");
        const redirectTimer = setTimeout(() => {
          // dispatch({ type: "USER_REGISTER_SUCCESS" });
          history.push("/login");
        }, 3000);
        return () => {
          clearTimeout(redirectTimer);
        };
        
      }
      dispatch({
        type: "STORE_REGISTRATION_DATA",
        payload: {
          firstName,
          email,
        },
      });
    }
  }, [userInfo, error, history, dispatch, email, firstName]);

  useEffect(() => {
    if (!loading && !error && userRegister.userInfo) {
      dispatch(sendEmailOtp(email, firstName));
    }
  }, [loading, error, userRegister.userInfo, dispatch, email, firstName]);

  // useEffect(() => {
  //   if (userInfo && !error) {
  //     dispatch({
  //       type: "STORE_REGISTRATION_DATA",
  //       payload: {
  //         firstName,
  //         email,
  //       },
  //     });
  
  //     if (!userInfo.is_verified) {
  //       // Dispatch the sendEmailOtp action
  //       dispatch(sendEmailOtp(email, firstName));
        
  //       // Redirect to the verify-email-otp page
  //       history.push("/verify-email-otp");
  //       setSuccessMessage("Please verify your email.");
  //     } else {
  //       // User is already verified
  //       setSuccessMessage("User already exists. Please login.");
  //       const redirectTimer = setTimeout(() => {
  //         history.push("/login");
  //       }, 3000);
        
  //       return () => {
  //         clearTimeout(redirectTimer);
  //       };
  //     }
  //   }
  // }, [userInfo, error, history, dispatch, email, firstName]);
  

  return (
    <Container>
      <FormContainer>
        <h1 className="text-center">Register</h1>
        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}

        {/* {error && (
          <Message variant="danger">
            {error.email &&
              error.email.map((msg, index) => (
                <div key={`email-${index}`}>{msg}</div>
              ))}
            {error.phone_number &&
              error.phone_number.map((msg, index) => (
                <div key={`phone-${index}`}>{msg}</div>
              ))}
            {error.username &&
              error.username.map((msg, index) => (
                <div key={`username-${index}`}>{msg}</div>
              ))}
          </Message>
        )} */}

        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                handleInputChange("firstName", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.first_name
                  ? "is-invalid"
                  : isValid.firstName
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.firstName && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.first_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                handleInputChange("lastName", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.last_name
                  ? "is-invalid"
                  : isValid.lastName
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.lastName && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.last_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange("email", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.email
                  ? "is-invalid"
                  : isValid.email
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.email && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput
              country={selectedCountry}
              value={phoneNumber}
              onChange={(value) => {
                setPhoneNumber(value);
                handleInputChange("phoneNumber", value);
              }}
              className={`form-control rounded ${
                error && error.phone_number
                  ? "is-invalid"
                  : isValid.phoneNumber
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.phoneNumber && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.phone_number}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange("password", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.password
                  ? "is-invalid"
                  : isValid.password
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.password && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleInputChange("confirmPassword", e.target.value);
              }}
              required
              className={`rounded ${
                error && error.confirm_password
                  ? "is-invalid"
                  : isValid.confirmPassword
                  ? "is-valid"
                  : ""
              }`}
            />
            <div className="valid-feedback">
              {isValid.confirmPassword && (
                <i className="bi bi-check2-circle text-success"></i>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {error && error.confirm_password}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="py-3">
            <Col className="text-center">
              <Button
                className="mt-3 rounded w-100"
                type="submit"
                variant="success"
                block
              >
                <i className="bi bi-check2-circle"></i>
                Register
              </Button>
            </Col>
          </Row>
        </Form>

        <Row className="py-3">
          <Col className="text-center">
            <Button variant="danger" className="rounded w-100" block>
              <i className="bi bi-google"></i>
              Continue with Google
            </Button>
          </Col>
        </Row>

        <Row className="py-3">
          <Col className="text-center">
            <Button
              variant="primary"
              className="rounded w-100"
              block
              onClick={() => history.push("/login")}
            >
              Already a user? Login
            </Button>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
}

export default RegisterScreen;

// import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// import { Row, Col, Form, Button, Container } from "react-bootstrap";
// import Message from "../Message";
// import Loader from "../Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../actions/userActions";
// import FormContainer from "../FormContainer";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

// function RegisterScreen({ location, history }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [message, setMessage] = useState("");
//   const dispatch = useDispatch();
//   const [selectedCountry] = useState("US");
//   const [successMessage, setSuccessMessage] = useState("");

//   // const redirect = location.search ? location.search.split("=")[1] : "/";

//   const userRegister = useSelector((state) => state.userRegister);
//   const { error, loading, userInfo } = userRegister;

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//     } else {
//       dispatch(register(firstName, lastName, email, password, phoneNumber));
//     }
//   };

//   useEffect(() => {
//     if (userInfo) {
//       // Show the success message and redirect after 1 second
//       setSuccessMessage("Registration successful. Please login to continue.");
//       const redirectTimer = setTimeout(() => {
//         history.push("/login");
//       }, 1000);

//       return () => {
//         // Clear the redirect timer on component unmount
//         clearTimeout(redirectTimer);
//       };
//     }
//   }, [userInfo, history]);

//   return (
//     <Container>
//       <FormContainer>
//         <h1 className="text-center">Register</h1>
//         {successMessage && (
//           <Message variant="success">{successMessage}</Message>
//         )}
//         {message && <Message variant="danger">{message}</Message>}
//         {error && <Message variant="danger">{error}</Message>}
//         {loading && <Loader />}

//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId="firstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//               className="rounded"
//             />
//           </Form.Group>

//           <Form.Group controlId="lastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//               className="rounded"
//             />
//           </Form.Group>

//           <Form.Group controlId="email">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="rounded"
//             />
//           </Form.Group>

//           <Form.Group controlId="phoneNumber">
//             <Form.Label>Phone Number</Form.Label>
//             <PhoneInput
//               country={selectedCountry}
//               value={phoneNumber}
//               onChange={setPhoneNumber}
//               className="form-control rounded"
//             />
//           </Form.Group>

//           <Form.Group controlId="password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="rounded"
//             />
//           </Form.Group>

//           <Form.Group controlId="confirmPassword">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="rounded"
//             />
//           </Form.Group>

//           <Row className="py-3">
//             <Col className="text-center">
//               <Button
//                 className="mt-3 rounded w-100"
//                 type="submit"
//                 variant="success"
//                 block
//               >
//                 Register
//               </Button>
//             </Col>
//           </Row>
//         </Form>

//         <Row className="py-3">
//           <Col className="text-center">
//             <Button variant="danger" className="rounded w-100" block>
//               Continue with Google
//             </Button>
//           </Col>
//         </Row>
//         <Row className="py-3">
//           <Col className="text-center">
//             <Button
//               variant="primary"
//               className="rounded w-100"
//               block
//               onClick={() => history.push("/login")}
//             >
//               Already a user? Login
//             </Button>
//           </Col>
//         </Row>
//       </FormContainer>
//     </Container>
//   );
// }

// export default RegisterScreen;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Form, Button } from "react-bootstrap";
// import Message from "../Message";
// import Loader from "../Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../actions/userActions";
// import FormContainer from "../FormContainer";

// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

// function RegisterScreen({ location, history }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [message, setMessage] = useState("");
//   const dispatch = useDispatch();
//   const [selectedCountry] = useState("US");

//   // const redirect = location.search ? location.search.split("=")[1] : "/";

//   const userRegister = useSelector((state) => state.userRegister);
//   const { error, loading, userInfo } = userRegister;

//   useEffect(() => {
//     if (userInfo) {
//       history.push('/login');
//     }
//   }, [history, userInfo]);
// // }, [history, userInfo, redirect]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//     } else {
//       dispatch(register(firstName, lastName, email, password, phoneNumber));
//     }
//   };

//   // // If registration is successful, show a success message and redirect after a brief delay
//   // if (success) {
//   //   setMessage("Registration successful!");
//   //   setTimeout(() => {
//   //     history.push("/login");
//   //   }, 2000); // Wait for 2 seconds before redirecting to the login page
//   // }

//   return (
//     <div>
//       <FormContainer>
//         <h1>Sign Up</h1>
//         {message && <Message variant="danger">{message}</Message>}
//         {error && <Message variant="danger">{error}</Message>}
//         {loading && <Loader />}

//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId="firstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="lastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="email">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="phoneNumber">
//             <Form.Label>Phone Number</Form.Label>
//             <PhoneInput
//               country={selectedCountry}
//               value={phoneNumber}
//               onChange={setPhoneNumber}
//               className="form-control"
//             />
//           </Form.Group>

//           <Form.Group controlId="password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="confirmPassword">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Button className="mt-3" type="submit" variant="success">
//             Register
//           </Button>
//         </Form>

//         <Row className="py-3">
//           <Col>
//             Already a user?{" "}
//             <Link to= "/login">
//             {/* <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}> */}
//               Sign In
//             </Link>
//           </Col>
//         </Row>
//       </FormContainer>
//     </div>
//   );
// }

// export default RegisterScreen;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Message from "../Message";
// import Loader from "../Loader";
// import { Row, Col, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../actions/userActions";
// import FormContainer from "../FormContainer";
// // import axios from 'axios';

// function RegisterScreen({ location, history }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const dispatch = useDispatch();

//   const redirect = location.search ? location.search.split("=")[1] : "/";

//   const userRegister = useSelector((state) => state.userRegister);
//   const { error, loading, userInfo } = userRegister;

//   useEffect(() => {
//     if (userInfo) {
//       // Set access token in Axios headers
//       // axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.access}`;
//       history.push(redirect);
//     }
//   }, [history, userInfo, redirect]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Password do not Match");
//     } else {
//       dispatch(register(name, email, password));
//     }
//   };
//   return (
//     <div>
//       <FormContainer>
//         <h1>Sign Up</h1>
//         {message && <Message variant="danger">{message}</Message>}
//         {error && <Message variant="danger">{error}</Message>}
//         {loading && <Loader />}

//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="name"
//               placeholder="Enter Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             ></Form.Control>
//           </Form.Group>

//           <Form.Group controlId="email">
//             <Form.Label>Email Address </Form.Label>
//             <Form.Control
//               required
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             ></Form.Control>
//           </Form.Group>

//           <Form.Group controlId="password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               required
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             ></Form.Control>
//           </Form.Group>

//           <Form.Group controlId="password">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               required
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             ></Form.Control>
//           </Form.Group>

//           <Button className="mt-3" type="submit" variant="success">
//             Register
//           </Button>
//         </Form>

//         <Row className="py-3">
//           <Col>
//             Already a user?
//             <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
//               {" "}
//               Sign In
//             </Link>
//           </Col>
//         </Row>
//       </FormContainer>
//     </div>
//   );
// }

// export default RegisterScreen;
