// AllPaidAdCard.js
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
import PromoTimer from "../PromoTimer";
// import { Country, State, City } from "country-state-city";

function AllPaidAdCard({ product }) {
  const dispatch = useDispatch();

  const [productSaved, setProductSaved] = useState(false);
  const [totalSaves, setTotalSaves] = useState(product?.ad_save_count);

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const { sellerAccount } = getSellerAccountState;

  const [productMessages, setProductMessages] = useState({
    productSaveSuccess: false,
    productRemoveSuccess: false,
    productSaveError: null,
    productRemoveError: null,
  });

  const [productLoading, setProductLoading] = useState({
    productSaveLoading: false,
    productRemoveLoading: false,
  });

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const { sellerAvatarUrl } = getPaidAdDetailState;
  // console.log("sellerAvatarUrl:", sellerAvatarUrl);

  // const countries = Country?.getAllCountries();
  // const states = State?.getStatesOfCountry(product?.country?.isoCode);
  // const cities = City?.getCitiesOfState(
  //   product?.country?.isoCode,
  //   product?.state_province?.isoCode
  // );

  // const getCountryLabel = (isoCode) => {
  //   const country = countries.find((c) => c.isoCode === isoCode);
  //   return country ? country.name : "";
  // };

  // const getStateLabel = (isoCode) => {
  //   const state = states.find((s) => s.isoCode === isoCode);
  //   return state ? state.name : "";
  // };

  // const getCityLabel = (cityName) => {
  //   const city = cities.find((c) => c.name === cityName);
  //   return city ? city.name : "";
  // };

  useEffect(() => {
    if (
      userInfo &&
      userInfo.favorite_products &&
      userInfo.favorite_products.includes(product.id)
    ) {
      setProductSaved(true);
    } else {
      setProductSaved(false);
    }
  }, [userInfo, product.id]);

  useEffect(() => {
    const pk = product.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getPaidAdDetail(pk));
    }
  }, [dispatch, userInfo, product.id]);

  const toggleFavoriteHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (productSaved) {
        setProductLoading({ productRemoveLoading: true });
        dispatch(removeProduct(userInfo.id, product.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveSuccess: true,
              productSaveSuccess: false,
              productRemoveError: null,
              productSaveError: null,
            }));
            setProductSaved(false);
            setTotalSaves((prevSaves) => prevSaves - 1); // Decrement totalSaves
            const updatedSaveCount = product?.ad_save_count - 1;
            dispatch(updateProductSaveCount(product.id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              productRemoveSuccess: false,
              productSaveSuccess: false,
              productSaveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ productRemoveLoading: false });
          });
      } else {
        setProductLoading({ productSaveLoading: true });
        dispatch(saveProduct(userInfo.id, product.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveSuccess: true,
              productRemoveSuccess: false,
              productSaveError: null,
              productRemoveError: null,
            }));
            setProductSaved(true);
            setTotalSaves((prevSaves) => prevSaves + 1);
            const updatedSaveCount = product?.ad_save_count + 1;
            dispatch(updateProductSaveCount(product.id, updatedSaveCount));
          })
          .catch((error) => {
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              productSaveSuccess: false,
              productRemoveSuccess: false,
              productRemoveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ productSaveLoading: false });
          });
      }
    }
    setTimeout(() => {
      setProductMessages((prevState) => ({
        ...prevState,
        productSaveSuccess: false,
        productRemoveSuccess: false,
      }));
    }, 3000);
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      history.push("/login");
      // dispatch(trackProductView(userInfo.id, product.id));
    }
    dispatch(trackProductView(userInfo.id, product.id));

    history.push(`/paid-ad-detail/${product.id}`);
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
        id: product.id,
        image1: product.image1,
        ad_name: product.ad_name,
        price: product.price,
        sellerAvatarUrl,
        seller_username: product.seller_username,
        expiration_date: product.expiration_date,
        ad_rating: product.ad_rating,
      };

      history.push({
        pathname: `/paid/ad/message/${product.id}`,
        search: `?${new URLSearchParams(queryParams).toString()}`,
      });
    }
  };

  return (
    <Card className="my-3 p-3 rounded">
      {productMessages.productSaveSuccess && (
        <Message variant="success">Item added to favorites.</Message>
      )}
      {productMessages.productRemoveSuccess && (
        <Message variant="danger">Item removed from favorites.</Message>
      )}
      {productMessages.productSaveError && (
        <Message variant="danger">{productMessages.productSaveError}</Message>
      )}
      {productMessages.productRemoveError && (
        <Message variant="danger">{productMessages.productRemoveError}</Message>
      )}

      {productLoading.productSaveLoading && <Loader />}
      {productLoading.productRemoveLoading && <Loader />}

      <Link onClick={viewProductHandler}>
        <Card.Img src={product.image1} />
      </Link>

      <Card.Body>
        <div className="d-flex justify-content-between py-2">
          <Link onClick={viewProductHandler}>
            <Card.Title as="div">
              <strong>{product.ad_name}</strong>
            </Card.Title>
          </Link>
        </div>

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
                value={product.rating}
                text={`${formatCount(product?.num_reviews)} reviews `}
                color={"green"}
              />

              {userInfo ? (
                <Link to={`/review-list/${product.id}`}>(Seller Reviews)</Link>
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
              {formatCount(product?.ad_view_count)} views
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between">
          <Card.Text as="h5" className="py-2">
            <span>
              {product?.price} {product?.currency}{" "}
              {product?.usd_price ? (
                <span>
                  {" "}
                  / {product?.usd_price} {product?.usd_currency}{" "}
                </span>
              ) : (
                <></>
              )}{" "}
              {product?.is_price_negotiable ? <i>(Negotiable)</i> : <></>}
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-end">
          <span className="py-2">
            {product?.promo_code ? (
              <Button
                variant="outline-primary"
                size="sm"
                className="py-2 rounded"
                disabled
              >
                <i>
                  Promo Code: {product?.promo_code}{" "}
                  {product?.discount_percentage}% Off
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
              <PromoTimer expirationDate={product?.expiration_date} />
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
              variant={productSaved ? "danger" : "outline-danger"}
            >
              <div className="mt-auto">
                <i
                  className={productSaved ? "fas fa-heart" : "far fa-heart"}
                ></i>{" "}
                {productSaved ? "Saved" : "Save"}{" "}
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
              <i className="fas fa-map-marker-alt"></i> {product?.city}{" "}
              {product?.state_province}, {product?.country}.
            </Button>
          </span>

          {/* <span>
            <Button
              variant="outline-transparent"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-map-marker-alt"></i>{" "}
              {getCityLabel(product?.city)},{" "}
              {getStateLabel(product?.state_province)},{" "}
              {getCountryLabel(product?.country)}.
            </Button>
          </span> */}

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

export default AllPaidAdCard;
