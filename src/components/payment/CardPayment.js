// CardPayment.js
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/cartActions";
import {
  createPayment,
  createPaysofterPayment,
} from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";

const MONTH_CHOICES = [
  ["January", "01"],
  ["February", "02"],
  ["March", "03"],
  ["April", "04"],
  ["May", "05"],
  ["June", "06"],
  ["July", "07"],
  ["August", "08"],
  ["September", "09"],
  ["October", "10"],
  ["November", "11"],
  ["December", "12"],
];

const YEAR_CHOICES = [
  ["2024", "24"],
  ["2025", "25"],
  ["2026", "26"],
  ["2027", "27"],
  ["2028", "28"],
  ["2029", "29"],
  ["2030", "30"],
  ["2031", "31"],
  ["2032", "32"],
  ["2033", "33"],
  ["2034", "34"],
  ["2035", "35"],
  ["2036", "36"],
  ["2037", "37"],
  ["2038", "38"],
  ["2039", "39"],
  ["2040", "40"],
  ["2041", "41"],
  ["2042", "42"],
  ["2043", "43"],
  ["2044", "44"],
  ["2045", "45"],
  ["2046", "46"],
  ["2047", "47"],
  ["2048", "48"],
  ["2049", "49"],
  ["2050", "50"],
];

function CardPayment({
  promoTotalPrice,
  paymentData,
  reference,
  userEmail,
  publicApiKey,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const { loading, success, error } = paysofterPayment;

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonth: null,
    expirationYear: null,
    cvv: "",
  });

  const handlePaymentDetailsChange = (name, value) => {
    let detectedCardType = "";
    if (name === "cardNumber") {
      if (/^4/.test(value)) {
        detectedCardType = "Visa";
      } else if (/^5[1-5]/.test(value)) {
        detectedCardType = "Mastercard";
      }
      setCardType(detectedCardType);
    }
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      paymentDetails.expirationMonth &&
      paymentDetails.expirationYear &&
      paymentDetails.cardNumber &&
      paymentDetails.cvv
    );
  };

  const createdAt = new Date().toISOString();
  const currency = "NGN";

  const submitHandler = (e) => {
    e.preventDefault();

    const paysofterPaymentData = {
      payment_id: reference,
      email: userEmail,
      amount: promoTotalPrice,
      public_api_key: publicApiKey,
      created_at: createdAt,
      currency: currency,
      card_number: paymentDetails.cardNumber,
      expiration_month: paymentDetails.expirationMonth,
      expiration_year: paymentDetails.expirationYear,
      // expiration_month_year: `${paymentDetails.expirationMonth}/${paymentDetails.expirationYear}`,
      cvv: paymentDetails.cvv,
    };

    dispatch(createPaysofterPayment(paysofterPaymentData));
  };

  useEffect(() => {
    if (success) {
      dispatch(createPayment(paymentData));
      dispatch(clearCart());
      const timer = setTimeout(() => {
        window.location.reload();
        window.location.href = "/dashboard/users";
      }, 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  return (
    <div>
      <h2 className="py-2 text-center">Debit Card</h2>
      {success && (
        <Message variant="success">Payment made successfully.</Message>
      )}

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              handlePaymentDetailsChange(e.target.name, e.target.value)
            }
            required
            placeholder="1234 5678 9012 3456"
            maxLength="16"
          />
        </Form.Group>
        {cardType && (
          <p>
            Detected Card Type: {cardType}
            {cardType === "Visa " && <i className="fab fa-cc-visa"></i>}
            {cardType === "Mastercard " && (
              <i className="fab fa-cc-mastercard"></i>
            )}
          </p>
        )}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Expiration Month</Form.Label>
              <Select
                options={MONTH_CHOICES?.map(([value, label]) => ({
                  value,
                  label,
                }))}
                onChange={(selectedOption) =>
                  handlePaymentDetailsChange(
                    "expirationMonth",
                    selectedOption.value
                  )
                }
                value={{
                  value: paymentDetails.expirationMonth,
                  label: paymentDetails.expirationMonth,
                }}
                placeholder="Select Month"
              />
            </Form.Group>
          </Col>
          <Col>
            {/* <span> / </span> */}
            <Form.Group>
              <Form.Label>Expiration Year</Form.Label>
              <Select
                options={YEAR_CHOICES?.map(([value, label]) => ({
                  value,
                  label,
                }))}
                value={{
                  value: paymentDetails.expirationYear,
                  label: paymentDetails.expirationYear,
                }}
                onChange={(selectedOption) =>
                  handlePaymentDetailsChange(
                    "expirationYear",
                    selectedOption.value
                  )
                }
                placeholder="Select Year"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="password" 
            name="cvv"
            value={paymentDetails.cvv}
            onChange={(e) =>
              handlePaymentDetailsChange(e.target.name, e.target.value)
            }
            required
            maxLength="3"
            placeholder="123"
          />
        </Form.Group>
        <div className="text-center w-100 py-2">
          <Button variant="primary" type="submit" disabled={!isFormValid()}>
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
        <div className="py-2 d-flex justify-content-center">
          <Form.Text className="text-danger">{error}</Form.Text>
        </div>
      </Form>
    </div>
  );
}

export default CardPayment;
