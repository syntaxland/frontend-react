// VerifyEmailOtp.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyEmailOtp,
  sendEmailOtp,
  // resendEmailOtp,
} from "../../actions/emailOtpActions";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { register } from "../../actions/userActions";
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

  // const userRegisterData = useSelector(
  //   (state) => state.userRegister.registrationData
  // );

  const userRegisterData =
    JSON.parse(localStorage.getItem("registrationData")) || [];
  console.log("userRegisterData:", userRegisterData);

  // const userRegister = useSelector((state) => state.userRegister);
  // const { registerData } = userRegister;
  // console.log("registerData:", registerData);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (success) {
      // dispatch(register(userRegisterData));
      localStorage.removeItem("registrationData");
      setShowSuccessMessage(true);
      setTimeout(() => {
        history.push("/login");
      }, 5000); 
    }
  }, [success, history]);

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

  const handleResendEmailOtp = () => {
    setResendLoading(true);
    setResendMessage("");

    try {
     dispatch(
        sendEmailOtp(userRegisterData.email, userRegisterData.first_name)
      );
      setResendMessage(`OTP resent to ${userRegisterData.email} successfully.`);
      // setResendMessage("OTP Resent successfully!");
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again."); 
    }

    setResendLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center text-center mt-5">
        {showSuccessMessage && (
          <Message variant="success">
            Email verified successfully! You can now log in.
          </Message>
        )}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {resendMessage && (
          <Message variant={resendLoading ? "info" : "success"}>
            {resendMessage}
          </Message>
        )}
        <Col lg={6}>
          <div className="border rounded p-4">
            <h1>Verify Email OTP</h1>
            <Form>
              <Form.Group controlId="otp">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </Form.Group>
              <div className="py-3">
                <Button
                  onClick={handleVerifyEmailOtp}
                  disabled={loading || success}
                  variant="success"
                  type="submit"
                  className="rounded"
                >
                  Verify OTP
                </Button>
              </div>
            </Form>
            <Form onSubmit={handleResendEmailOtp}>
              <Button
                variant="link"
                type="submit"
                disabled={resendDisabled || resendLoading}
              >
                {resendLoading
                  ? "Resending OTP..."
                  : resendDisabled
                  ? `Resend OTP (${countdown}sec)`
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
