// ConfirmPaysofterPromise.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  createPayment,
  createPaysofterPayment,
  // createPaysofterPromise,

  // sellerConfirmPromise,
  // buyerConfirmPromise,
} from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
// import PaysofterAccountFund from "./PaysofterAccountFund";

// const PAYSOFTER_URL = "http://localhost:3001";
// const PAYSOFTER_URL = "https://api.paysofter.com";

const ConfirmPaysofterPromise = ({
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

  // const buyerConfirmPromiseState = useSelector(
  //   (state) => state.buyerConfirmPromiseState
  // );
  // const { loading, success, error } = buyerConfirmPromiseState;

  // const [duration, setDuration] = useState("1day");
  // const [currency, setCurrency] = useState("NGN");
  // const [paymenthMethod, setPaymenthMethod] = useState(
  //   "paysofter_account_fund"
  // );
  const createdAt = new Date().toISOString();
  // const [showInfoModal, setShowInfoModal] = useState(false);
  // const [showPaysofterAccountFund, setShowPaysofterAccountFund] = useState(
  //   false
  // );

  // const handleShowPaysofterAccountFund = () => {
  //   setShowPaysofterAccountFund(true);
  // };

  // const handleInfoModalShow = () => {
  //   setShowInfoModal(true);
  // };

  // const handleInfoModalClose = () => {
  //   setShowInfoModal(false);
  // };

  // const handleBuyerConfirmPromise = () => {
  //   history.push(`${PAYSOFTER_URL}/buyer-confirm-promise/`);
  // };

  const paysofterPaymentData = {
    payment_id: reference,
    email: userEmail,
    amount: promoTotalPrice,
    public_api_key: publicApiKey,
    created_at: createdAt,
  };

  // const paysofterPromiseData = {
  //   payment_id: reference,
  //   email: userEmail,
  //   amount: promoTotalPrice,
  //   public_api_key: publicApiKey,
  //   created_at: createdAt,
  // };

  // const confirmPromiseData = {
  //   currency: currency,
  //   amount: promoTotalPrice,
  //   // account_id: accountId,
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // try {
  //   // dispatch(buyerConfirmPromise(confirmPromiseData));
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  useEffect(() => {
    if (success) {
      dispatch(createPaysofterPayment(paysofterPaymentData));
      // dispatch(createPaysofterPromise(paysofterPromiseData));
      dispatch(createPayment(paymentData));

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
      {/* {showPaysofterAccountFund ? (
        <PaysofterAccountFund
          promoTotalPrice={promoTotalPrice}
          paymentData={paymentData}
          reference={reference}
          userEmail={userEmail}
          publicApiKey={publicApiKey}
          // currency={currency}
          // duration={duration}
          // paymenthMethod={paymenthMethod}
        />
      ) : ( */}
      <Row className="justify-content-center">
        <Col>
          <Row className="text-center py-2">
            <Col>
              <h2 className="py-2 text-center">Confirm Paysofter Promise</h2>
            </Col>
            {/* <Col md={2}>
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
              </Col> */}
          </Row>

          {success && (
            <Message variant="success">Promise processed successfully.</Message>
          )}

          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          {/* <Form onSubmit={submitHandler}>
              <Form.Group controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  as="select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </Form.Control>
              </Form.Group>

       

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
            </Form>

             */}

          <div className="py-2 text-center">
            <p>
              Is Promise fulfilled? Login to your Paysofter account to check out
              the Promise status before confirming as this action is
              irreversible
            </p>{" "}
            <a
              // href="${PAYSOFTER_URL}/buyer-confirm-promise/"
              // href="http://localhost:3001/buyer-confirm-promise/"
              href="https://paysofter.com/buyer-confirm-promise/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <span>
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="primary"
                  // onClick={handleBuyerConfirmPromise}
                >
                  Confirm Promise (at Paysofter){" "}
                 
                </Button>
              </span>
            </a>
          </div>
          {/* {showPaysofterAccountFund && (
            <PaysofterAccountFund
              duration={duration}
              currency={currency}
              paymenthMethod={paymenthMethod}
            />
          )} */}
        </Col>
      </Row>
      {/* )} */}
    </Container>
  );
};

export default ConfirmPaysofterPromise;
