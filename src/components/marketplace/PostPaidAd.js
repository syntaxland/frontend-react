// PostPaidAd.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { postPaidAd } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";

function PostPaidAd({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const postPaidAdState = useSelector((state) => state.postPaidAdState);
  const { success, error, loading } = postPaidAdState;

  const [adName, setAdName] = useState("");
  const [adNameError, setAdNameError] = useState("");

  const [adCategory, setAdCategory] = useState("");
  const [adCategoryError, setAdCategoryError] = useState("");

  const [adType, setAdType] = useState("");
  // const [adTypeError, setAdTypeError] = useState("");

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");

  const [condition, setCondition] = useState("");
  // const [conditionError, setConditionError] = useState("");

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [brand, setBrand] = useState("");
  // const [brandError, setBrandError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [youtubeLink, setYoutubeLink] = useState("");
  // const [youtubeLinkError, setYoutubeLinkError] = useState("");

  const [image1, setImage1] = useState("");
  // const [image1Error, setImage1Error] = useState("");

  const [image2, setImage2] = useState("");
  // const [image2Error, setImage2Error] = useState("");

  const [image3, setImage3] = useState("");
  // const [image3Error, setImage3Error] = useState("");

  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState("");

  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "adName":
        setAdName(value);
        setAdNameError("");
        break;

      case "adCategory":
        setAdCategory(value);
        setAdCategoryError("");
        break;

      case "adType":
        setAdType(value);
        // setAdTypeError("");
        break;

      case "location":
        setLocation(value);
        setLocationError("");
        break;

      case "condition":
        setCondition(value);
        // setConditionError("");
        break;

      case "price":
        setPrice(value);
        setPriceError("");
        break;

      case "brand":
        setBrand(value);
        // setBrandError("");
        break;

      case "description":
        setDescription(value);
        setDescriptionError("");
        break;

      case "youtubeLink":
        setYoutubeLink(value);
        // setYoutubeLinkError("");
        break;

      case "image1":
        setImage1(value);
        // setImage1Error("");
        break;

      case "image2":
        setImage2(value);
        // setImage2Error("");
        break;

      case "image3":
        setImage3(value);
        // setImage3Error("");
        break;

      case "duration":
        setDuration(value);
        setDurationError("");
        break;

      default:
        break;
    }
  };

  const DURATION_CHOICES = [
    ["1 day", "1 day (24 cps)"],
    ["2 days", "2 days (48 cps)"],
    ["3 days", "3 days (72 cps)"],
    ["5 days", "5 days (120 cps)"],
    ["1 week", "1 week (180 cps)"],
    ["2 weeks", "2 weeks (360 cps)"],
    ["1 month", "1 month (720 cps)"],
  ];

  const AD_CONDITION_CHOICES = [
    ["Brand New", "Brand New"],
    ["Fairly Used", "Fairly Used"],
  ];

  const AD_TYPE_CHOICES = [
    <p style={{ color: "red" }}>Choices for Home Appliances</p>,
    ["Washing Machine", "Washing Machine"],
    ["Refrigerator", "Refrigerator"],
    ["Microwave", "Microwave"],
    ["Coffee Machine", "Coffee Machine"],
    ["Air Conditioner", "Air Conditioner"],

    <hr />,
    // ... Choices for Properties
    ["House", "House"],
    ["Apartment", "Apartment"],
    ["Land", "Land"],
    ["Commercial Property", "Commercial Property"],

    <hr />,
    // ... Choices for Electronics
    ["Laptop", "Laptop"],
    ["Smartphone", "Smartphone"],
    ["Camera", "Camera"],
    ["Headphones", "Headphones"],
    ["Television", "Television"],

    <hr />,
    // ... Choices for Fashion
    ["Clothing", "Clothing"],
    ["Shoes", "Shoes"],
    ["Accessories", "Accessories"],

    // ... Choices for Vehicles
    ["Car", "Car"],
    ["Motorcycle", "Motorcycle"],
    ["Bicycle", "Bicycle"],

    <hr />,
    // ... Choices for Services
    ["Cleaning", "Cleaning"],
    ["Plumbing", "Plumbing"],
    ["Electrician", "Electrician"],
    ["Catering", "Catering"],
    ["Tutoring", "Tutoring"],

    // ... Choices for Mobile Phones
    ["iPhone", "iPhone"],
    ["Samsung", "Samsung"],
    ["Google Pixel", "Google Pixel"],
    ["OnePlus", "OnePlus"],

    // ... Choices for Health & Beauty
    ["Skincare", "Skincare"],
    ["Haircare", "Haircare"],
    ["Makeup", "Makeup"],
    ["Fitness Equipment", "Fitness Equipment"],

    <hr />,
    // ... Choices for Sports
    ["Soccer", "Soccer"],
    ["Basketball", "Basketball"],
    ["Tennis", "Tennis"],
    ["Golf", "Golf"],
    <hr />,

    // ... Choices for Jobs
    ["IT", "IT"],
    ["Sales", "Sales"],
    ["Marketing", "Marketing"],
    ["Administrative", "Administrative"],
    <hr />,

    // ... Choices for Babies and Kids
    ["Toys", "Toys"],
    ["Clothing Kids", "Clothing"],
    ["Strollers", "Strollers"],
    <hr />,

    // ... Choices for Agric & Food
    ["Farm Products", "Farm Products"],
    ["Processed Food", "Processed Food"],
    ["Beverages", "Beverages"],
    <hr />,

    // ... Choices for Repairs
    ["Electronic Repair", "Electronic Repair"],
    ["Appliance Repair", "Appliance Repair"],
    ["Car Repair", "Car Repair"],
    <hr />,

    // ... Choices for Equipment & Tools
    ["Power Tools", "Power Tools"],
    ["Hand Tools", "Hand Tools"],
    ["Kitchen Tools", "Kitchen Tools"],
    <hr />,

    // ... Choices for CVs
    ["Engineering", "Engineering"],
    ["Marketing CVs", "Marketing"],
    ["Design", "Design"],
    ["Education", "Education"],
    <hr />,

    // ... Choices for Pets
    ["Dog", "Dog"],
    ["Cat", "Cat"],
    ["Fish", "Fish"],
    ["Bird", "Bird"],
    <hr />,

    // ... Choices for Others
    ["Others", "Others"],
  ];

  const AD_CATEGORY_CHOICES = [
    ["Home Appliances", "Home Appliances"],
    ["Properties", "Properties"],
    ["Electronics", "Electronics"],
    ["Fashion", "Fashion"],
    ["Vehicles", "Vehicles"],
    ["Services", "Services"],
    ["Mobile Phones", "Mobile Phones"],
    ["Health & Beauty", "Health & Beauty"],
    ["Sports", "Sports"],
    ["Jobs", "Jobs"],
    ["Babies and Kids", "Babies and Kids"],
    ["Agric & Food", "Agric & Food"],
    ["Repairs", "Repairs"],
    ["Equipment & Tools", "Equipment & Tools"],
    ["CVs", "CVs"],
    ["Pets", "Pets"],
    ["Others", "Others"],
  ];

  const sellerData = new FormData();
  sellerData.append("ad_name", adName);
  sellerData.append("ad_category", adCategory);
  sellerData.append("ad_type", adType);
  sellerData.append("location", location);
  sellerData.append("condition", condition);
  sellerData.append("price", price);
  sellerData.append("brand", brand);
  sellerData.append("description", description);
  sellerData.append("youtube_link", youtubeLink);
  sellerData.append("image1", image1);
  sellerData.append("image2", image2);
  sellerData.append("image3", image3);
  sellerData.append("duration", duration);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/seller/bank");
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handlePostPaidAd = (e) => {
    e.preventDefault(e);

    if (!adName) {
      setAdNameError("Please enter the ad name.");
    } else {
      setAdNameError("");
    }

    if (!adCategory) {
      setAdCategoryError("Please select the ad category.");
    } else {
      setAdCategoryError("");
    }

    // if (!adType) {
    //   setAdTypeError("Please enter the ad  type.");
    // } else {
    //   setAdTypeError("");
    // }

    if (!location) {
      setLocationError("Please enter ad location.");
    } else {
      setLocationError("");
    }

    // if (!condition) {
    //   setConditionError("Please enter ad condtion.");
    // } else {
    //   setPriceError("");
    // }

    if (!price) {
      setPriceError("Please enter ad price.");
    } else {
      setPriceError("");
    }

    if (!description) {
      setDescriptionError("Please enter the description.");
    } else {
      setDescriptionError("");
    }

    if (!duration) {
      setDurationError("Please select the ad duration.");
    } else {
      setDurationError("");
    }

    if (
      !adName ||
      !adCategory ||
      // !adType ||
      !location ||
      // !condition ||
      !price ||
      !description ||
      !duration
    ) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      dispatch(postPaidAd(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Promoted Ad</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Ad created successfully.
            </Message>
          )}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}
          {formError && (
            <Message variant="danger" fixed>
              {formError}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Ad Name</Form.Label>
              <Form.Control
                type="text"
                value={adName}
                onChange={(e) => handleFieldChange("adName", e.target.value)}
                placeholder="Enter the ad name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{adNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Category</Form.Label>
              <Form.Control
                as="select"
                value={adCategory}
                onChange={(e) =>
                  handleFieldChange("adCategory", e.target.value)
                }
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Category</option>
                {AD_CATEGORY_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{adCategoryError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Type</Form.Label>
              <Form.Control
                as="select"
                value={adType}
                onChange={(e) => handleFieldChange("adType", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Type</option>
                {AD_TYPE_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              {/* <Form.Text className="text-danger">{adTypeError}</Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => handleFieldChange("location", e.target.value)}
                placeholder="Enter the ad location"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{locationError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Condition</Form.Label>
              <Form.Control
                as="select"
                value={condition}
                onChange={(e) => handleFieldChange("condition", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Condition</option>
                {AD_CONDITION_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              {/* <Form.Text className="text-danger">{conditionError}</Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => handleFieldChange("price", e.target.value)}
                placeholder="Enter price"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{priceError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => handleFieldChange("brand", e.target.value)}
                placeholder="Enter ad brand"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
              {/* <Form.Text className="text-danger">{brandError}</Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{descriptionError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Youtube Link</Form.Label>
              <Form.Control
                type="text"
                value={youtubeLink}
                onChange={(e) =>
                  handleFieldChange("youtubeLink", e.target.value)
                }
                placeholder="Enter ad Youtube link"
                className="rounded py-2 mb-2"
                maxLength={225}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 1</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image1", e.target.files[0])}
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 2</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image2", e.target.files[0])}
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 3</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image3", e.target.files[0])}
                placeholder="Upload proof of address"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                as="select"
                value={duration}
                onChange={(e) => handleFieldChange("duration", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Duration</option>
                {DURATION_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{durationError}</Form.Text>
            </Form.Group>
          </Form>
          <Button
            variant="success"
            onClick={handlePostPaidAd}
            className="rounded py-2 mb-2 text-center w-100"
            disabled={loading || success}
          >
            <div className="d-flex justify-content-center">
              <span className="py-1">Post Ad</span>
              {loading && <LoaderButton />}
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
 
export default PostPaidAd;
