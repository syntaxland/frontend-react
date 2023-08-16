// VerifyEmailOtp.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailOtp, resendEmailOtp } from "../../actions/emailOtpActions";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const VerifyEmailOtp = () => { 
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);

  const dispatch = useDispatch();
  const history = useHistory();

  const emailOtpVerify = useSelector((state) => state.emailOtpVerify);
  const { loading, success, error } = emailOtpVerify;

  const userRegisterData = useSelector(
    (state) => state.userRegister.registrationData
  );

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (success && !loading && !error) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
  }, [success, history, error, loading]);

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (!resendDisabled) {
      setCountdown(60);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  const handleVerifyEmailOtp = () => {
    dispatch(verifyEmailOtp(otp));
  };

  const handleResendEmailOtp = async () => {
    setResendLoading(true);
    setResendMessage("");

    try {
      await dispatch(
        resendEmailOtp(userRegisterData.email, userRegisterData.firstName)
      );
      setResendMessage("OTP Resent successfully!");
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }

    setResendLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center text-center mt-5">
        <Col lg={6}>
          <div className="border rounded p-4">
            <h1>Verify Email OTP</h1>
            <Form>
              {showSuccessMessage && (
                <Message variant="success">
                  Email verified successfully! You can now log in.
                </Message>
              )}
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}
              {resendMessage && (
                <Message variant={resendLoading ? "info" : "danger"}>
                  {resendMessage}
                </Message>
              )}
              <Form.Group controlId="otp">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </Form.Group>
              <div className="py-3">
                <Button
                  onClick={handleVerifyEmailOtp}
                  disabled={loading || success}
                  variant="primary"
                  type="submit"
                >
                  Verify OTP
                </Button>
              </div>
            </Form>
            <Form onSubmit={handleResendEmailOtp}>
              <Button variant="link" type="submit" disabled={resendDisabled || resendLoading}>
                {resendLoading
                  ? "Resending..."
                  : resendDisabled
                  ? `Resend OTP (${countdown}s)`
                  : "Resend OTP"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEmailOtp;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyEmailOtp, resendEmailOtp } from "../../actions/emailOtpActions";
// import { useHistory } from "react-router-dom";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Loader from "../../components/Loader";
// import Message from "../../components/Message";

// const VerifyEmailOtp = () => {
//   const [otp, setOtp] = useState("");
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [resendMessage, setResendMessage] = useState("");
//   const [countdown, setCountdown] = useState(60);

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const emailOtpVerify = useSelector((state) => state.emailOtpVerify);
//   const { loading, success, error } = emailOtpVerify;

//   const userRegisterData = useSelector(
//     (state) => state.userRegister.registrationData
//   );

//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     if (success && !loading && !error) {
//       setShowSuccessMessage(true);
//       setTimeout(() => {
//         history.push("/login");
//       }, 3000);
//     }
//   }, [success, history, error, loading]);

//   useEffect(() => {
//     let timer;
//     if (countdown > 0 && resendDisabled) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (!resendDisabled) {
//       setCountdown(60);
//     }

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [countdown, resendDisabled]);

//   const handleVerifyEmailOtp = () => {
//     dispatch(verifyEmailOtp(otp));
//   };

//   const handleResendEmailOtp = async () => {
//     setResendLoading(true);
//     setResendMessage("");

//     try {
//       await dispatch(
//         resendEmailOtp(userRegisterData.email, userRegisterData.firstName)
//       );
//       setResendMessage("OTP Resent successfully!");
//       setResendDisabled(true);
//     } catch (error) {
//       setResendMessage("Error resending OTP. Please try again.");
//     }

//     setResendLoading(false);
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center text-center mt-5">
//         <Col lg={6}>
//           <div className="border rounded p-4">
//             <h1>Verify Email OTP</h1>
//             <Form>
//               {showSuccessMessage && (
//                 <Message variant="success">
//                   Email OTP verified successfully! You can now log in.
//                 </Message>
//               )}
//               {loading && <Loader />}
//               {error && <Message variant="danger">{error}</Message>}
//               {resendMessage && (
//                 <Message variant={resendLoading ? "info" : "danger"}>
//                   {resendMessage}
//                 </Message>
//               )}
//               <Form.Group controlId="otp">
//                 <Form.Control
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="Enter OTP"
//                 />
//               </Form.Group>
//               <div className="py-3">
//                 <Button
//                   onClick={handleVerifyEmailOtp}
//                   disabled={loading || success}
//                   variant="primary"
//                   type="submit"
//                 >
//                   Verify OTP
//                 </Button>
//               </div>
//             </Form>
//             <Form onSubmit={handleResendEmailOtp}>
//               <Button variant="link" type="submit" disabled={resendDisabled || resendLoading}>
//                 {resendLoading
//                   ? "Resending..."
//                   : `Resend OTP ${resendDisabled ? `(${countdown}s)` : ""}`}
//               </Button>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default VerifyEmailOtp;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyEmailOtp, resendEmailOtp } from "../../actions/emailOtpActions";
// import { useHistory } from "react-router-dom";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Loader from "../../components/Loader";
// import Message from "../../components/Message";

