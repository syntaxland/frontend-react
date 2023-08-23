// Dashboard.js
import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Payments from "./Payments";
import Favorites from "./SavedItems";
import OrderShipment from "./OrderShipment";
import OrderItem from "./OrderItem";
import Reviews from "./Reviews";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "payments":
        return <Payments />;
      case "favorites":
        return <Favorites />;
      case "order-shipment":
        return <OrderShipment />;
      case "order-items":
        return <OrderItem />;

      case "reviews":
        return <Reviews />;

      case "user-dashboard":
        return <UserDashboard />;

      case "admin-dashboard":
        return <AdminDashboard />;

      default:
        return <UserProfile />;
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
              <Button
                variant={
                  activeTab === "profile" ? "primary" : "outline-primary"
                }
                className="sidebar-button"
                onClick={() => handleTabChange("profile")}
              >
                Profile
              </Button>

              <Button
                variant={activeTab === "orders" ? "primary" : "outline-primary"}
                className="sidebar-button"
                onClick={() => handleTabChange("orders")}
              >
                Orders
              </Button>

              <Button
                variant={
                  activeTab === "order-items" ? "primary" : "outline-primary"
                }
                className="sidebar-button"
                onClick={() => handleTabChange("order-items")}
              >
                Order Items
              </Button>

              <Button
                variant={
                  activeTab === "payments" ? "primary" : "outline-primary"
                }
                className="sidebar-button"
                onClick={() => handleTabChange("payments")}
              >
                Payments
              </Button>

              <Button
                variant={
                  activeTab === "order-shipment" ? "primary" : "outline-primary"
                }
                className="sidebar-button"
                onClick={() => handleTabChange("order-shipment")}
              >
                Shipments
              </Button>

              <Button
                variant={
                  activeTab === "reviews" ? "primary" : "outline-primary"
                }
                className="sidebar-button"
                onClick={() => handleTabChange("reviews")}
              >
                Reviews
              </Button>

              <Button
                variant={
                  activeTab === "favorites" ? "primary" : "outline-primary"
                }
                className="sidebar-button"
                onClick={() => handleTabChange("favorites")}
              >
                Saved Items
              </Button>

              <Button
              disabled
                variant={
                  activeTab === "user-dashboard" ? "primary" : "outline-primary"
                }
                className="sidebar-button"
                onClick={() => handleTabChange("user-dashboard")}
              >
                User Dashboard
              </Button>

              <Button
              disabled
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

              <Button className="sidebar-button">Viewed Items</Button>
              <Button className="sidebar-button">Credit Points</Button>


              <Button className="sidebar-button">Hot Deals & Offers</Button>
              <Button className="sidebar-button">Recommendations</Button>
              <Button className="sidebar-button">Inbox</Button>
              <Button className="sidebar-button">Settings</Button>
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

export default Dashboard;
