import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import { editReview } from '../../actions/orderActions';

function EditReviewScreen({ history, match }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // const reviewId = match.params.reviewId; 

  const location = useLocation();
//   const { pathname } = location;
//   const order_id = pathname.split("/edit-review/")[1];
const query = new URLSearchParams(location.search);
  const reviewId = query.get('reviewId');
  console.log('reviewId:', reviewId)


  const reviewEdit = useSelector((state) => state.orderEditReview);
  const { loading, success, error } = reviewEdit;

  useEffect(() => {
    // Fetch the review details here and populate the fields
    // You might need to implement this based on your backend API structure
    // Example: dispatch(fetchReviewDetails(reviewId));
  }, [dispatch, reviewId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editReview(reviewId, rating, comment));
  };

  return (
    <div>
      <h2>Edit Review</h2>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <Message variant="success">Review updated successfully!</Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select...</option>
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
            row="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Update Review
        </Button>
      </Form>
    </div>
  );
}

export default EditReviewScreen;
