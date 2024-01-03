// Marketplace.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";
import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";
import SearchFreeAdCard from "./SearchFreeAdCard";
import SearchPaidAdCard from "./SearchPaidAdCard";
import SellerSearchCard from "./SellerSearchCard";
import FilterBar from "./FilterBar";
import {
  getSellerUsernameSearch,
  searchAds,
} from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

function Marketplace() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const [sellerUsername, setSellerUsername] = useState("");

  const [searchSellerUsername, setSearchSellerUsername] = useState(null);
  const [searchAdResult, setSearchAdResult] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const searchAdsState = useSelector((state) => state.searchAdsState);
  const {
    loading: searchAdLoading,
    error: searchAdError,
    freeAds,
    paidAds,
  } = searchAdsState;
  console.log("freeAds", freeAds);
  console.log("paidAds", paidAds);

  const getSellerUsernameSearchState = useSelector(
    (state) => state.getSellerUsernameSearchState
  );
  const {
    loading: sellerUsernameSearchLoading,
    error: sellerUsernameSearchError,
    serachResults,
    sellerAvatarUrl,
  } = getSellerUsernameSearchState;
  console.log("serachResults", serachResults);

  // console.log("Country:", Country.getAllCountries());
  // console.log("State:", State.getAllStates());
  // console.log("City:", City.getAllCities());

  // const [defaultCountry] = useState({
  //   value: "US",
  //   label: "United States",
  // });

  // const [defaultState] = useState({
  //   value: "CA",
  //   label: "California",
  // });

  // const [defaultCity] = useState({
  //   value: "SanFrancisco",
  //   label: "San Francisco",
  // });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption.value);
    setSelectedCity("");
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  // const savedCountry = localStorage.getItem("selectedCountry");
  // const savedState = localStorage.getItem("selectedState");
  // const savedCity = localStorage.getItem("selectedCity");

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedState = localStorage.getItem("selectedState");
    const savedCity = localStorage.getItem("selectedCity");

    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedState) setSelectedState(savedState);
    if (savedCity) setSelectedCity(savedCity);
  }, []);

  useEffect(() => {
    if (selectedCountry)
      localStorage.setItem("selectedCountry", selectedCountry);
    if (selectedState) localStorage.setItem("selectedState", selectedState);
    if (selectedCity) localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCountry, selectedState, selectedCity]);

  console.log("location", selectedCountry, selectedState, selectedCity);
  // console.log("saved location", savedCountry, savedState, savedCity);

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

  const handleSearchAds = () => {
    if (searchTerm.trim() !== "") {
      // const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const result = dispatch(searchAds(searchTerm.trim()));
      setSearchAdResult(result);
      if (!result) {
        console.log("Ad not found.");
      }
    }
  };

  const handleSellerUsernameSearch = () => {
    if (sellerUsername.trim() !== "") {
      const lowerCaseUsername = sellerUsername.toLowerCase().trim();
      const result = dispatch(getSellerUsernameSearch(lowerCaseUsername));
      setSearchSellerUsername(result);
      if (!result) {
        console.log("Seller not found.");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-shopping-cart"></i> Marketplace
          </h1>
          <hr />

          <div className="py-2 d-flex justify-content-center text-center">
            {searchAdError && (
              <Message fixed variant="danger">
                {searchAdError}
              </Message>
            )}

            {sellerUsernameSearchError && (
              <Message fixed variant="danger">
                {sellerUsernameSearchError}
              </Message>
            )}
          </div>

          <Row className="py-2 d-flex justify-content-center">
            <Col md={8}>
              <Row className="py-2 d-flex justify-content-betwwen">
                <Col md={10}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search ads"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="rounded"
                    size="sm"
                    onClick={handleSearchAds}
                  >
                    <div className="d-flex justify-content-center">
                      <span className="py-1">
                        <i className="fas fa-search"></i>
                        {/* Search */}
                        {/* Ads */}
                      </span>
                      {searchAdLoading && <LoaderButton />}
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <hr />
          <Col md={6}>
            <i className="fas fa-map-marker-alt"></i> Ad Location
          </Col>
          <Row className="py-2 d-flex justify-content-end">
            <Col className="py-2">
              <Col md={4}>
                <Select
                  options={Country.getAllCountries().map((country) => ({
                    // value: country.name,
                    value: country.isoCode,
                    label: country.name,
                  }))}
                  value={{ value: selectedCountry, label: selectedCountry }}
                  // value={
                  //   selectedCountry
                  //     ? { value: selectedCountry, label: selectedCountry }
                  //     : defaultCountry
                  // }
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  className="rounded"
                  required
                />
              </Col>
              <Col md={4}>
                <Select
                  options={
                    selectedCountry
                      ? State.getStatesOfCountry(selectedCountry).map(
                          (state) => ({
                            value: state.isoCode,
                            // value: state.name,
                            label: state.name,
                          })
                        )
                      : []
                  }
                  value={{ value: selectedState, label: selectedState }}
                  // value={
                  //   selectedState
                  //     ? { value: selectedState, label: selectedState }
                  //     : defaultState
                  // }
                  onChange={handleStateChange}
                  placeholder="Select State/Province"
                  className="rounded"
                  required
                />
              </Col>
              <Col md={4}>
                <Select
                  options={
                    selectedState
                      ? City.getCitiesOfState(
                          selectedCountry,
                          selectedState
                        ).map((city) => ({
                          value: city.name,
                          label: city.name,
                        }))
                      : []
                  }
                  value={{ value: selectedCity, label: selectedCity }}
                  // value={
                  //   selectedCity
                  //     ? { value: selectedCity, label: selectedCity }
                  //     : defaultCity
                  // }
                  onChange={handleCityChange}
                  placeholder="Select City"
                  className="rounded"
                  required
                />
              </Col>
            </Col>
            <Col md={4} xs={12} sm={6} lg={4} xl={4} className="py-2">
              <Row className="d-flex justify-content-betwwen">
                <Col md={10}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search seller by username"
                      value={sellerUsername}
                      onChange={(e) => setSellerUsername(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="rounded"
                    size="sm"
                    onClick={handleSellerUsernameSearch}
                    required
                  >
                    <div className="d-flex justify-content-center">
                      <span className="py-1">
                        <i className="fas fa-search"></i>
                        {/* Search */}
                        {/* Seller */}
                      </span>
                      {sellerUsernameSearchLoading && <LoaderButton />}
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="py-2 d-flex justify-content-center">
            <FilterBar />
          </div>

          <div className="py-2 d-flex justify-content-center">
            {searchSellerUsername && (
              <Row className="py-2 d-flex justify-content-center">
                <hr />
                <Col md={6}>
                  <div>
                    {serachResults && (
                      <SellerSearchCard
                        serachResults={serachResults}
                        sellerAvatarUrl={sellerAvatarUrl}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </div>

          <hr />

          <div className="text-center py-2">
            <span>
              At this angle, sells are quick...
            </span>
            <Button
              variant="success"
              className="rounded"
              size="sm"
              onClick={handlePostFreeAd}
            >
              Post Free Ads <i className="fas fa-plus-square"></i>
            </Button>
          </div>

          <div className="py-2">
            {searchAdResult && (
              <Row className="py-2 d-flex justify-content-center">
                <h3 className="text-center">Search Ad Result</h3>
                <Col>
                  <div>
                    {freeAds || paidAds ? (
                      <>
                        {freeAds?.map((freeAds) => (
                          <Col
                            key={freeAds.id}
                            xs={12}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={4}
                          >
                            {freeAds && (
                              <SearchFreeAdCard
                                selectedCountry={selectedCountry}
                                selectedState={selectedState}
                                selectedCity={selectedCity}
                                freeAds={freeAds}
                              />
                            )}
                          </Col>
                        ))}

                        {paidAds?.map((paidAds) => (
                          <Col
                            key={paidAds.id}
                            xs={12}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={4}
                          >
                            {paidAds && (
                              <SearchPaidAdCard
                                selectedCountry={selectedCountry}
                                selectedState={selectedState}
                                selectedCity={selectedCity}
                                paidAds={paidAds}
                              />
                            )}
                          </Col>
                        ))}
                      </>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </div>

          <div>
            <AllPaidAdScreen
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
            />
          </div>

          <div>
            <AllFreeAdScreen
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Marketplace;
