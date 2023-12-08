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
  Form,
} from "react-bootstrap";
import RatingSeller from "../RatingSeller";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
// import { listProductDetails } from "../../actions/adsAction";
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
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showPaysofterOption, setShowPaysofterOption] = useState(false);

  const handlePaysofterOption = () => {
    setShowPaysofterOption(!showPaysofterOption);
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
  const { loading, error, ads, sellerApiKey } = getPaidAdDetailState;
  // console.log("PaidAds:", ads, 'sellerApiKey', sellerApiKey); 

  useEffect(() => {
    dispatch(getPaidAdDetail(match.params.id));
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

  return (
    <div>
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
                  <RatingSeller
                    value={ads?.ad_rating}
                    text={`${formatCount(ads?.num_reviews)} reviews `}
                    color={"green"}
                  />
                </span>
                <span>
                  {userInfo ? (
                    <Link to={`/review-list/${ads.id}`}>(Seller Reviews)</Link>
                  ) : (
                    <Link onClick={() => history.push("/login")}>
                      (Seller Reviews)
                    </Link>
                  )}
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
                  <i>{ads?.promo_code} NEWCOM0124</i>
                </Button>
              </ListGroup.Item>

              <ListGroup.Item>Description: {ads?.description}</ListGroup.Item>
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
                    Expires in:{" "}
                    <PromoTimer expirationDate={ads?.expiration_date} />
                  </Button>
                </ListGroup.Item>

                {ads?.count_in_stock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
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
                    </Row>
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
    </div>
  );
}

export default PaidAdProductDetail;
