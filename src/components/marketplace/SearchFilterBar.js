// SearchFilterBar.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./FilterBar.css";

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

const AD_TYPE_CHOICES = {
  "Home Appliances": [
    ["Washing Machine", "Washing Machine"],
    ["Refrigerator", "Refrigerator"],
    ["Microwave", "Microwave"],
    ["Coffee Machine", "Coffee Machine"],
    ["Air Conditioner", "Air Conditioner"],
    ["Solar", "Solar"],
    ["Kitchen Appliances", "Kitchen Appliances"],
  ],
  Properties: [
    ["House", "House"],
    ["Apartment", "Apartment"],
    ["Land", "Land"],
    ["Commercial Property", "Commercial Property"],
  ],
  Electronics: [
    ["Laptop", "Laptop"],
    ["Smartphone", "Smartphone"],
    ["Camera", "Camera"],
    ["Headphones", "Headphones"],
    ["Television", "Television"],
  ],
  Fashion: [
    ["Clothing", "Clothing"],
    ["Shoes", "Shoes"],
    ["Accessories", "Accessories"],
  ],
  Vehicles: [
    ["Car", "Car"],
    ["Motorcycle", "Motorcycle"],
    ["Bicycle", "Bicycle"],
  ],
  Services: [
    ["Cleaning", "Cleaning"],
    ["Plumbing", "Plumbing"],
    ["Electrician", "Electrician"],
    ["Catering", "Catering"],
    ["Tutoring", "Tutoring"],
  ],
  "Mobile Phones": [
    ["iPhone", "iPhone"],
    ["Samsung", "Samsung"],
    ["Google Pixel", "Google Pixel"],
    ["OnePlus", "OnePlus"],
  ],
  "Health & Beauty": [
    ["Skincare", "Skincare"],
    ["Haircare", "Haircare"],
    ["Makeup", "Makeup"],
    ["Fitness Equipment", "Fitness Equipment"],
  ],
  Sports: [
    ["Soccer", "Soccer"],
    ["Basketball", "Basketball"],
    ["Tennis", "Tennis"],
    ["Golf", "Golf"],
  ],
  Jobs: [
    ["IT", "IT"],
    ["Sales", "Sales"],
    ["Marketing", "Marketing"],
    ["Administrative", "Administrative"],
  ],
  "Babies and Kids": [
    ["Toys", "Toys"],
    ["Clothing Kids", "Clothing"],
    ["Strollers", "Strollers"],
  ],
  "Agric & Food": [
    ["Farm Products", "Farm Products"],
    ["Processed Food", "Processed Food"],
    ["Beverages", "Beverages"],
  ],
  Repairs: [
    ["Electronic Repair", "Electronic Repair"],
    ["Appliance Repair", "Appliance Repair"],
    ["Car Repair", "Car Repair"],
  ],
  "Equipment & Tools": [
    ["Power Tools", "Power Tools"],
    ["Hand Tools", "Hand Tools"],
    ["Kitchen Tools", "Kitchen Tools"],
  ],
  CVs: [
    ["Engineering", "Engineering"],
    ["Marketing CVs", "Marketing"],
    ["Design", "Design"],
    ["Education", "Education"],
  ],
  Pets: [
    ["Dog", "Dog"],
    ["Cat", "Cat"],
    ["Fish", "Fish"],
    ["Bird", "Bird"],
  ],
  Others: [["Others", "Others"]],
};

