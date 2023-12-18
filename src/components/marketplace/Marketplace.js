// Marketplace.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";
import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";
import SellerSearchCard from "./SellerSearchCard";
import { getSellerUsernameSearch } from "../../actions/marketplaceSellerActions";

function Marketplace({ history }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sellerUsername, setSellerUsername] = useState("");

  const [searchSellerUsernameResult, setSellerUsernameSearchResult] = useState(
    null
  );

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

  const handleSellerUsernameSearch = async () => {
    if (sellerUsername.trim() !== "") {
      const result = dispatch(getSellerUsernameSearch(sellerUsername));
      setSellerUsernameSearchResult(result);
      if (!result) {
        console.log("Seller not found.");
      }
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
                    // onClick={handleAdSearch}
                  >
                    <i className="fas fa-search"></i> Search Ads
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <hr />
          <Row className="py-2 d-flex justify-content-end">
            <Col md={4}>
              <Row className="py-2 d-flex justify-content-betwwen">
                <Col md={10}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search seller by username"
                      value={sellerUsername}
                      onChange={(e) => setSellerUsername(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="rounded"
                    size="sm"
                    onClick={handleSellerUsernameSearch}
                    required
                  >
                    <i className="fas fa-search"></i> Search Seller
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {searchSellerUsernameResult && (
            <Row className="py-2 d-flex justify-content-center">
              <Col md={6}>
                <div>
                  <SellerSearchCard sellerUsername={sellerUsername} />
                </div>
              </Col>
            </Row>
          )}

          <hr />

          <div className="text-center py-2">
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

          <div>
            <AllPaidAdScreen />
          </div>

          <div>
            <AllFreeAdScreen />
          </div>

        </Col>
      </Row>
    </div>
  );
}

export default Marketplace;
