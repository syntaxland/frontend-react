// EditFreeAd.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  editFreeAd,
  getFreeAdDetail,
} from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";

function EditFreeAd({ history, match }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const { ads } = getFreeAdDetailState;
  console.log("Paid Ads:", ads);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getFreeAdDetail(match.params.id));
  }, [dispatch, match]);

  const editFreeAdState = useSelector((state) => state.editFreeAdState);
  const { success, error, loading } = editFreeAdState;

  const [editAdChanges, setEditAdChanges] = useState(false);
  const [editAdData, setEditAdData] = useState({
    ad_name: "",
    ad_category: "",
    ad_type: "",
    location: "",
    condition: "",
    price: "",
    brand: "",
    description: "",
    youtube_link: "",
    image1: "",
    image2: "",
    image3: "",
    duration: "",
    promo_code: "",
    discount_percentage: "",
    count_in_stock: "",
    is_price_negotiable: "",
    is_auto_renewal: "",
  });

  useEffect(() => {
    if (ads) {
      setEditAdData({
        ad_name: ads?.ad_name,
        ad_category: ads?.ad_category,
        ad_type: ads?.ad_type,
        location: ads?.location,
        condition: ads?.condition,
        price: ads?.price,
        brand: ads?.brand,
        description: ads?.description,
        youtube_link: ads?.youtube_link,
        image1: ads?.image1,
        image2: ads?.image2,
        image3: ads?.image3,
        duration: ads?.duration,
        promo_code: ads?.promo_code,
        discount_percentage: ads?.discount_percentage,
        count_in_stock: ads?.count_in_stock,
        is_price_negotiable: ads?.is_price_negotiable,
        is_auto_renewal: ads?.is_auto_renewal,
      });
      setEditAdChanges(false);
    }
  }, [ads]);

  // const handleEditAdChanges = (e) => {
  //   const { name, value, files, checked } = e.target;
  //   if (files) {
  //     setEditAdData({ ...editAdData, [name]: files[0] });
  //   } else if (checked) {
  //     setEditAdData({ ...editAdData, [name]: checked });
  //   } else {
  //     setEditAdData({ ...editAdData, [name]: value });
  //   }
  //   setEditAdChanges(true);
  // };

  const handleEditAdChanges = (e) => {
    const { name, value, files, checked } = e.target;
  
    if (name === "is_price_negotiable" || name === "is_auto_renewal") {
      setEditAdData({ ...editAdData, [name]: checked });
    } else if (files) {
      setEditAdData({ ...editAdData, [name]: files[0] });
    } else {
      setEditAdData({ ...editAdData, [name]: value });
    }
  
    setEditAdChanges(true);
  };

  const handleEditAd = () => {
    const editAdFormData = new FormData();

    editAdFormData.append("ad_name", editAdData.ad_name);
    editAdFormData.append("ad_category", editAdData.ad_category);
    editAdFormData.append("ad_type", editAdData.ad_type);
    editAdFormData.append("location", editAdData.location);
    editAdFormData.append("condition", editAdData.condition);
    editAdFormData.append("price", editAdData.price);
    editAdFormData.append("brand", editAdData.brand);
    editAdFormData.append("description", editAdData.description);
    editAdFormData.append("youtube_link", editAdData.youtube_link);
    editAdFormData.append("duration", editAdData.duration);
    editAdFormData.append("promo_code", editAdData.promo_code);
    editAdFormData.append(
      "discount_percentage",
      editAdData.discount_percentage
    );
    editAdFormData.append("count_in_stock", editAdData.count_in_stock);
    editAdFormData.append(
      "is_price_negotiable",
      editAdData.is_price_negotiable
    );
    editAdFormData.append("is_auto_renewal", editAdData.is_auto_renewal);
    editAdFormData.append("ad_id", id);

    if (editAdFormData.image1 instanceof File) {
      editAdFormData.append("image1", editAdFormData.image1);
    }

    if (editAdFormData.image2 instanceof File) {
      editAdFormData.append("image2", editAdFormData.image2);
    }

    if (editAdFormData.image3 instanceof File) {
      editAdFormData.append("image3", editAdFormData.image3);
    }

    console.log("editAdFormData:", editAdFormData);

    dispatch(editFreeAd(editAdFormData));
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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard/marketplace/sellers");
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Edit Ad</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Ad updated successfully.
            </Message>
          )}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Ad Name</Form.Label>
              <Form.Control
                type="text"
                name="ad_name"
                value={editAdData.ad_name}
                onChange={handleEditAdChanges}
                placeholder="Enter the ad name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Category</Form.Label>
              <Form.Control
                as="select"
                name="ad_category"
                value={editAdData.ad_category}
                onChange={handleEditAdChanges}
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
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Type</Form.Label>
              <Form.Control
                as="select"
                name="ad_type"
                value={editAdData.ad_type}
                onChange={handleEditAdChanges}
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
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={editAdData.location}
                onChange={handleEditAdChanges}
                placeholder="Enter the ad location"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Condition</Form.Label>
              <Form.Control
                as="select"
                name="condition"
                value={editAdData.condition}
                onChange={handleEditAdChanges}
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
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editAdData.price}
                onChange={handleEditAdChanges}
                placeholder="Enter price"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is Price Negotiable?"
                name="is_price_negotiable"
                checked={editAdData.is_price_negotiable}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={editAdData.brand}
                onChange={handleEditAdChanges}
                placeholder="Enter ad brand"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editAdData.description}
                onChange={handleEditAdChanges}
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Youtube Link</Form.Label>
              <Form.Control
                type="text"
                name="youtube_link"
                value={editAdData.youtube_link}
                onChange={handleEditAdChanges}
                placeholder="Enter ad Youtube link"
                className="rounded py-2 mb-2"
                maxLength={225}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Promo Code</Form.Label>
              <Form.Control
                type="text"
                name="promo_code"
                value={editAdData.promo_code}
                onChange={handleEditAdChanges}
                placeholder="Enter ad promo code"
                className="rounded py-2 mb-2"
                maxLength={10}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="number"
                name="discount_percentage"
                value={editAdData.discount_percentage}
                onChange={handleEditAdChanges}
                placeholder="Enter ad discount percentage"
                className="rounded py-2 mb-2"
                maxLength={4}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Number In Stock</Form.Label>
              <Form.Control
                type="number"
                name="count_in_stock"
                value={editAdData.count_in_stock}
                onChange={handleEditAdChanges}
                placeholder="Enter number of ad in stock"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 1</Form.Label>
              <div className="py-2">
                {ads?.image1 && (
                  <img
                    src={ads?.image1}
                    alt="Image1"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                name="image1"
                onChange={handleEditAdChanges}
                placeholder="Upload the ID Card Photoname"
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 2</Form.Label>
              <div className="py-2">
                {ads?.image2 && (
                  <img
                    src={ads?.image2}
                    alt="image2"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                name="image2"
                onChange={handleEditAdChanges}
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 3</Form.Label>
              <div className="py-2">
                {ads?.image3 && (
                  <img
                    src={ads?.image3}
                    alt="image3"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                name="image3"
                onChange={handleEditAdChanges}
                placeholder="Upload proof of address"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                as="select"
                name="duration"
                value={editAdData.duration}
                onChange={handleEditAdChanges}
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
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Renewal Automatically?"
                name="is_auto_renewal"
                checked={editAdData.is_auto_renewal}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>
          </Form>
          <Button
            variant="success"
            onClick={handleEditAd}
            className="rounded py-2 mb-2 text-center w-100"
            disabled={!editAdChanges || loading || success}
          >
            <div className="d-flex justify-content-center">
              <span className="py-1">Update Ad</span>
              {loading && <LoaderButton />}
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default EditFreeAd;
