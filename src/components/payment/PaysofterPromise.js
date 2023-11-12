// PaysofterPromise.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import { clearCart } from "../../actions/cartActions";
// import {
//   createPayment,
//   createPaysofterPayment,
//   debitPaysofterAccountFundPromise,
// } from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import PaysofterAccountFundPromise from "./PaysofterAccountFundPromise"; 

const PaysofterPromise = ({
  history,
  promoTotalPrice,
  paymentData,
  reference,
  userEmail,
  publicApiKey,
}) => {
  const dispatch = useDispatch();

  const debitPaysofterAccountState = useSelector(
    (state) => state.debitPaysofterAccountState
  );
  const { loading, success, error } = debitPaysofterAccountState;

  const [duration, setDuration] = useState("1day");
  const [currency, setCurrency] = useState("NGN");
  const [paymenthMethod, setPaymenthMethod] = useState(
    "paysofter_promise"
  );
  // const createdAt = new Date().toISOString();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPaysofterAccountFundPromise, setShowPaysofterAccountFundPromise] = useState(
    false
  );

  const handleShowPaysofterAccountFundPromise = () => {
    setShowPaysofterAccountFundPromise(true);
  };

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  // const paysofterPaymentData = {
  //   payment_id: reference,
  //   email: userEmail,
  //   amount: promoTotalPrice,
  //   public_api_key: publicApiKey,
  //   created_at: createdAt,
  // };

  // const debitAccountData = {
  //   currency: currency,
  //   amount: promoTotalPrice,
  //   // account_id: accountId,
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    // try {
    //   // dispatch(debitPaysofterAccountFundPromise(debitAccountData));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (success) {
      // dispatch(createPaysofterPayment(paysofterPaymentData));
      // dispatch(createPayment(paymentData));
      // dispatch(clearCart());
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        // window.location.href = "/dashboard";
        // window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
    // console.log("// eslint-disable-next-line");
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  return (
    <Container>
      {showPaysofterAccountFundPromise ? (
        <PaysofterAccountFundPromise
          promoTotalPrice={promoTotalPrice}
          paymentData={paymentData}
          reference={reference}
          userEmail={userEmail}
          publicApiKey={publicApiKey}
          currency={currency}
          duration={duration}
          paymenthMethod={paymenthMethod}
        />
      ) : (
        <Row className="justify-content-center">
          <Col>
            <Row className="text-center py-2">
              <Col md={10}>
                <h2 className="py-2 text-center">Paysofter Promise</h2>
              </Col>
              <Col md={2}>
                <Button
                  variant="outline"
                  onClick={handleInfoModalShow}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Paysofter Promise option escrows or places in custody the received payment until a specified condition has been fulfilled before payment is transferred to the seller."
                >
                  <i className="fa fa-info-circle"> </i>
                </Button>

                <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center w-100 py-2">
                      Paysofter Promise
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-center">
                      Paysofter Promise option escrows or places in custody the
                      payment made to a seller (using the payer's funded
                      Paysofter Account Fund) until a specified condition has
                      been fulfilled.{" "}
                      <a
                        href="https://paysofter.com/promise/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <span>
                          <Button
                            variant="primary"
                            size="sm"
                            className="text-center py-2"
                          >
                            Learn more
                          </Button>
                        </span>
                      </a>
                    </p>
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>

            {success && (
              <Message variant="success">Payment made successfully.</Message>
            )}

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  as="select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="currency">
              <Form.Label>Seller Paysofter Account ID</Form.Label>
              <Form.Control
                // as="select"
                // value={currency}
                // onChange={(e) => setCurrency(e.target.value)}
                placeholder="123456789012"
                disabled
              ></Form.Control>
            </Form.Group> */}

              {/* <Form.Group controlId="seller_name">
              <Form.Label>Seller Name</Form.Label>
              <Form.Control
                // as="select"
                // value={seller_name}
                // onChange={(e) => setCurrency(e.target.value)}
                placeholder="Seller name"
                disabled
              ></Form.Control>
            </Form.Group> */}

              <Form.Group controlId="paymenthMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  disabled
                  as="select"
                  value={paymenthMethod}
                  onChange={(e) => setPaymenthMethod(e.target.value)}
                >
                  <option value="paysofter_promise">Paysofter Promise</option>
                  <option value="paysofter_account_fund">
                    Paysofter Account Fund
                  </option>
                  <option value="debit_card">Debit Card</option>
                  <option value="bank">Bank</option>
                  <option value="transfer">Transfer</option>
                  <option value="qrcode">QR COde</option>
                  <option value="USSD">USSD</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="duration">
                <Form.Label>Settlement Duration</Form.Label>
                <Form.Control
                  as="select"
                  readOnly
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="1day">Within 1 day</option>
                  <option value="2days">Less than 2 days</option>
                  <option value="3days">Less than 3 days</option>
                  <option value="1week">Less than 1 week</option>
                  <option value="2week">Less than 2 weeks</option>
                  <option value="1month">Less than 1 month</option>
                </Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="accountId">
              <Form.Label>Payer Paysofter Account ID</Form.Label>

              <Row className="text-center py-2">
                <Col md={10}>
                  <Form.Control
                    type="number"
                    placeholder="Enter Paysofter Account ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    required
                    maxLength={11}
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleAccountInfoModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="A unqiuely assigned 12-digit Paysofter Account ID. Don't have a Paysofter account? Click here."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal
                    show={showAccountInfoModal}
                    onHide={handleAccountInfoModalClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Paysofter Account ID
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        A unqiuely assigned 12-digit Paysofter Account ID. Don't
                        have a Paysofter account? You're just about 3 minutes
                        away!{" "}
                        <a
                          href="https://paysofter.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          <span>
                            <Button
                              variant="primary"
                              size="sm"
                              className="text-center py-2"
                            >
                              Create A Free Account
                            </Button>
                          </span>
                        </a>
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group> */}

              <div className="py-3 text-center">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="primary"
                  onClick={handleShowPaysofterAccountFundPromise}
                >
                  Submit{" "}
                  {/* <span>
                  (NGN{" "}
                  {promoTotalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  )
                </span> */}
                </Button>
              </div>
            </Form>
            {/* {showPaysofterAccountFundPromise && (
            <PaysofterAccountFundPromise
              duration={duration}
              currency={currency}
              paymenthMethod={paymenthMethod}
            />
          )} */}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PaysofterPromise;