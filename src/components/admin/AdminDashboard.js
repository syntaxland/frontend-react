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
                      ? "info"
                      : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("admin-dashboard")}
                >
                 <i className="fa fa-dashboard"></i> Admin
                </Button>
              </div> 
              <div>
                <Button
                  variant={
                    activeTab === "orders" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("orders")}
                >
                  <i className="fas fa-luggage-cart"></i> Orders
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "payments" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("payments")}
                >
                  <i className="fas fa-credit-card"></i> Payments
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-shipment"
                      ? "info"
                      : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-shipment")}
                >
                 <i className="fas fa-shipping-fast"></i> Shipments
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "send-message" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("send-message")}
                >
                  <i className="fa-solid fa-message"></i> Send Message
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "send-email" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("send-email")}
                >
                  <i className="fa-solid fa-envelope"></i> Send Email
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "credit-point-requests"
                      ? "info"
                      : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("credit-point-requests")}
                >
                  <i className="fas fa-sack-dollar"></i> Credit Point
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard"
                      ? "info"
                      : "outline-info"
                  }
                  className="sidebar-link"
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
