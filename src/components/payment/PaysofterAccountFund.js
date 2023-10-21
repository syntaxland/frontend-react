// PaysofterAccountFund.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { clearCart } from "../../actions/cartActions";
import {
  createPayment,
  createPaysofterPayment,
  debitPaysofterAccountFund,
} from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";

const PaysofterAccountFund = ({
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

  const [accountId, setAccountId] = useState("");
  const [currency, setCurrency] = useState("");

  const createdAt = new Date().toISOString();

  const paysofterPaymentData = {
    payment_id: reference,
    email: userEmail,
    amount: promoTotalPrice,
    public_api_key: publicApiKey,
    created_at: createdAt,
  };

  const debitAccountData = {
    currency: currency,
    amount: promoTotalPrice,
    account_id: accountId,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(debitPaysofterAccountFund(debitAccountData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(createPaysofterPayment(paysofterPaymentData));
      dispatch(createPayment(paymentData));
      dispatch(clearCart());
      const timer = setTimeout(() => {
        history.push("/dashboard");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
    // console.log("// eslint-disable-next-line");
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          {/* <h2 className="py-3 text-center">Debit Account</h2> */}

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
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="accountId">
              <Form.Label>Account ID</Form.Label>

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
                    data-toggle="popover"
                    data-trigger="click"
                    data-placement="top"
                    data-content="Don't have a Paysofter account? Click here."
                    title="A unqiuely assigned Paysofter Account ID. Don't have a Paysofter account? Click here."
                  >
                    <a
                      href="https://paysofter.com/register/" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-info-circle"> </i>
                    </a>
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            <div className="py-3 text-center">
              <Button className="w-100 rounded" type="submit" variant="primary">
                Pay{" "}
                <span>
                  (NGN{" "}
                  {promoTotalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  )
                </span>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaysofterAccountFund;
