// Dashboard.js
import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { login } from "../../actions/userActions";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Payments from "./Payments";
import Favorites from "./SavedItems";
import OrderShipment from "./OrderShipment";
import OrderItem from "./OrderItem";
import Reviews from "./Reviews";
import UserDashboard from "./UserDashboard";
import MessageInbox from "./MessageInbox";
import CreditPoint from "./CreditPoint";

function Dashboard({ history }) {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  // const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("user-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAdminDashboard = () => {
    history.push("/admin-dashboard");
  };

  // useEffect(() => {
  //   dispatch(login());
  // }, [dispatch]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;

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

      case "message-inbox":
        return <MessageInbox />;

      case "credit-point":
        return <CreditPoint />;

      default:
        return <UserDashboard />;
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
                    activeTab === "user-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("user-dashboard")}
                >
                  <i className="fa fa-dashboard"></i> Dashboard
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "profile" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("profile")}
                >
                  <i className="fas fa-user"></i> Profile
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
                  <i className="fa fa-cart-arrow-down"></i> Orders
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-items" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("order-items")}
                >
                  <i className="fa fa-opencart"></i> Ordered Items
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
                  <i className="fas fa-credit-card"></i> Payments
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
                  <i className="fas fa-shipping-fast"></i> Shipments
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "reviews" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("reviews")}
                >
                  <i className="fas fa-star"></i> Reviews
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "favorites" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("favorites")}
                >
                  <i className="fa fa-heart"></i> Saved Items
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "credit-point" ? "primary" : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("credit-point")}
                >
                  <i className="fas fa-sack-dollar"></i> Credit Point
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "message-inbox"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleTabChange("message-inbox")}
                >
                  <i className="fa fa-message"></i> Inbox
                </Button>
              </div>

              <div>
                <Button disabled className="sidebar-button">
                  <i className="fas fa-eye"></i> Viewed Items
                </Button>
              </div>

              <div>
                <Button disabled className="sidebar-button">
                  <i className="fa fa-gift"></i> Offers
                </Button>
              </div>

              <div>
                <Button disabled className="sidebar-button">
                  <i className="fa fa-thumbs-up"></i> Recommendations
                </Button>
              </div>

              <div>
                <Button disabled className="sidebar-button">
                  <i className="fa fa-user-plus"></i> Referrals
                </Button>
              </div>

              <div>
                <Button disabled className="sidebar-button">
                  <i className="fas fa-gear"></i> Settings
                </Button>
              </div>

              {/* <div>
                {userInfo.is_superuser ? (
                  <div>
                    <Button
                      variant={
                        activeTab === "admin-dashboard"
                          ? "primary"
                          : "outline-primary"
                      }
                      className="sidebar-button"
                      onClick={() => handleAdminDashboard()}
                    >
                      Admin Dashboard
                    </Button>
                  </div>
                ) : (
                  <span>Not Admin</span>
                )}
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-button"
                  onClick={() => handleAdminDashboard()}
                >
                  Admin Dashboard
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

export default Dashboard;
