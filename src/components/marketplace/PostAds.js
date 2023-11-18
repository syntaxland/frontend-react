// PostAds.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { createFeedback } from "../../actions/feedbackActions";

import Loader from "../Loader";
import Message from "../Message";

function PostAds({ history }) {
  //   const dispatch = useDispatch();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const feedbackCreate = useSelector((state) => state.feedbackCreate);
  const { loading, success, error } = feedbackCreate;

  const submitHandler = (e) => {
    e.preventDefault();

    // const feedbackData = {
    //   subject: subject,
    //   category: category,
    //   message: message,
    // };

    // dispatch(createFeedback(feedbackData));
  };

  // useEffect(() => {
  //   if (!userInfo) {
  //     // Redirect to login or handle unauthorized access
  //   }
  // }, [dispatch, userInfo]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Post Ads</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Ads submitted successfully.</Message>
          )}
          <Form onSubmit={submitHandler}>
          <Form.Group controlId="subject">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={80}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="support">Home Appliances</option>
                <option value="billing">Properties</option>
                <option value="abuse">Electronics</option>
                <option value="otp">Fashion</option>
                <option value="payment">Vehicles</option>
                <option value="services">Services</option>
                <option value="credit_points">Mobile Phones</option>
                <option value="referrals">Health & Beauty</option>
                <option value="others">Sports</option>
                <option value="others">Jobs</option>
                <option value="others">Babies and Kids</option>
                <option value="others">Agric & Food</option>
                <option value="others">Repairs</option>
                <option value="others">Equipment & Tools</option>
                <option value="others">CVs</option>
                <option value="others">Pets</option>
                <option value="others">Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="support">Home Appliances</option>
                <option value="billing">Properties</option>
                <option value="abuse">Electronics</option>
                <option value="otp">Fashion</option>
                <option value="payment">Vehicles</option>
                <option value="services">Services</option>
                <option value="credit_points">Mobile Phones</option>
                <option value="referrals">Health & Beauty</option>
                <option value="others">Sports</option>
                <option value="others">Jobs</option>
                <option value="others">Babies and Kids</option>
                <option value="others">Agric & Food</option>
                <option value="others">Repairs</option>
                <option value="others">Equipment & Tools</option>
                <option value="others">CVs</option>
                <option value="others">Pets</option>
                <option value="others">Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={80}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Type</Form.Label>
              <Form.Control
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Condition</Form.Label>
              <Form.Control
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={2}
                value={message}
                maxLength={250}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Image</Form.Label>
              <Form.Control
                required
                type="file"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Ads Campaign Duration</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="support">1 day</option>
                <option value="support">2 days</option>
                <option value="support">3 days</option>
                <option value="support">5 day</option>
                <option value="billing">1 week</option> 
                <option value="billing">2 week</option> 
                <option value="abuse">1 month</option>
              </Form.Control>
            </Form.Group>

            <div className="py-2">
              <Button className="w-100 rounded" type="submit" variant="success">
                Post Ads
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default PostAds;
