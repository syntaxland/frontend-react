// BuyUsdCreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getPaymentApiKeys } from "../../actions/paymentActions";
import PaymentScreen from "./payment/PaymentScreen";

function BuyUsdCreditPoint() {
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

  const USD_CPS_CHOICES = [
    ["1", "1,000 cps for USD 1"],
    ["5", "5,200 cps for USD 5"],
    ["10", "10,800 cps for USD 10"],
    ["15", "16,500 cps for USD 15"],
    ["20", "24,000 cps for USD 20"],
    ["50", "60,000 cps for USD 50"],
    ["100", "125,000 cps for USD 100"],
    ["200", "255,000 cps for USD 200"],
    ["500", "700,000 cps for USD 500"],
    ["1000", "1,500,000 cps for USD 1,000"],
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
                  {USD_CPS_CHOICES.map((type) => (
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
              Buy Credit Point (USD)
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BuyUsdCreditPoint;
