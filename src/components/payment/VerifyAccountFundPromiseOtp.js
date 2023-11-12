// VerifyAccountFundPromiseOtp.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../../actions/cartActions";
import {
  // createPayment,
  // createPaysofterPayment,
  debitPaysofterAccountFund,
  verifyOtp,
  // sendPromiseAlert,
  createPaysofterPromise,
} from "../../actions/paymentActions";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import ConfirmPaysofterPromise from "./ConfirmPaysofterPromise";

const VerifyAccountFundPromiseOtp = ({
  promoTotalPrice,
  paymentData,
  reference,
  buyerEmail,
  currency,
  publicApiKey,
  formattedPayerEmail,
}) => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const createdAt = new Date().toISOString();
  const [
    showConfirmPaysofterPromise,
    setShowConfirmPaysofterPromise,
  ] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const otpVerifyState = useSelector((state) => state.otpVerifyState);
  const { loading, success, error } = otpVerifyState;

  // const createPaysofterPromiseState = useSelector((state) => state.createPaysofterPromiseState);
  // const { loading: promiseLoading, success: promiseSuccess, error: promiseError } = createPaysofterPromiseState;

  console.log("formattedPayerEmail:", formattedPayerEmail);

  const sendOtpData =
    JSON.parse(localStorage.getItem("debitAccountData")) || [];
  console.log("sendOtpData:", sendOtpData, sendOtpData.account_id);

  // const paysofterPaymentData = {
  //   payment_id: reference,
  //   email: buyerEmail,
  //   amount: promoTotalPrice,
  //   public_api_key: publicApiKey,
  //   created_at: createdAt,
  // };

  const otpData = {
    otp: otp,
    account_id: sendOtpData.account_id,
    amount: promoTotalPrice,
    currency: currency,
  };

  const debitAccountData = {
    account_id: sendOtpData.account_id,
    security_code: sendOtpData.security_code,
    amount: promoTotalPrice,
  };

  const paysofterPromiseData = {
    payment_id: reference,
    email: buyerEmail,
    amount: promoTotalPrice,
    public_api_key: publicApiKey,
    account_id: sendOtpData.account_id,
    created_at: createdAt,
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyOtp(otpData));
  };

  const handleResendEmailOtp = () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      dispatch(debitPaysofterAccountFund(JSON.stringify(debitAccountData)));
      setResendMessage(`OTP resent to ${formattedPayerEmail} successfully.`);
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }
    setResendLoading(false);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    } else if (!resendDisabled) {
      setCountdown(60);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  useEffect(() => {
    if (success) {
      localStorage.removeItem("debitAccountData");
      dispatch(createPaysofterPromise(paysofterPromiseData));
      setShowConfirmPaysofterPromise(true);

      // dispatch(clearCart());
      // dispatch(sendPromiseAlert(promiseAlertData));
      setShowSuccessMessage(true);
      setTimeout(() => {
        // history.push("/login");
      }, 5000);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  return (
    <Container>
      {showConfirmPaysofterPromise ? (
        <ConfirmPaysofterPromise
          promoTotalPrice={promoTotalPrice}
          paymentData={paymentData}
          reference={reference}
          currency={currency}
          buyerEmail={buyerEmail}
          publicApiKey={publicApiKey}
          // securityCode={securityCode}
          // accountId={accountId}
          // formattedPayerEmail={formattedPayerEmail}
          // duration={duration}
          // paymenthMethod={paymenthMethod}
        />
      ) : (
        <Row className="justify-content-center text-center mt-5">
          <Col>
            <div className="border rounded p-4">
              <h1>Verify OTP</h1>
              {showSuccessMessage && (
                <Message variant="success">Promise sent successfully!</Message>
              )}
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}
              {resendMessage && (
                <Message variant={resendLoading ? "info" : "success"}>
                  {resendMessage}
                </Message>
              )}
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
              <p>
                OTP has been sent to your email {formattedPayerEmail} for Paysofter
                Account ID: {sendOtpData.account_id} and expires in 10 minutes.
                It might take a few seconds to deliver.
              </p>
              <Button
                variant="link"
                type="submit"
                disabled={resendDisabled || resendLoading}
                onClick={handleResendEmailOtp}
              >
                {resendLoading
                  ? "Resending OTP..."
                  : resendDisabled
                  ? `Resend OTP (${countdown}sec)`
                  : "Resend OTP"}
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default VerifyAccountFundPromiseOtp;
