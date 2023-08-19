//LoginScreen.js
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import { login, logout } from "../../actions/userActions";
import GoogleLoginScreen from "./GoogleLoginScreen";

function LoginScreen({ location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  // const handleGoogleLoginClick = () => {
  //   setShowGoogleLogin(true);
  // };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.is_verified) {
        // If the email is verified, clear the userInfo and proceed with login
        history.push("/");
        // history.push(redirect);
        setSuccessMessage("Login successful.");
      } else {
        // If the email is not verified, log out the user and redirect to the email verification page
        dispatch(logout());
        history.push("/verify-email-otp");
        setSuccessMessage("Please verify your email.");
      }
    }
  }, [userInfo, history, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the request

    try {
      await dispatch(login(email, password)); // Wait for the login request to complete
      setLoading(false); // Set loading back to false after the request is completed

      // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      // if (userInfo && userInfo.access) {
      //   let refreshTokenTime = 1000 * 60 * 0.1; // ms * hr * mins
      //   setTimeout(() => {
      //     dispatch(refreshToken(userInfo.refresh));
      //   }, refreshTokenTime);
      // }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormContainer>
        <h1 className="text-center">Login</h1>
        {error && <Message variant="danger">{error}</Message>}

        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}
        <Form onSubmit={submitHandler}>
          {loading && <Loader />}
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              className="rounded w-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              className="rounded w-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Row className="py-3">
            <Col className="text-center">
              <Button
                className="mt-3 rounded w-100"
                type="submit"
                variant="success"
                block
              >
                <i className="bi bi-box-arrow-in-right"></i>
                Login
              </Button>
            </Col>
          </Row>
        </Form>

        {/* <Row className="py-3">
          <Col className="text-center">
            <Button variant="danger" className="rounded w-100" block>
              Continue with Google
            </Button> 
          </Col>
        </Row> */}
        <GoogleLoginScreen />

        <Row className="py-3">
          <Col className="text-center">
            A new Customer?{" "}
            <Link
              to="/register"
              // to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>

        <Row className="py-3">
          <Col className="text-center">
            Forgot Password? <Link to="/reset-password-request">Reset</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;

// // LoginScreen.js

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Button, Form } from "react-bootstrap";
// import Loader from "../Loader";
// import Message from "../Message";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../actions/userActions";
// import FormContainer from "../FormContainer";
// import axios from "axios";

// // const API_URL = process.env.REACT_APP_API_URL;

// function LoginScreen({ location, history }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const redirect = location.search ? location.search.split("=")[1] : "/";

//   const userLogin = useSelector((state) => state.userLogin);
//   const { error, loading, userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       // Set access token in Axios headers
//       axios.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${userInfo.access}`;

//       history.push(redirect);
//     }
//   }, [history, userInfo, redirect]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password));
//   };

//   return (
//     <div>
//       <FormContainer>
//         <h1>Sign In</h1>
//         {error && <Message variant="danger">{error}</Message>}
//         {loading && <Loader />}

//         <Form onSubmit={submitHandler}>
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

//           <Button className="mt-3" type="submit" variant="primary">
//             Sign In
//           </Button>
//         </Form>

//         <Row className="py-3">
//           <Col>
//             New Customer?
//             <Link
//               to={redirect ? `/register?redirect=${redirect}` : "/register"}
//             >
//               {" "}
//               Register
//             </Link>
//           </Col>
//         </Row>
//       </FormContainer>
//     </div>
//   );
// }

// export default LoginScreen;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Button, Form } from "react-bootstrap";
// import Loader from "../Loader";
// import Message from "../Message";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../actions/userActions";
// import FormContainer from "../FormContainer";
// import axios from "axios";

// function LoginScreen({ location, history }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const redirect = location.search ? location.search.split("=")[1] : "/";

//   const userLogin = useSelector((state) => state.userLogin);
//   const { error, loading, userInfo } = userLogin;

//   useEffect(() => {
//     // If userInfo exists, it means the user is logged in successfully
//     if (userInfo) {
//       // Store the access token in the local storage
//       localStorage.setItem("accessToken", userInfo.access);

//       // Redirect the user to the desired page after successful login
//       history.push(redirect);
//     }
//   }, [history, userInfo, redirect]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password));

//     // Set access token in Axios headers
//     axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.access}`;
//   };

//   return (
//     <div>
//       <FormContainer>
//         <h1>Sign In</h1>
//         {error && <Message variant="danger">{error}</Message>}
//         {loading && <Loader />}

//         <Form onSubmit={submitHandler}>
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

//           <Button className="mt-3" type="submit" variant="primary">
//             Sign In
//           </Button>
//         </Form>

//         <Row className="py-3">
//           <Col>
//             New Customer?
//             <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
//               {" "}
//               Register
//             </Link>
//           </Col>
//         </Row>
//       </FormContainer>
//     </div>
//   );
// }

// export default LoginScreen;

// import React,{useState,useEffect} from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Button, Form } from "react-bootstrap";
// import Loader from '../Loader';
// import Message from '../Message';
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../actions/userActions";
// import FormContainer from '../FormContainer'

// function LoginScreen({location,history}) {

//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')
//     const dispatch = useDispatch()

//     const redirect = location.search ? location.search.split('=')[1] :'/'

//     const userLogin = useSelector(state=>state.userLogin)
//     const {error,loading,userInfo}=userLogin

//     useEffect(()=>{
//         if(userInfo){
//             history.push(redirect)
//         }
//     },[history,userInfo,redirect])

//     const submitHandler= (e)=>{
//         e.preventDefault()
//         dispatch(login(email,password))
//     }
//     return (
//         <div>
//          <FormContainer>
//           <h1>Sign In</h1>
//           {error && <Message variant='danger'>{error}</Message>}
//           {loading && <Loader />}

//           <Form onSubmit={submitHandler}>

//               <Form.Group controlId='email'>
//                 <Form.Label>Email Address </Form.Label>
//                 <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
//               </Form.Group>

//               <Form.Group controlId='password'>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
//               </Form.Group>

//             <Button className='mt-3' type='submit' variant='primary'>Sign In</Button>

//           </Form>

//           <Row className='py-3'>
//               <Col>
//               New Customer?
//               <Link to={redirect?`/register?redirect=${redirect}`:'/register'}> Register</Link>
//               </Col>

//           </Row>

//          </FormContainer>
//         </div>
//     )
// }

// export default LoginScreen
