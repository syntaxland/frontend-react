// SellerShopFront.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";

import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";

function SellerShopFront({ history }) {
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

  return (
    <div>
      <Row>
        <Col>
          <div>
            <AllPaidAdScreen />
          </div>

          <div>
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

export default SellerShopFront;
