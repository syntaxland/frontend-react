// Marketplace.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";
// import { searchSellerByUsername } from "../../api/seller";

import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";

function Marketplace({ history }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const handlePostFreeAd = () => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && !profile.is_marketplace_seller) {
      history.push("/create-marketplace-seller");
    } else {
      history.push("/ad/free");
    }
  };

  const handleSearch = async () => {
    try {
      const result = "";
      // const result = await searchSellerByUsername(searchTerm);

      if (result.data) {
        const sellerUsername = result.data.username;
        history.push(`/seller-shop-front/${sellerUsername}/`);
      } else {
        // Handle case when seller is not found
        console.log("Seller not found");
      }
    } catch (error) {
      console.error("Error searching for seller:", error);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-shopping-cart"></i> Marketplace
          </h1>
          <hr />

          <Row className="py-2 d-flex justify-content-center">
            <Col md={6}>
              <Row className="py-2 d-flex justify-content-betwwen">
                <Col md={9}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search ads"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="rounded"
                    size="sm"
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search"></i>{" "}
                    Search Ads
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <div>
            <AllPaidAdScreen />
          </div>

          <div>
            <AllFreeAdScreen />
          </div>

          <div className="text-center">
            <span>
              Post your goods and services and start making more sales.
            </span>
            <Button
              variant="primary"
              className="rounded"
              size="sm"
              onClick={handlePostFreeAd}
            >
              Post Free Ads <i className="fas fa-plus-square"></i>
            </Button>
          </div>

          <hr />
          <Row className="py-2 d-flex justify-content-end">
            <Col md={4}>
              <Row className="py-2 d-flex justify-content-betwwen">
                <Col md={10}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search seller by username"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="rounded"
                    size="sm"
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search"></i>{" "}
                    Search Seller
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default Marketplace;
