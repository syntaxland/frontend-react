// FavouritesScreen
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../../actions/favoriteActions";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Message from "../Message";
import Rating from "../Rating";
import { Button, Card, Row, Col } from "react-bootstrap";

function FavouritesScreen() {
  const favorites = useSelector((state) => state.favorites);
  const { favoriteItems } = favorites;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favoriteItems.slice(indexOfFirstItem, indexOfLastItem);

  const toggleCartHandler = (product) => {
    const isInCart = cartItems.some((item) => item.product === product._id);
    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart(product._id, 1));
    }
  };

  const removeFavoriteHandler = (id) => {
    dispatch(removeFromFavorites(id));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(favoriteItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1 className="text-center">Favorites</h1>
      {favoriteItems.length === 0 ? (
        <Message>Your favourites list is empty.{" "}
          <Link to="/">Add Favourites?</Link>
        </Message>
        
      ) : (
        <>
          <Row>
            {currentItems.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Card className="my-3 p-3 rounded">
                  <Link to={`/product/${product._id}`}>
                    <Card.Img
                      src={product.image}
                      style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
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
                      onClick={() => toggleCartHandler(product)}
                      className="btn-block"
                      type="button"
                      variant={
                        cartItems.some((item) => item.product === product._id)
                          ? "danger"
                          : "primary"
                      }
                      disabled={product.countInStock === 0}
                    >
                      {cartItems.some((item) => item.product === product._id)
                        ? "Remove from Cart"
                        : "Add to Cart"}
                    </Button>

                    <Button
                      onClick={() => removeFavoriteHandler(product._id)}
                      className="btn-block mt-3"
                      type="button"
                      variant="danger"
                    >
                      <i className="fas fa-heart"></i> Remove from Favorites
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button className="page-link" onClick={() => paginate(number)}>
                    {number}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default FavouritesScreen;


// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { removeFromFavorites } from "../../actions/favoriteActions";
// import { addToCart, removeFromCart } from "../../actions/cartActions";
// import Message from "../Message";
// import Rating from "../Rating";
// import { Button, Card } from "react-bootstrap";

// function FavouritesScreen() {
//   const favorites = useSelector((state) => state.favorites);
//   const { favoriteItems } = favorites;

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const dispatch = useDispatch();

//   const toggleCartHandler = (product) => {
//     const isInCart = cartItems.some((item) => item.product === product._id);
//     if (isInCart) {
//       dispatch(removeFromCart(product._id));
//     } else {
//       dispatch(addToCart(product._id, 1));
//     }
//   };

//   const removeFavoriteHandler = (id) => {
//     dispatch(removeFromFavorites(id));
//   };

//   return (
//     <div>
//       <h1>Favorites</h1>
//       {favoriteItems.length === 0 ? (
//         <Message>Your favorites list is empty</Message>
//       ) : (
//         <div>
//           {favoriteItems.map((product) => (
//             <Card key={product._id} className="my-3 p-3 rounded">
//               <Link to={`/product/${product._id}`}>
//                 <Card.Img src={product.image} />
//               </Link>

//               <Card.Body>
//                 <Link to={`/product/${product._id}`}>
//                   <Card.Title as="div">
//                     <strong>{product.name}</strong>
//                   </Card.Title>
//                 </Link>

//                 <Card.Text as="div">
//                   <div className="my-3">
//                     <Rating
//                       value={product.rating}
//                       text={`${product.numReviews} reviews`}
//                       color={"yellow"}
//                     />
//                   </div>
//                 </Card.Text>

//                 <Card.Text as="h3">NGN{product.price}</Card.Text>

//                 <Button
//                   onClick={() => toggleCartHandler(product)}
//                   className="btn-block"
//                   type="button"
//                   variant={
//                     cartItems.some((item) => item.product === product._id)
//                       ? ""
//                       : ""
//                   }
//                   disabled={product.countInStock === 0}
//                 >
//                   {cartItems.some((item) => item.product === product._id)
//                     ? "Remove from Cart"
//                     : "Add to Cart"}
//                 </Button>

//                 <Button
//                   onClick={() => removeFavoriteHandler(product._id)}
//                   className="btn-block mt-3"
//                   type="button"
//                   variant="danger"
//                 >
//                   <i className="fas fa-heart"></i> Remove from Favorites
//                 </Button>
//               </Card.Body>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default FavouritesScreen;



// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromFavorites } from "../../actions/favoriteActions";
// import { Link } from "react-router-dom";
// import Message from "../../components/Message";

// function FavouritesScreen() {
//   const favorites = useSelector((state) => state.favorites);
//   const { favoriteItems } = favorites;
//   const dispatch = useDispatch();

//   const removeFavoriteHandler = (id) => {
//     dispatch(removeFromFavorites(id));
//   };

//   return (
//     <div>
//       <h1>Favorites</h1>
//       {favoriteItems.length === 0 ? (
//         <Message>Your favorites list is empty</Message>
//       ) : (
//         <div>
//           {favoriteItems.map((item) => (
//             <div key={item._id}>
//               <Link to={`/product/${item._id}`}>{item.name}</Link>
//               <button onClick={() => removeFavoriteHandler(item._id)}>
//                 Remove Item
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default FavouritesScreen;
