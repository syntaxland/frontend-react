// ConfirmPaysofterPromise.js
import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { clearCart } from "../../actions/cartActions";

const ConfirmPaysofterPromise = () => {
  const dispatch = useDispatch();

  const handleConfirmPromise = () => {
    dispatch(clearCart());
    window.location.href = "https://paysofter.com/promise/buyer";
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Row className="text-center py-2">
            <Col>
              <h2 className="py-2 text-center">Confirm Paysofter Promise</h2>
            </Col>
          </Row>

          <div className="py-2 text-center">
            <h5 className="py-2 mb-2">Promise successfully created! </h5>
            <p>
              Is Promise fulfilled? Login to your Paysofter account to check out
              the Promise status before confirming as this action is
              irreversible.
            </p>{" "}
            <span>
              <Button
                className="w-100 rounded"
                type="button"
                variant="primary"
                onClick={handleConfirmPromise}
              >
                Confirm Promise (at Paysofter)
              </Button>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmPaysofterPromise;
