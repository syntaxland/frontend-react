// AdminDashboard.js
import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Orders from "./Orders";
import Payments from "./Payments";
import OrderShipment from "./OrderShipment";
import SendMessage from "./SendMessage";
import SendEmail from "./SendEmail";
import Dashboard from "./Dashboard";
import CreditPointRequests from "./CreditPointRequests";

function AdminDashboard({ history }) {
  const [activeTab, setActiveTab] = useState("admin-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserDashboard = () => {
    history.push("/dashboard");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;

      case "payments":
        return <Payments />;

      case "order-shipment":
        return <OrderShipment />;

      case "send-message":
        return <SendMessage />;

      case "send-email":
        return <SendEmail />;

      case "credit-point-requests":
        return <CreditPointRequests />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={sidebarOpen ? 3 : 1} className="sidebar">
          <Button
            variant="link"
            className="sidebar-toggle-button"
            onClick={handleSidebarToggle}
          >
            {/* <FontAwesomeIcon icon={sidebarOpen ? faBars : faBars} /> */}
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </Button>

          {sidebarOpen && (
            <div className="sidebar-content">
              <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("admin-dashboard")}
                >
                  Admin Dashboard
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "orders" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("orders")}
                >
                  Orders
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "payments" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("payments")}
                >
                  Payments
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-shipment"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("order-shipment")}
                >
                  Shipments
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "send-message" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("send-message")}
                >
                  <i className="fa-solid fa-message"></i> Send Message
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "send-email" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("send-email")}
                >
                  <i className="fa-solid fa-envelope"></i> Send Email
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "credit-point-requests"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("credit-point-requests")}
                >
                  Credit Point
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleUserDashboard()}
                >
                  User Dashboard
                </Button>
              </div>
            </div>
          )}
        </Col>
        <Col xs={sidebarOpen ? 9 : 11} className="main-content">
          {renderTabContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
