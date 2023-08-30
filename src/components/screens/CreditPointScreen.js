// CreditPointScreen.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { createCreditPointRequest } from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";

const CreditPointScreen = ({ history }) => {
  const dispatch = useDispatch();

  const creditPointRequestCreate = useSelector(
    (state) => state.creditPointRequestCreate
  );
  const { loading, success, error } = creditPointRequestCreate;

  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [creditPointAmount, setCreditPointAmount] = useState(0);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const creditPoints = query.get("creditPoints");
  console.log("creditPoints from state:", creditPoints);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCreditPointRequest({
        account_name: accountName,
        account_number: accountNumber,
        bank_name: bankName,
        credit_point_amount: creditPointAmount,
      })
    );
  };

  useEffect(() => {
    setCreditPointAmount(creditPoints);
  }, [creditPoints]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="py-3 text-center">Credit Point Request</h2>
          {success && (
            <Message variant="success">Request sent successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="accountName">
              <Form.Label>Bank Account Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
                maxLength={30}
              />
            </Form.Group>

            <Form.Group controlId="accountNumber">
              <Form.Label>Bank Account Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                maxLength={10}
              />
            </Form.Group>

            <Form.Group controlId="bankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
                maxLength={30}
              />
            </Form.Group>

            <Form.Group controlId="creditPointAmount">
              <Form.Label>Credit Point Amount</Form.Label>
              <Form.Control
                type="number"
                value={creditPointAmount}
                onChange={(e) => setCreditPointAmount(e.target.value)}
                required
                readOnly
              />
            </Form.Group>
            <div className="py-3 text-center">
              <Button className="w-100" type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreditPointScreen;
