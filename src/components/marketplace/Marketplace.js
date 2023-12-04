// Marketplace.js
import React from "react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
// import Product from "../Product";
// import { listProducts } from "../../actions/productAction";
// import Loader from "../Loader";
// import Message from "../Message";
import PromoProductScroll from "../PromoProductScroll";
import PaidAdScreen from "./PaidAdScreen";

function Marketplace({ history }) {
  // const dispatch = useDispatch(); 

  return (
    <div>
      <Row>
        <Col>
          <div>
            <hr />
            <h1 className="text-center py-3">MarketPlace Hot Deals</h1>
            <hr />
            <PaidAdScreen />
          </div>

          <div className="text-center">
            <hr />
            <h1 className="py-3">Categories</h1>
            <hr />
            <PromoProductScroll />
            <span>
              Post your goods and services and start making more sell.{" "}
            </span>
            <Button
              variant="primary"
              className="rounded"
              size="sm"
              onClick={() => history.push("/post-ads")}
            >
              Post ads <i className="fas fa-plus-square"></i>
            </Button>
          </div>

          <div>
            <hr />
            <h1 className="text-center py-3">Running Offers</h1>
            <hr />
            <PromoProductScroll />
          </div>

          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default Marketplace;
