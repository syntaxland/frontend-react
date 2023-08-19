// OrderItem.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderItems, getOrders } from "../../actions/orderActions";
import Loader from "../Loader";
import Message from "../Message";

function OrderItem() {
  const dispatch = useDispatch();

  const orderItemsList = useSelector((state) => state.orderItemsList);
  const { loading, error, orderItems } = orderItemsList;

  useEffect(() => {
    dispatch(listOrderItems()); // Dispatch an action to fetch order items
  }, [dispatch]);

  return (
    <div>
      <h1>Order Items</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              {/* Define table headers here */}
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item._id}>
                {/* Populate table cells with item details */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderItem;


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button, Form, Row, Col } from 'react-bootstrap';
// import { addReview } from '../actions/reviewActions';

// const OrderItem = ({ orderItem }) => {
//   // ... existing code for order item display
//   const dispatch = useDispatch();

//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const submitReviewHandler = (e) => {
//     e.preventDefault();
//     // Dispatch the addReview action
//     dispatch(addReview(orderItem.product, { rating, comment }));
//     // Clear form fields after submission
//     setRating(0);
//     setComment('');
//   };

//   return (
//     <div>
//       {/* ... existing code for order item display */}
//       {orderItem.isPaid && (
//         <div>
//           <Button
//             variant="primary"
//             onClick={() => setShowReviewForm(!showReviewForm)}
//           >
//             {showReviewForm ? 'Cancel' : 'Add Review'}
//           </Button>
//           {showReviewForm && (
//             <Form onSubmit={submitReviewHandler}>
//               <Form.Group controlId="rating">
//                 <Form.Label>Rating</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={rating}
//                   onChange={(e) => setRating(e.target.value)}
//                 >
//                   {/* Options for ratings */}
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group controlId="comment">
//                 <Form.Label>Comment</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   row={3}
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 ></Form.Control>
//               </Form.Group>
//               <Button type="submit" variant="primary">
//                 Submit Review
//               </Button>
//             </Form>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderItem;
