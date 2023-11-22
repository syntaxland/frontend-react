// MarketplaceDashboard.js
import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { Link} from "react-router-dom";
// import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "./Dashboard"; 
// import { login } from "../../actions/userActions";
// import UserProfile from "./UserProfile";
// import Orders from "./Orders";
// import Payments from "./Payments";
// import Favorites from "./SavedItems"; 
// import OrderShipment from "./OrderShipment";
// import OrderItem from "./OrderItem";
// import Reviews from "./Reviews";
// import MessageInbox from "./MessageInbox";
// import CreditPoint from "./CreditPoint";
// import PromoProduct from "./Offers";
// import RecommendedProducts from "./RecommendedProducts";
// import ViewedItems from "./ViewedItems";
// import LiveChat from "./LiveChat";
// import Referrals from "./Referrals";
// import SupportTicket from "./SupportTicket";
// import Feedback from "./Feedback";
// import Settings from "./Settings";

function MarketplaceDashboard({ history }) {
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

  // const handleAdminDashboard = () => {
  //   history.push("/admin-dashboard");
  // };

  const renderTabContent = () => {
    switch (activeTab) {
      // case "profile":
      //   return <UserProfile />;

      // case "orders":
      //   return <Orders />;

      // case "payments":
      //   return <Payments />;

      // case "favorites":
      //   return <Favorites />;

      // case "order-shipment":
      //   return <OrderShipment />;

      // case "order-items":
      //   return <OrderItem />;

      // case "reviews":
      //   return <Reviews />;

      // case "message-inbox":
      //   return <MessageInbox />;

      // case "credit-point":
      //   return <CreditPoint />;

      // case "recommended-products":
      //   return <RecommendedProducts />;

      // case "offers":
      //   return <PromoProduct />;

      // case "viewed-products":
      //   return <ViewedItems />;

      // case "referrals":
      //   return <Referrals />;
        
      // case "live-chat":
      //   return <LiveChat />;

      // case "support-ticket":
      //   return <SupportTicket />;

      // case "feedback":
      //   return <Feedback />;

      // case "settings":
      //   return <Settings />;

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
                    activeTab === "user-dashboard" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  // activeClassName="active-link"
                  onClick={() => handleTabChange("user-dashboard")}
                >
                  <i className="fa fa-dashboard"></i> Dashboard
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "profile" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("profile")}
                >
                  <i className="fas fa-user"></i> Seller Account
                </Button>
              </div>
              {/* <div>
                <Button
                  variant={activeTab === "orders" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("orders")}
                >
                  <i className="fa fa-cart-arrow-down"></i> Orders
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-items" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-items")}
                >
                  <i className="fa fas fa-cart-plus"></i> Purchased Items
                </Button>
              </div> */}
              <div>
                <Button
                  variant={activeTab === "payments" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("payments")}
                >
                  <i className="fas fa-credit-card"></i> Transactions 
                </Button>
              </div>
              {/* <div>
                <Button
                  variant={
                    activeTab === "order-shipment" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-shipment")}
                >
                  <i className="fas fa-shipping-fast"></i> Shipments
                </Button>
              </div>
              <div>
                <Button
                  variant={activeTab === "reviews" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("reviews")}
                >
                  <i className="fas fa-star"></i> Reviews
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={activeTab === "referrals" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("referrals")}
                >
                  <i className="fa fa-user-plus"></i> Referrals
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "credit-point" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("credit-point")}
                >
                  <i className="fas fa-sack-dollar"></i> Credit Point
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={
                    activeTab === "message-inbox" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("message-inbox")}
                >
                  <i className="fa fa-message"></i> Inbox
                </Button>
              </div> */}

              <div>
                <Button
                  variant={activeTab === "favorites" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("favorites")}
                >
                  <i className="fa fa-heart"></i> Saved Items
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "viewed-products" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("viewed-products")}
                >
                  <i className="fa fa-eye"></i> Viewed Items
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={
                    activeTab === "recommended-products"
                      ? "info"
                      : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("recommended-products")}
                >
                  <i className="fa fa-thumbs-up"></i> Recommended
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "offers" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("offers")}
                >
                  <i className="fa fa-gift"></i> Offers
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "feedback" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("feedback")}
                >
                  <i className="fa fa-comments"></i> Feedback
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "support-ticket" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("support-ticket")}
                >
                  <i className="fa fa-ticket"></i> Support Ticket
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={activeTab === "live-chat" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("live-chat")}
                >
                  <i className="fas fa-comments"></i> Live Chat
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "settings" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("settings")}
                >
                  <i className="fas fa-gear"></i> Settings
                </Button>
              </div> */}

              {/* <div>
                {userInfo.is_superuser ? (
                  <div>
                    <Button
                      variant={
                        activeTab === "admin-dashboard"
                          ? "info"
                          : "outline-info"
                      }
                      className="sidebar-link"
                      onClick={() => handleAdminDashboard()}
                    >
                     <i className="fas fa-user-check"></i> Admin 
                    </Button>
                  </div>
                ) : (
                  <span>Not Admin</span>
                )}
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleAdminDashboard()}
                >
                  <i className="fas fa-user-tag"></i> Admin Dashboard
                </Button>
              </div> */}

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

export default MarketplaceDashboard;