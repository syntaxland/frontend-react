// SearchScreen
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { addToFavorites, removeFromFavorites } from "../../actions/favoriteActions";
// import Message from "../Message";
import Rating from "../Rating";

const API_URL = process.env.REACT_APP_API_URL;

function SearchScreen() {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const favorites = useSelector((state) => state.favorites);
  const { favoriteItems } = favorites;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/api/products/search/?search=${keyword}`
        );
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  const toggleCartHandler = (product) => {
    const isInCart = cartItems.some((item) => item.product === product._id);
    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart(product._id, 1));
    }
  };

  const toggleFavoriteHandler = (product) => {
    const isFavorite = favoriteItems.find((item) => item._id === product._id);
    if (isFavorite) {
      dispatch(removeFromFavorites(product._id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div>
      <h1>Search Results for "{keyword}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
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
                    {product.countInStock === 0
                      ? "Out of Stock"
                      : cartItems.some((item) => item.product === product._id)
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </Button>

                  <Button
                    onClick={() => toggleFavoriteHandler(product)}
                    className="btn-block mt-3"
                    type="button"
                    variant={
                      favoriteItems.find((item) => item._id === product._id)
                        ? "danger"
                        : "outline-danger"
                    }
                  >
                    <i
                      className={
                        favoriteItems.find((item) => item._id === product._id)
                          ? "fas fa-heart"
                          : "far fa-heart"
                      }
                    ></i>{" "}
                    {favoriteItems.find((item) => item._id === product._id)
                      ? "Saved"
                      : "Save"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default SearchScreen;

// import React, { useEffect, useState } from "react";
// import { Row, Col, Card } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// // import showNotification from "../../App"; 

// const API_URL = process.env.REACT_APP_API_URL;

// function SearchScreen() {
//   const { keyword } = useParams();
//   // const { id: keyword } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`${API_URL}/api/products/search/?search=${keyword}`); 
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [keyword]);

//   return (
//     <div>
//       <h1>Search Results for "{keyword}"</h1> 
//       {loading ? (
//         <p>Loading...</p>
//       ) : products.length === 0 ? (
//         <p>No products found.</p>
//         // showNotification("No products found.", "warning")
//       ) : (
//         <Row>
//           {products.map((product) => (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//               <Card>
//               <Card.Img variant="top" src={product.image} />
//                 <Card.Body>
//                   <Card.Title>{product.name}</Card.Title>
//                   <Card.Text>{product.description}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// }

// export default SearchScreen;
