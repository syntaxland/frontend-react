// AddReviewScreen.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { addReview } from '../../actions/orderActions';
import Loader from '../Loader';
import Message from '../Message';

function AddReviewScreen({ match }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

//   const orderItemId = match.params._id; 
//   const { orderItemId } = match.params;
// const history = useHistory();
const location = useLocation();
//   const { pathname } = location;
//   const order_id = pathname.split("/payment/")[1];
const query = new URLSearchParams(location.search);
  const orderItemId = query.get('orderItemId');

    console.log('orderItemId:', orderItemId)
  const reviewAdd = useSelector((state) => state.orderAddReview);
  const { loading, success, error } = reviewAdd;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addReview(orderItemId, rating, comment));
  };

  return (
    <div>
      <h2>Add Review</h2>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <Message variant="success">Review added successfully.</Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit Review
        </Button>
      </Form>
    </div>
  );
}

export default AddReviewScreen;
