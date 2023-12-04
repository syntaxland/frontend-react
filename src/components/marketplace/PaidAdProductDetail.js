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
import Rating from "../Rating";
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
getPaidAdDetail
 } from "../../actions/marketplaceSellerActions";

import ProductPrice from "../ProductPrice";

function PaidAdProductDetail({ match, history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

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

const getPaidAdDetailState = useSelector((state) => state.getPaidAdDetailState);
  const { loading, error,  ads } = getPaidAdDetailState; 
  console.log('PaidAds:', ads,'description:', ads?.description)


  useEffect(() => {
    dispatch(getPaidAdDetail(match.params.id)); 
    // dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };


  return (
    <div>
      <Link to="/" className="btn btn-dark my-3">
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
            <Image src={ads?.image1} alt={ads.ad_name} fluid />
            <Image src={ads?.image2} alt={ads.ad_name} fluid />
            <Image src={ads?.image3} alt={ads.ad_name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{ads?.ad_name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={ads?.ad_rating}
                  // text={`${ads.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: NGN {ads?.price}</ListGroup.Item>

              <ListGroup.Item>
                <ProductPrice price={ads?.price} promoPrice={ads?.promo_price} />
              </ListGroup.Item>

              <ListGroup.Item>
                Description: {ads?.description}
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
                      <strong>NGN {ads.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col> 
                    <Col>
                      {ads?.count_in_stock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
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
                    disabled={ads?.count_in_stock === 0}
                    type="button"
                    onClick={addToCartHandler}
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

export default PaidAdProductDetail;
