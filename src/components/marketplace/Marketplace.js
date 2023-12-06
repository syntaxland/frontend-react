// Marketplace.js
// import React from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";
// import Product from "../Product";
// import { listProducts } from "../../actions/productAction";
// import Loader from "../Loader";
// import Message from "../Message";
// import PromoProductScroll from "../PromoProductScroll";
import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";

function Marketplace({ history }) {
  const dispatch = useDispatch();

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

  // const handleCreateMarketplaceSeller = () => {
  //   history.push("/create-marketplace-seller");
  // };

  return (
    <div>
      <Row>
        <Col>
          <div>
            {/* <h1 className="text-center py-3">Promoted Hot Deals</h1> */}
            <AllPaidAdScreen />
          </div>

          <div>
            {/* <hr /> */}
            {/* <h1 className="text-center py-3">Hot Deals</h1> */}
            {/* <hr /> */}
            <AllFreeAdScreen />
          </div>

          <div className="text-center">
            
            <span>
              Post your goods and services and start making more sell.{" "}
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
        </Col>
      </Row>
    </div>
  );
}

export default Marketplace;
