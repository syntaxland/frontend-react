// Marketplace.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";
import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";
import SearchFreeAdCard from "./SearchFreeAdCard";
import SearchPaidAdCard from "./SearchPaidAdCard";
import SellerSearchCard from "./SellerSearchCard";
import {
  getSellerUsernameSearch,
  searchAds,
} from "../../actions/marketplaceSellerActions";

import Message from "../Message";
import LoaderButton from "../LoaderButton";

function Marketplace() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const [sellerUsername, setSellerUsername] = useState("");

  const [searchSellerUsername, setSearchSellerUsername] = useState(null);
  const [searchAdResult, setSearchAdResult] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const searchAdsState = useSelector((state) => state.searchAdsState);
  const {
    loading: searchAdLoading,
    error: searchAdError,
    freeAds,
    paidAds,
  } = searchAdsState;
  console.log("freeAds", freeAds);
  console.log("paidAds", paidAds);

  const getSellerUsernameSearchState = useSelector(
    (state) => state.getSellerUsernameSearchState
  );
  const {
    loading: sellerUsernameSearchLoading,
    error: sellerUsernameSearchError,
    serachResults,
    sellerAvatarUrl,
  } = getSellerUsernameSearchState;
  console.log("serachResults", serachResults);

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

  const handleSearchAds = () => {
    if (searchTerm.trim() !== "") {
      // const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const result = dispatch(searchAds(searchTerm.trim()));
      setSearchAdResult(result);
      if (!result) {
        console.log("Ad not found.");
      }
    }
  };

  const handleSellerUsernameSearch = () => {
    if (sellerUsername.trim() !== "") {
      const lowerCaseUsername = sellerUsername.toLowerCase().trim();
      const result = dispatch(getSellerUsernameSearch(lowerCaseUsername));
      setSearchSellerUsername(result);
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

          <div className="py-2 d-flex justify-content-center text-center">
            {searchAdError && (
              <Message fixed variant="danger">
                {searchAdError}
              </Message>
            )}

            {sellerUsernameSearchError && (
              <Message fixed variant="danger">
                {sellerUsernameSearchError}
              </Message>
            )}
          </div>

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
                    onClick={handleSearchAds}
                  >
                    <div className="d-flex justify-content-center">
                      <span className="py-1">
                        <i className="fas fa-search"></i> Search
                        {/* Ads */}
                      </span>
                      {searchAdLoading && <LoaderButton />}
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {searchAdResult && (
            <Row className="py-2 d-flex justify-content-center">
              <Col md={6}>
                <div>
                  {freeAds || paidAds ? (
                    <>
                      {freeAds?.map((freeAds) => (
                        <Col
                          key={freeAds.id}
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                        >
                          {freeAds && <SearchFreeAdCard freeAds={freeAds} />}
                        </Col>
                      ))}

                      {paidAds?.map((paidAds) => (
                        <Col
                          key={paidAds.id}
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={4}
                        >
                          {paidAds && <SearchPaidAdCard paidAds={paidAds} />}
                        </Col>
                      ))}
                    </>
                  ) : (
                    <p></p>
                  )}
                </div>
              </Col>
            </Row>
          )}

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
                    <div className="d-flex justify-content-center">
                      <span className="py-1">
                        <i className="fas fa-search"></i> Search
                        {/* Seller */}
                      </span>
                      {sellerUsernameSearchLoading && <LoaderButton />}
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {searchSellerUsername && (
            <Row className="py-2 d-flex justify-content-center">
              <Col md={6}>
                <div>
                  {serachResults && (
                    <SellerSearchCard
                      serachResults={serachResults}
                      sellerAvatarUrl={sellerAvatarUrl}
                    />
                  )}
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
