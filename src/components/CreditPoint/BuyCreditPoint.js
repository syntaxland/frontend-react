// BuyCreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { buyCreditPoint } from "../../actions/creditPointActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function BuyCreditPoint({ ad_id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  const { success, error, loading } = buyCreditPointState;
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  const creditPointData = {
    amount: amount,
  };
  console.log("creditPointData:", creditPointData);

  const handleBuyCreditPoint = () => {
    dispatch(buyCreditPoint(creditPointData));
  };

  const DURATION_CHOICES = [
    ["500", "500 cps for NGN 500"],
    ["1000", "1,000 cps for NGN 1,000"],
    ["5200", "5,200 cps for NGN 5,000"],
    ["10800", "10,800 cps for NGN 10,000"],
    ["16500", "16,500 cps for NGN 15,000"],
    ["24000", "24,000 cps for NGN 20,000"],
    ["60000", "60,000 cps for NGN 50,000"],
    ["125000", "125,000 cps for NGN 100,000"],
    ["255000", "255,000 cps for NGN 200,000"],
    ["620000", "620,000 cps for NGN 500,000"],
    ["1500000", "1,500,000 cps for NGN 1,000,000"],
  ];

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {loading && <Loader />}
          {success && (
            <Message variant="success">
              You have received {amount} credit points.
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

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
                {DURATION_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            onClick={handleBuyCreditPoint}
            className="rounded mt-2 text-center w-100"
            disabled
            // disabled={amount === ""}
          >
            Buy Credit Point
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default BuyCreditPoint;
