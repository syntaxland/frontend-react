// Review.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../actions/reviewActions";
import Message from "../Message";
import Loader from "../Loader";

function AddReview({ product }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch(addReview(product._id, { rating, comment }));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSubmitting(false);
    }, 3000);
  };

  return (
    <div>
      <h2>Add Review</h2>
      {success && <Message variant="success">Review added successfully</Message>}
      {submitting && <Loader />}
      <form onSubmit={submitHandler}>
        {/* Rating input */}
        {/* Comment input */}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default AddReview;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Row, Col } from 'react-bootstrap';

// const Reviews = ({ product }) => {
//   const reviewAdd = useSelector((state) => state.reviewAdd);
//   const { success: successReviewAdd, review } = reviewAdd;

//   return (
//     <div>
//       {/* ... existing code for product details */}
//       <Row>
//         <Col md={6}>
//           <h2>Reviews</h2>
//           {/* Display existing reviews */}
//           {/* ... */}
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Reviews;
