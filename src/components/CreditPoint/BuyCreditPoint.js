// BuyCreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getPaymentApiKeys } from "../../actions/paymentActions";
import PaymentScreen from "./payment/PaymentScreen";

function BuyCreditPoint() {
  const dispatch = useDispatch();

  const getPaymentApiKeysState = useSelector(
    (state) => state.getPaymentApiKeysState
  );
  const { paystackPublicKey, paysofterPublicKey } = getPaymentApiKeysState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userEmail = userInfo.email;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    } else {
      dispatch(getPaymentApiKeys());
    }
  }, [userInfo, dispatch]);

  const [amount, setAmount] = useState("");
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const handleShowPaymentScreen = () => {
    setShowPaymentScreen(true);
  };

  const BUY_CPS_CHOICES = [
    ["500", "500 cps for NGN 500"],
    ["1000", "1,000 cps for NGN 1,000"],
    ["5000", "5,200 cps for NGN 5,000"],
    ["10000", "10,800 cps for NGN 10,000"],
    ["15000", "16,500 cps for NGN 15,000"],
    ["20000", "24,000 cps for NGN 20,000"],
    ["60000", "60,000 cps for NGN 50,000"],
    ["100000", "125,000 cps for NGN 100,000"],
    ["250000", "255,000 cps for NGN 200,000"],
    ["600000", "620,000 cps for NGN 500,000"],
    ["1000000", "1,500,000 cps for NGN 1,000,000"],
  ];

  return (
    <Container>
      {showPaymentScreen ? (
        <PaymentScreen
          amount={amount}
          paysofterPublicKey={paysofterPublicKey}
          paystackPublicKey={paystackPublicKey}
          userEmail={userEmail}
        />
      ) : (
        <Row className="justify-content-center py-2">
          <Col>
            <Form>
              <Form.Group>
                {/* <Form.Label>Amount</Form.Label> */}
                <Form.Control
                  as="select"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="rounded py-2 mb-2"
                  required
                >
                  <option value="">Select CPS Amount</option>
                  {BUY_CPS_CHOICES.map((type) => (
                    <option key={type[0]} value={type[0]}>
                      {type[1]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>

            <Button
              variant="primary"
              onClick={handleShowPaymentScreen}
              className="rounded mt-2 text-center w-100"
              disabled={amount === ""}
            >
              Buy Credit Point
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BuyCreditPoint;
