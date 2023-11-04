// PaysofterButton.js
import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import CardPayment from "./CardPayment";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import PaysofterAccountFund from "./PaysofterAccountFund";
import PaysofterPromise from "./PaysofterPromise";
import QrPayment from "./QrPayment";

import "./Paysofter.css";

function PaysofterButton({
  showPaymentModal,
  setShowPaymentModal,
  reference,
  userEmail,
  promoTotalPrice,
  publicApiKey,
  paymentDetails,
  handlePaymentDetailsChange,
  // handlePaymentSubmit,
  paymentData,
  paysofterPaymentData,
}) {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  return (
    <div>
      <div className="text-center">
        <Button
          className="text-center rounded py-2"
          variant="primary"
          onClick={() => setShowPaymentModal(true)}
        >
          <span>Pay Now</span>
        </Button>
      </div>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <div className="text-center w-100 py-2">
            <Modal.Title>Mock Payment (Test)</Modal.Title>
            <div>{userEmail}</div>
            <div>
              NGN{" "}
              {promoTotalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {/* Left column with payment options */}
            <Col md={3}>
              <div className="text-center">
                <p>Options</p>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("card")}
                    className={selectedPaymentOption === "card" ? "active" : ""}
                  >
                    <i className="fas fa-credit-card"></i> Card
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("transfer")}
                    className={
                      selectedPaymentOption === "transfer" ? "active" : ""
                    }
                  >
                    <i className="fa fa-exchange"></i> Transfer
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("bank")}
                    className={selectedPaymentOption === "bank" ? "active" : ""}
                  >
                    <i className="fas fa-bank"></i> Bank
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("ussd")}
                    className={selectedPaymentOption === "ussd" ? "active" : ""}
                  >
                    <i className="fa fa-mobile"></i> USSD
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("qr")}
                    className={selectedPaymentOption === "qr" ? "active" : ""}
                  >
                    <i className="fa fa-qrcode"></i> Visa QR
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("account-fund")}
                    className={
                      selectedPaymentOption === "account-fund" ? "active" : ""
                    }
                  >
                    <i className="fas fa-money-bill-alt"></i> Paysofter Account Fund
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentOptionChange("promise")}
                    className={
                      selectedPaymentOption === "promise" ? "active" : ""
                    }
                  >
                    <i className="fas fa-money-bill-wave"></i> Paysofter Promise
                  </Button>
                </div>

              </div>
            </Col>
            {/* Right column with selected payment option component */}
            <Col md={9}>
              {/* Conditionally render the selected payment option component */}
              {selectedPaymentOption === "card" && (
                <CardPayment
                  paymentDetails={paymentDetails}
                  handlePaymentDetailsChange={handlePaymentDetailsChange}
                  promoTotalPrice={promoTotalPrice}
                  paymentData={paymentData}
                  reference={reference}
                  userEmail={userEmail}
                  publicApiKey={publicApiKey}
                  paysofterPaymentData={paysofterPaymentData}
                />
              )}
              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}

              {selectedPaymentOption === "account-fund" && (
                <PaysofterAccountFund
                  promoTotalPrice={promoTotalPrice}
                  paymentData={paymentData}
                  reference={reference}
                  userEmail={userEmail}
                  publicApiKey={publicApiKey}
                />
              )}

              {selectedPaymentOption === "promise" && (
                <PaysofterPromise
                  promoTotalPrice={promoTotalPrice}
                  paymentData={paymentData}
                  reference={reference}
                  userEmail={userEmail}
                  publicApiKey={publicApiKey}
                />
              )}

              
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PaysofterButton;