function SearchFilterBar({
  freeSearchAds,
  paidSearchAds,
  selectedCategory,
  selectedType,
  setSelectedCategory,
  setSelectedType,
  onCategoryChange,
  onTypeChange,
}) {
  console.log("paidSearchAds length:", paidSearchAds?.length);
  console.log("freeSearchAds length:", freeSearchAds?.length);

  const [categoryCounts, setCategoryCounts] = useState({});
  const [typeCounts, setTypeCounts] = useState({});
  const [selectedTypeLabel, setSelectedTypeLabel] = useState("");

  useEffect(() => {
    const categoryCountsObj = {};
    AD_CATEGORY_CHOICES.forEach(([value]) => {
      const filteredFreeAds = freeSearchAds?.filter((ad) => ad.ad_category === value);
      const filteredPaidAds = paidSearchAds?.filter((ad) => ad.ad_category === value);
      categoryCountsObj[value] = {
        freeSearchAdsCount: filteredFreeAds?.length,
        paidSearchAdsCount: filteredPaidAds?.length,
      };
    });
    setCategoryCounts(categoryCountsObj);

    const typeCountsObj = {};
    Object.keys(AD_TYPE_CHOICES).forEach((category) => {
      AD_TYPE_CHOICES[category].forEach(([value]) => {
        const filteredFreeAds = freeSearchAds?.filter(
          (ad) => ad.ad_category === category && ad.ad_type === value
        );
        const filteredPaidAds = paidSearchAds?.filter(
          (ad) => ad.ad_category === category && ad.ad_type === value
        );
        typeCountsObj[value] = {
          freeSearchAdsCount: filteredFreeAds?.length,
          paidSearchAdsCount: filteredPaidAds?.length,
        };
      });
    });
    setTypeCounts(typeCountsObj);
  }, [freeSearchAds, paidSearchAds]);

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    const storedType = localStorage.getItem("selectedType");

    if (storedCategory && storedType) {
      setSelectedCategory(storedCategory);
      setSelectedType(storedType);
    }
  }, [setSelectedCategory, setSelectedType]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedType(null);

    const filteredFreeAds = freeSearchAds?.filter(
      (ad) => ad.ad_category === category
    );
    const filteredPaidAds = paidSearchAds?.filter(
      (ad) => ad.ad_category === category
    );
    onCategoryChange(category, filteredFreeAds, filteredPaidAds);

    localStorage.setItem("selectedCategory", category);
    localStorage.removeItem("selectedType");
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedTypeLabel(type.label);

    const filteredFreeAds = freeSearchAds?.filter(
      (ad) => ad.ad_category === selectedCategory && ad.ad_type === type.value
    );
    const filteredPaidAds = paidSearchAds?.filter(
      (ad) => ad.ad_category === selectedCategory && ad.ad_type === type.value
    );

    console.log("filteredFreeAds after type change:", filteredFreeAds);
    console.log("filteredPaidAds after type change:", filteredPaidAds);

    onTypeChange(type.value, filteredFreeAds, filteredPaidAds);

    localStorage.setItem("selectedType", type.value);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          <div>
            <ScrollMenu>
              {AD_CATEGORY_CHOICES.map(([value, label]) => (
                <div
                  key={value}
                  className={`category-item ${
                    selectedCategory === value ? "active" : ""
                  }`}
                >
                  <Button
                    variant="outline-primary"
                    className={`rounded ${
                      selectedCategory === value ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(value)}
                  >
                    {label} (
                    {categoryCounts[value] &&
                      categoryCounts[value].freeSearchAdsCount +
                        categoryCounts[value].paidSearchAdsCount}
                    )
                  </Button>
                </div>
              ))}
            </ScrollMenu>
          </div>

          <div className="d-flex justify-content-center text-center py-2">
            <Row>
              <Col md={12}>
                {selectedCategory && (
                  <div>
                    <Select
                      options={AD_TYPE_CHOICES[selectedCategory].map(
                        ([value, label]) => ({
                          value,
                          label: `${label} (${typeCounts[value] &&
                            typeCounts[value].freeSearchAdsCount +
                              typeCounts[value].paidSearchAdsCount})`,
                        })
                      )}
                      value={selectedType}
                      onChange={(type) => {
                        handleTypeChange(type);
                      }}
                      placeholder={`Select Type (${selectedTypeLabel})`}
                      className="rounded py-2 mb-2"
                      required
                    />{" "}
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchFilterBar;
