import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  addToFavorites,
  removeFromFavorites,
} from "../actions/favoriteActions";

function Product({ product }) {
  const dispatch = useDispatch();
  const [addToCartMessage, setAddToCartMessage] = useState(false);
  const [removeFromCartMessage, setRemoveFromCartMessage] = useState(false);
  const [addToFavoritesMessage, setAddToFavoritesMessage] = useState(false);
  const [removeFromFavoritesMessage, setRemoveFromFavoritesMessage] =
    useState(false);

  const favorites = useSelector((state) => state.favorites);
  const { favoriteItems } = favorites;
  const isFavorite = favoriteItems.find((item) => item._id === product._id);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const [isCart, setIsCart] = useState(
    cartItems.some((item) => item.product === product._id)
  );

  const toggleCartHandler = () => {
    if (isCart) {
      dispatch(removeFromCart(product._id));
      setIsCart(false);
      setRemoveFromCartMessage(true);
      setTimeout(() => {
        setRemoveFromCartMessage(false);
      }, 3000);
    } else {
      dispatch(addToCart(product._id, qty));
      setIsCart(true);
      setAddToCartMessage(true);
      setTimeout(() => {
        setAddToCartMessage(false);
      }, 3000);
    }
  };

  const toggleFavoriteHandler = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product._id));
      setRemoveFromFavoritesMessage(true);
      setTimeout(() => {
        setRemoveFromFavoritesMessage(false);
      }, 3000);
    } else {
      dispatch(addToFavorites(product));
      setAddToFavoritesMessage(true);
      setTimeout(() => {
        setAddToFavoritesMessage(false);
      }, 3000);
    }
  };

  return (
    <Card className="my-3 p-3 rounded">
      {addToCartMessage && (
        <Message variant="success">Item added to cart.</Message>
      )}
      {removeFromCartMessage && (
        <Message variant="success">Item removed from cart.</Message>
      )}
      {addToFavoritesMessage && (
        <Message variant="success">Item added to favorites.</Message>
      )}
      {removeFromFavoritesMessage && (
        <Message variant="danger">Item removed from favorites.</Message>
      )}

      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"yellow"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">NGN{product.price}</Card.Text>

        <Button
          onClick={toggleCartHandler}
          className="btn-block"
          type="button"
          // variant={isCart ? "danger" : "primary"}
          disabled={product.countInStock === 0}
        >
          {product.countInStock === 0
            ? "Out of Stock"
            : isCart
            ? "Remove from Cart"
            : "Add to Cart"}
        </Button>

        <Button
          onClick={toggleFavoriteHandler}
          className="btn-block mt-3"
          type="button"
          variant={isFavorite ? "danger" : "outline-danger"}
        >
          <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>{" "}
          {isFavorite ? "Saved" : "Save"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;

// import React from "react";
// import { Card, Button } from "react-bootstrap";
// import Rating from "../components/Rating";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../actions/cartActions";

// function Product({ product }) {
//   const dispatch = useDispatch();

//   const addToCartHandler = () => {
//     dispatch(addToCart(product._id));
//   };

//   return (
//     <Card className="my-3 p-3 rounded">
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={product.image} />
//       </Link>

//       <Card.Body>
//         <Link to={`/product/${product._id}`}>
//           <Card.Title as="div">
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>

//         <Card.Text as="div">
//           <div className="my-3">
//             <Rating
//               value={product.rating}
//               text={`${product.numReviews} reviews`}
//               color={"yellow"}
//             />
//           </div>
//         </Card.Text>

//         <Card.Text as="h3">NGN{product.price}</Card.Text>

//         <Button
//           onClick={addToCartHandler}
//           className="btn-block"
//           type="button"
//           variant="primary"
//           disabled={product.countInStock === 0}
//         >
//           {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default Product;

// import React from "react";
// import { Card } from "react-bootstrap";
// import Rating from "../components/Rating";
// import {Link} from "react-router-dom";

// function Product({ product }) {
//   return (
//     <Card className="my-3 p-3 rounded">
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={product.image} />
//       </Link>

//       <Card.Body>
//         <Link to={`/product/${product._id}`}>
//           <Card.Title as="div">
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>

//         <Card.Text as="div">
//             <div className="my-3">
//                 {product.rating} from {product.numReviews} reviews
//             </div>
//         </Card.Text>

//         <Card.Text as="h3">
//             NGN{product.price}
//         </Card.Text>

//         <Rating
//                 value={product.rating}
//                 text={`${product.numReviews} reviews`}
//                 color={"yellow"}
//               />
//       </Card.Body>

//     </Card>
//   );
// }

// export default Product;
