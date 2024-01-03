// SearchPaidAdCard.js
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RatingSeller from "../RatingSeller";
import {
  saveProduct,
  removeProduct,
  updateProductSaveCount,
  trackProductView,
} from "../../actions/productAction";
import { getSellerAccount } from "../../actions/marketplaceSellerActions"; 

import { getPaidAdDetail } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
// import ProductPrice from "../ProductPrice";
import PromoTimer from "../PromoTimer";

function SearchPaidAdCard({ paidAds }) {
  console.log("paidAds Card", paidAds);
  const dispatch = useDispatch();

  const [paidAdsSaved, setProductSaved] = useState(false);
  const [totalSaves, setTotalSaves] = useState(paidAds?.ad_save_count);

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const { sellerAccount } = getSellerAccountState;

  const [paidAdsMessages, setProductMessages] = useState({
    paidAdsSaveSuccess: false,
    paidAdsRemoveSuccess: false,
    paidAdsSaveError: null,
    paidAdsRemoveError: null,
  });

  const [paidAdsLoading, setProductLoading] = useState({
    paidAdsSaveLoading: false,
    paidAdsRemoveLoading: false,
  });

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const { sellerAvatarUrl } = getPaidAdDetailState;
  // console.log("sellerAvatarUrl:", sellerAvatarUrl);

  useEffect(() => {
    if (
      userInfo &&
      userInfo.favorite_paidAdss &&
      userInfo.favorite_paidAdss.includes(paidAds.id)
    ) {
      setProductSaved(true);
    } else {
      setProductSaved(false);
    }
  }, [userInfo, paidAds.id]);

  useEffect(() => {
    const pk = paidAds.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getPaidAdDetail(pk));
    }
  }, [dispatch, userInfo, paidAds.id]);

  const toggleFavoriteHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (paidAdsSaved) {
        setProductLoading({ paidAdsRemoveLoading: true });
        dispatch(removeProduct(userInfo.id, paidAds.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              paidAdsRemoveSuccess: true,
              paidAdsSaveSuccess: false,
              paidAdsRemoveError: null,
              paidAdsSaveError: null,
            }));
            setProductSaved(false);
            setTotalSaves((prevSaves) => prevSaves - 1); // Decrement totalSaves
            const updatedSaveCount = paidAds?.ad_save_count - 1;
            dispatch(updateProductSaveCount(paidAds.id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
            setProductMessages((prevState) => ({
              ...prevState,
              paidAdsRemoveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              paidAdsRemoveSuccess: false,
              paidAdsSaveSuccess: false,
              paidAdsSaveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ paidAdsRemoveLoading: false });
          });
      } else {
        setProductLoading({ paidAdsSaveLoading: true });
        dispatch(saveProduct(userInfo.id, paidAds.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              paidAdsSaveSuccess: true,
              paidAdsRemoveSuccess: false,
              paidAdsSaveError: null,
              paidAdsRemoveError: null,
            }));
            setProductSaved(true);
            setTotalSaves((prevSaves) => prevSaves + 1);
            const updatedSaveCount = paidAds?.ad_save_count + 1;
            dispatch(updateProductSaveCount(paidAds.id, updatedSaveCount));
          })
          .catch((error) => {
            setProductMessages((prevState) => ({
              ...prevState,
              paidAdsSaveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              paidAdsSaveSuccess: false,
              paidAdsRemoveSuccess: false,
              paidAdsRemoveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ paidAdsSaveLoading: false });
          });
      }
    }
    setTimeout(() => {
      setProductMessages((prevState) => ({
        ...prevState,
        paidAdsSaveSuccess: false,
        paidAdsRemoveSuccess: false,
      }));
    }, 3000);
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      history.push("/login");
      // dispatch(trackProductView(userInfo.id, paidAds.id));
    }
    dispatch(trackProductView(userInfo.id, paidAds.id));

    history.push(`/paid-ad-detail/${paidAds.id}`);
  };

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

  const handleClickMessageSeller = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      const queryParams = {
        id: paidAds.id,
        image1: paidAds.image1,
        ad_name: paidAds.ad_name,
        price: paidAds.price,
        sellerAvatarUrl,
        seller_username: paidAds.seller_username,
        expiration_date: paidAds.expiration_date,
        ad_rating: paidAds.ad_rating,
      };

      history.push({
        pathname: `/paid/ad/message/${paidAds.id}`,
        search: `?${new URLSearchParams(queryParams).toString()}`,
      });
    }
  };

  return (
    <Card className="my-3 p-3 rounded">
      {paidAdsMessages.paidAdsSaveSuccess && (
        <Message variant="success">Item added to favorites.</Message>
      )}
      {paidAdsMessages.paidAdsRemoveSuccess && (
        <Message variant="danger">Item removed from favorites.</Message>
      )}
      {paidAdsMessages.paidAdsSaveError && (
        <Message variant="danger">{paidAdsMessages.paidAdsSaveError}</Message>
      )}
      {paidAdsMessages.paidAdsRemoveError && (
        <Message variant="danger">{paidAdsMessages.paidAdsRemoveError}</Message>
      )}

      {paidAdsLoading.paidAdsSaveLoading && <Loader />}
      {paidAdsLoading.paidAdsRemoveLoading && <Loader />}

      <Link onClick={viewProductHandler}>
        <Card.Img src={paidAds.image1} />
      </Link>

      <Card.Body>
        <Link onClick={viewProductHandler} className="py-2">
          <Card.Title as="div">
            <strong>{paidAds.ad_name}</strong>
          </Card.Title>
        </Link>

        <div className="d-flex justify-content-between py-2">
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
                    <i className="fas fa-user"></i> <i>ID Not Verified</i>{" "}
                    <i
                      // className="fas fa-check-circle"
                      style={{ fontSize: "18px", color: "red" }}
                    ></i>
                  </Button>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div as="div">
            <div className="py-2">
              <RatingSeller
                value={paidAds.rating}
                text={`${formatCount(paidAds?.num_reviews)} reviews `}
                color={"green"}
              />

              {userInfo ? (
                <Link to={`/review-list/${paidAds.id}`}>(Seller Reviews)</Link>
              ) : (
                <Link onClick={() => history.push("/login")}>
                  (Seller Reviews)
                </Link>
              )}
            </div>
          </div>

          <Card.Text as="div" className="py-2">
            <span className="text-right" onClick={viewProductHandler}>
              <i className="fas fa-eye"></i>{" "}
              {formatCount(paidAds?.ad_view_count)} views
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between">
          <Card.Text as="h5" className="py-2">
            <span>
               {paidAds?.price} {paidAds?.currency}{" "}
             {paidAds?.usd_price ? <span> / {paidAds?.usd_price} USD </span> : <></>}{" "}
              {paidAds?.is_price_negotiable ? <i>(Negotiable)</i> : <></>}
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-end">
          <span className="py-2">
            {paidAds?.promo_code ? (
              <Button
                variant="outline-primary"
                size="sm"
                className="py-2 rounded"
                disabled
              >
                <i>
                  Promo Code: {paidAds?.promo_code}{" "}
                  {paidAds?.discount_percentage}% Off
                </i> 
              </Button> 
            ) : (
              <></>
            )}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="py-2">
            <Button
              variant="outline-danger"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-clock"></i> Expires in:{" "}
              <PromoTimer expirationDate={paidAds?.expiration_date} />
            </Button>
          </span>
        </div>

        <div className="d-flex justify-content-between py-2">
          <span className="py-2">
            <Button
              variant="primary"
              size="sm"
              className="py-2 rounded"
              onClick={handleClickMessageSeller}
            >
              <i className="fa fa-message"></i> Message Seller
            </Button>
          </span>

          <span className="py-2">
            <Button
              onClick={toggleFavoriteHandler}
              className="py-2 rounded"
              type="button"
              variant={paidAdsSaved ? "danger" : "outline-danger"}
            >
              <div className="mt-auto">
                <i
                  className={paidAdsSaved ? "fas fa-heart" : "far fa-heart"}
                ></i>{" "}
                {paidAdsSaved ? "Saved" : "Save"}{" "}
                <span className="text-muted">({formatCount(totalSaves)})</span>
              </div>
            </Button>
          </span>
        </div>
        <div className="d-flex justify-content-between py-2">
          <span>
            <Button
              variant="outline-transparent"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-map-marker-alt"></i> {paidAds?.city} {paidAds?.state_province}, {paidAds?.country}.
            </Button>
          </span>

          <span>
            <Button
              variant="danger"
              size="sm"
              className="rounded py-2"
              // onClick={handleReportAd}
              disabled
            >
              <i className="fa fa-exclamation-circle"></i> Report Ad
            </Button>
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SearchPaidAdCard;
