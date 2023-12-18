// SearchFreeAdCard.js
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
import { getFreeAdDetail } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import PromoTimer from "../PromoTimer";

function SearchFreeAdCard({ freeAds }) {
  console.log("free Ads Card", freeAds);

  const dispatch = useDispatch();

  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const { sellerAvatarUrl } = getFreeAdDetailState;

  const [freeAdsSaved, setProductSaved] = useState(false);
  const [totalSaves, setTotalSaves] = useState(freeAds?.ad_save_count);

  const [freeAdsMessages, setProductMessages] = useState({
    freeAdsSaveSuccess: false,
    freeAdsRemoveSuccess: false,
    freeAdsSaveError: null,
    freeAdsRemoveError: null,
  });

  const [freeAdsLoading, setProductLoading] = useState({
    freeAdsSaveLoading: false,
    freeAdsRemoveLoading: false,
  });

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const { sellerAccount } = getSellerAccountState;
  console.log("is_seller_verified", sellerAccount?.is_seller_verified);
  
  useEffect(() => {
    const pk = freeAds.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getFreeAdDetail(pk));
    } 
  }, [dispatch, userInfo, freeAds.id]);

  useEffect(() => {
    if (
      userInfo &&
      userInfo.favorite_freeAdss &&
      userInfo.favorite_freeAdss.includes(freeAds.id)
    ) {
      setProductSaved(true);
    } else {
      setProductSaved(false);
    }
  }, [userInfo, freeAds.id]);

  const toggleFavoriteHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (freeAdsSaved) {
        setProductLoading({ freeAdsRemoveLoading: true });
        dispatch(removeProduct(userInfo.id, freeAds.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              freeAdsRemoveSuccess: true,
              freeAdsSaveSuccess: false,
              freeAdsRemoveError: null,
              freeAdsSaveError: null,
            }));
            setProductSaved(false);
            setTotalSaves((prevSaves) => prevSaves - 1); // Decrement totalSaves
            const updatedSaveCount = freeAds?.ad_save_count - 1;
            dispatch(updateProductSaveCount(freeAds.id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
            setProductMessages((prevState) => ({
              ...prevState,
              freeAdsRemoveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              freeAdsRemoveSuccess: false,
              freeAdsSaveSuccess: false,
              freeAdsSaveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ freeAdsRemoveLoading: false });
          });
      } else {
        setProductLoading({ freeAdsSaveLoading: true });
        dispatch(saveProduct(userInfo.id, freeAds.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              freeAdsSaveSuccess: true,
              freeAdsRemoveSuccess: false,
              freeAdsSaveError: null,
              freeAdsRemoveError: null,
            }));
            setProductSaved(true);
            setTotalSaves((prevSaves) => prevSaves + 1);
            const updatedSaveCount = freeAds?.ad_save_count + 1;
            dispatch(updateProductSaveCount(freeAds.id, updatedSaveCount));
          })
          .catch((error) => {
            setProductMessages((prevState) => ({
              ...prevState,
              freeAdsSaveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              freeAdsSaveSuccess: false,
              freeAdsRemoveSuccess: false,
              freeAdsRemoveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ freeAdsSaveLoading: false });
          });
      }
    }
    setTimeout(() => {
      setProductMessages((prevState) => ({
        ...prevState,
        freeAdsSaveSuccess: false,
        freeAdsRemoveSuccess: false,
      }));
    }, 3000);
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      history.push("/login");
      // dispatch(trackProductView(userInfo.id, freeAds.id));
    }
    dispatch(trackProductView(userInfo.id, freeAds.id));

    history.push(`/free-ad-detail/${freeAds.id}`);
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
        id: freeAds.id,
        image1: freeAds.image1,
        ad_name: freeAds.ad_name,
        price: freeAds.price,
        sellerAvatarUrl,
        seller_username: freeAds.seller_username,
        expiration_date: freeAds.expiration_date,
        ad_rating: freeAds.ad_rating,
      };

      history.push({
        pathname: `/free/ad/message/${freeAds.id}`,
        search: `?${new URLSearchParams(queryParams).toString()}`,
      });
    }
  };

  return (
    <Card className="my-3 p-3 rounded">
      {freeAdsMessages.freeAdsSaveSuccess && (
        <Message variant="success">Item added to favorites.</Message>
      )}
      {freeAdsMessages.freeAdsRemoveSuccess && (
        <Message variant="danger">Item removed from favorites.</Message>
      )}
      {freeAdsMessages.freeAdsSaveError && (
        <Message variant="danger">{freeAdsMessages.freeAdsSaveError}</Message>
      )}
      {freeAdsMessages.freeAdsRemoveError && (
        <Message variant="danger">{freeAdsMessages.freeAdsRemoveError}</Message>
      )}

      {freeAdsLoading.freeAdsSaveLoading && <Loader />}
      {freeAdsLoading.freeAdsRemoveLoading && <Loader />}

      <Link onClick={viewProductHandler}>
        <Card.Img src={freeAds.image1} />
      </Link>

      <Card.Body>
        <div className="d-flex justify-content-between">
          <Link onClick={viewProductHandler}>
            <Card.Title as="div">
              <strong>{freeAds.ad_name}</strong>
            </Card.Title>
          </Link>
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
                    <i>Verified ID</i>{" "}
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
                    <i>ID Not Verified</i>{" "}
                    <i
                      // className="fas fa-times"
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
                value={freeAds.rating}
                text={`${formatCount(freeAds?.num_reviews)} reviews `}
                color={"green"}
              />

              {userInfo ? (
                <Link to={`/review-list/${freeAds.id}`}>(Seller Reviews)</Link>
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
              {formatCount(freeAds?.ad_view_count)} views
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between py-2">
          <Card.Text as="h5" className="py-2">
            <span>
              NGN {freeAds?.price}{" "}
              {freeAds?.is_price_negotiable ? <i>(Negotiable)</i> : <></>}
            </span>
          </Card.Text>
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
              <PromoTimer expirationDate={freeAds?.expiration_date} />
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
              variant={freeAdsSaved ? "danger" : "outline-danger"}
            >
              <div className="mt-auto">
                <i
                  className={freeAdsSaved ? "fas fa-heart" : "far fa-heart"}
                ></i>{" "}
                {freeAdsSaved ? "Saved" : "Save"}{" "}
                <span className="text-muted">({formatCount(totalSaves)})</span>
              </div>
            </Button> 
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SearchFreeAdCard;
