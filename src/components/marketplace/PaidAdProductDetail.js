// PaidAdProductDetail.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  // Form,
} from "react-bootstrap";
import RatingSeller from "../RatingSeller";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
// import { listProductDetails } from "../../actions/adsAction";

import { getSellerAccount } from "../../actions/marketplaceSellerActions";
import {
  //  getFreeAd,
  //  deleteFreeAd,
  //  updateFreeAd,
  //  getAllFreeAd,
  //  getPaidAd,
  //  updatePaidAd,
  //  deletePaidAd,
  //  getAllPaidAd,
  // getFreeAdDetail
  getPaidAdDetail,
} from "../../actions/marketplaceSellerActions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Paysofter from "../MarketplacePayment/Paysofter";
import PromoTimer from "../PromoTimer";

function PaidAdProductDetail({ match, history }) {
  // const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const { sellerAccount } = getSellerAccountState;
  const [showPaysofterOption, setShowPaysofterOption] = useState(false);

  const handlePaysofterOption = () => {
    setShowPaysofterOption(!showPaysofterOption);
  };

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const handleShowPhoneNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  //   getFreeAdState
  // updateFreeAdState
  // getAllFreeAdState
  // getPaidAdState
  // updatePaidAdState
  // getAllPaidAdState
  // deleteFreeAdState
  // deletePaidAdState
  // getFreeAdDetailState
  // getPaidAdDetailState

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const {
    loading,
    error,
    ads,
    sellerApiKey,
    sellerAvatarUrl,
  } = getPaidAdDetailState;
  console.log("sellerAvatarUrl", sellerAvatarUrl);

  useEffect(() => {
    dispatch(getPaidAdDetail(match.params.id));
    dispatch(getSellerAccount());
  }, [dispatch, match]);

  const images = [ads?.image1, ads?.image2, ads?.image3].filter(Boolean);

  function formatCount(viewCount) {
    if (viewCount >= 1000000) {
      // Format as million
      return (viewCount / 1000000).toFixed(1) + "m";
    } else if (viewCount >= 1000) {
      // Format as thousand
      return (viewCount / 1000).toFixed(1) + "k";
    } else {
      return viewCount?.toString();
    }
  }

  function calculateDuration(joinedTimestamp) {
    const now = new Date();
    const joinedDate = new Date(joinedTimestamp);
    const duration = now - joinedDate;

    const days = Math.floor(duration / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((duration % (60 * 1000)) / 1000);

    const parts = [];

    if (days > 0) {
      parts.push(`${days} days`);
    }

    if (hours > 0) {
      parts.push(`${hours} hours`);
    }

    if (minutes > 0) {
      parts.push(`${minutes} minutes`);
    }

    if (seconds > 0) {
      parts.push(`${seconds} seconds`);
    }

    return parts.join(", ");
  }

  return (
    <Container>
      <Row>
        <Col>
          <Link to="/marketplace" className="btn btn-dark my-3">
            {" "}
            Go Back
          </Link>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error} </Message>
          ) : (
            <Row>
              <Col md={6}>
                {images.length > 0 ? (
                  <Carousel
                    showArrows={true}
                    showIndicators={true}
                    showThumbs={true}
                    useKeyboardArrows={true}
                    dynamicHeight={false}
                  >
                    {images.map((image, index) => (
                      <div className="slide" key={index}>
                        <Image src={image} alt={`Slide ${index + 1}`} fluid />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <></>
                )}
              </Col>

              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{ads?.ad_name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="rounded"
                        disabled
                      >
                        <i>Promoted</i>
                      </Button>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    Promo Code:
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="py-2 rounded"
                      disabled
                    >
                      <i>
                        {ads?.promo_code} {ads?.discount_percentage}% off
                      </i>
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>NGN {ads?.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="py-2 rounded"
                        disabled
                      >
                        <i className="fas fa-clock"></i> Expires in:{" "}
                        <PromoTimer expirationDate={ads?.expiration_date} />
                      </Button>
                    </ListGroup.Item>

                    {ads?.count_in_stock > 0 && (
                      <ListGroup.Item>
                        Quantity in Stock: {ads?.count_in_stock}
                        {/* <Row>
                      <Col>Quantity in Stock</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(ads?.count_in_stock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row> */}
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className="w-100 rounded"
                        variant="success"
                        type="button"
                        onClick={handlePaysofterOption}
                      >
                        Pay With Paysofter Promise
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <ListGroup className="py-2">
                <ListGroup.Item>
                  Ad Description: {ads?.description}
                </ListGroup.Item>

                <ListGroup.Item>
                  <ListGroup.Item>Seller Details</ListGroup.Item>
                  <ListGroup.Item>
                    <span className="d-flex justify-content-between py-2">
                      {sellerAvatarUrl && (
                        <img
                          src={sellerAvatarUrl}
                          alt="Seller"
                          style={{
                            maxWidth: "80px",
                            maxHeight: "80px",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                      {ads?.seller_username}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <span>
                        {sellerAccount?.is_seller_verified ? (
                          <>
                            <Button
                              variant="outline-success"
                              size="sm"
                              className="rounded"
                              disabled
                            >
                              <i className="fas fa-user"></i> <i>Verified ID</i>{" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: "18px", color: "blue" }}
                              ></i>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded"
                              disabled
                            >
                              <i className="fas fa-user"></i>{" "}
                              <i>ID Not Verified</i>{" "}
                              <i style={{ fontSize: "18px", color: "red" }}></i>
                            </Button>
                          </>
                        )}
                      </span>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span>
                      <RatingSeller
                        value={ads?.ad_rating}
                        text={`${formatCount(ads?.num_reviews)} reviews `}
                        color={"green"}
                      />
                    </span>
                    <span>
                      {userInfo ? (
                        <Link to={`/review-list/${ads.id}`}>
                          (Seller Reviews)
                        </Link>
                      ) : (
                        <Link onClick={() => history.push("/login")}>
                          (Seller Reviews)
                        </Link>
                      )}
                    </span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="py-2 rounded"
                      onClick={handleShowPhoneNumber}
                    >
                      <i className="fa fa-phone"></i>{" "}
                      {showPhoneNumber ? "Hide" : "Show"} Seller Phone Number
                    </Button>
                    {showPhoneNumber && <p>{ads?.seller_phone}</p>}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="py-2 rounded"
                    >
                      <i className="fa fa-message"></i> Message Seller
                    </Button>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Joined since {calculateDuration(ads?.seller_joined_since)}
                  </ListGroup.Item>
                </ListGroup.Item>
              </ListGroup>
            </Row>
          )}
          <Row className="d-flex justify-content-center">
            <Col>
              {showPaysofterOption && (
                <Paysofter
                  ads={ads}
                  buyerEmail={userInfo.email}
                  amount={ads?.price}
                  sellerApiKey={sellerApiKey}
                />
              )}
            </Col>
          </Row>

          <div className="text-center mt-4 mb-2 text-muted">
            <p style={{ color: "red" }}>
              <strong>Disclaimer:</strong> Buyers are advised to exercise
              caution and conduct thorough verification when dealing with
              sellers. Ensure the authenticity of both the product and the
              seller before proceeding with any transactions.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PaidAdProductDetail;
