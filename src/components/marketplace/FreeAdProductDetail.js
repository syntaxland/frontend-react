// FreeAdProductDetail.js
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
import { getFreeAdDetail } from "../../actions/marketplaceSellerActions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function FreeAdProductDetail({ match, history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const { loading, error, ads } = getFreeAdDetailState;
  console.log("PaidAds:", ads, "description:", ads?.description);

  useEffect(() => {
    dispatch(getFreeAdDetail(match.params.id));
  }, [dispatch, match]);

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

  const images = [ads?.image1, ads?.image2, ads?.image3].filter(Boolean);

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
              <ListGroup.Item>Price: NGN {ads?.price}</ListGroup.Item>

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
                      <strong>NGN {ads.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  
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
                    // className="btn-block"
                    className="w-100 rounded"
                    variant="success"
                    // disabled={ads?.count_in_stock === 0}
                    type="button"
                    // onClick={addToCartHandler}
                  >
                    Pay With Paysofter Promise
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default FreeAdProductDetail;