// const VerifyEmailOtp = () => {
//   const [otp, setOtp] = useState("");
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [resendMessage, setResendMessage] = useState("");
//   const [countdown, setCountdown] = useState(60);

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const emailOtpVerify = useSelector((state) => state.emailOtpVerify);
//   const { loading, success, error } = emailOtpVerify;

//   const userRegisterData = useSelector(
//     (state) => state.userRegister.registrationData
//   );

//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     if (success && !loading && !error) {
//       setShowSuccessMessage(true);
//       setTimeout(() => {
//         history.push("/login");
//       }, 3000);
//     }
//   }, [success, history, error, loading]);

//   useEffect(() => {
//     let timer;
//     if (countdown > 0 && resendDisabled) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else {
//       setResendDisabled(false);
//       setCountdown(60);
//     }

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [countdown, resendDisabled]);

//   const handleVerifyEmailOtp = () => {
//     dispatch(verifyEmailOtp(otp));
//   };

//   const handleResendEmailOtp = async () => {
//     setResendLoading(true);
//     setResendMessage("");

//     try {
//       await dispatch(
//         resendEmailOtp(userRegisterData.email, userRegisterData.firstName)
//       );
//       setResendMessage("OTP Resent successfully!");
//       setResendDisabled(true);
//       setCountdown(60);
//     } catch (error) {
//       setResendMessage("Error resending OTP. Please try again.");
//     }

//     setResendLoading(false);
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center text-center mt-5">
//         <Col lg={6}>
//           <div className="border rounded p-4">
//             <h1>Verify Email OTP</h1>
//             <Form>
//               {showSuccessMessage && (
//                 <Message variant="success">
//                   Email OTP verified successfully! You can now log in.
//                 </Message>
//               )}
//               {loading && <Loader />}
//               {error && <Message variant="danger">{error}</Message>}
//               {resendMessage && (
//                 <Message variant={resendLoading ? "info" : "danger"}>
//                   {resendMessage}
//                 </Message>
//               )}
//               <Form.Group controlId="otp">
//                 <Form.Control
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="Enter OTP"
//                 />
//               </Form.Group>
//               <div className="py-3">
//                 <Button
//                   onClick={handleVerifyEmailOtp}
//                   disabled={loading || success}
//                   variant="primary"
//                   type="submit"
//                 >
//                   Verify OTP
//                 </Button>
//               </div>
//             </Form>
//             <Form onSubmit={handleResendEmailOtp}>
//               <Button variant="link" type="submit" disabled={resendDisabled || resendLoading}>
//                 {resendLoading
//                   ? "Resending..."
//                   : `Resend OTP ${resendDisabled ? `(${countdown}s)` : ""}`}
//               </Button>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default VerifyEmailOtp;


// // VerifyEmailOtp.js
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyEmailOtp, resendEmailOtp } from "../../actions/emailOtpActions";
// import { useHistory } from "react-router-dom";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Loader from "../../components/Loader";
// import Message from "../../components/Message";

// const VerifyEmailOtp = () => {
//   const [otp, setOtp] = useState("");
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const emailOtpVerify = useSelector((state) => state.emailOtpVerify);
//   const { loading, success, error } = emailOtpVerify;

//   const userRegisterData = useSelector((state) => state.userRegister.registrationData);

//   useEffect(() => {
//     let timer;
//     if (countdown > 0 && resendDisabled) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else {
//       setResendDisabled(false);
//       setCountdown(15);
//     }

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [countdown, resendDisabled]);

//   const handleVerifyEmailOtp = () => {
//     dispatch(verifyEmailOtp(otp));
//   };

//   const handleResendEmailOtp = () => {
//     dispatch(resendEmailOtp(userRegisterData.email, userRegisterData.firstName));
//     setResendDisabled(true);
//   };

//   useEffect(() => { 
//     if (success && !loading && !error) {
//       history.push("/login");
//     }
//   }, [success, history, error, loading]);

//   return (
//     <Container>
//       <Row className="justify-content-center text-center mt-5">
//         <Col lg={6}>
//           <div className="border rounded p-4">
//             <h1>Verify Email OTP</h1>
//             <Form>
//               {loading && <Loader />}
//               {error && <Message variant="danger">{error}</Message>}
//               {success && (
//                 <Message variant="success">
//                   Email OTP verified successfully! You can now log in.
//                 </Message>
//               )}
//               <Form.Group controlId="otp">
//                 <Form.Control
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="Enter OTP"
//                 />
//               </Form.Group>
//               <div className="py-3">
//                 <Button
//                   onClick={handleVerifyEmailOtp}
//                   disabled={loading || success}
//                   variant="primary"
//                   type="submit"
//                 >
//                   Verify OTP
//                 </Button>
//               </div>
//             </Form>
//             <Form onSubmit={handleResendEmailOtp} action="#">
//               <Button variant="link" type="submit" disabled={resendDisabled}>
//                 Resend OTP {resendDisabled && `(${countdown}s)`}
//               </Button>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default VerifyEmailOtp;
