// SellerShopFront.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";

import SellerActiveFreeAdScreen from "./SellerActiveFreeAdScreen";
import SellerActivePaidAdScreen from "./SellerActivePaidAdScreen";

function SellerShopFront() {
  const dispatch = useDispatch();
  const { seller_username } = useParams();
  console.log("seller_username:", seller_username)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userProfile = useSelector((state) => state.userProfile);
  // const { profile } = userProfile;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  // const handlePostFreeAd = () => {
  //   if (!userInfo) {
  //     history.push("/login");
  //   } else if (userInfo && !profile.is_marketplace_seller) {
  //     history.push("/create-marketplace-seller");
  //   } else {
  //     history.push("/ad/free");
  //   }
  // };

  return (
    <div>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-shopping-cart"></i> Seller Shop Front
          </h1>
          <hr />

          <div>
            <SellerActiveFreeAdScreen seller_username={seller_username} />
          </div>

          <div>
            <SellerActivePaidAdScreen seller_username={seller_username} />
          </div>

          {/* <div className="text-center">
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
          </div> */}

          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default SellerShopFront;
