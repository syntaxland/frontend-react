// CheckoutScreen.js
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { createOrder } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function CheckoutScreen() {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [order_id, setOrderId] = useState("");
  const [paymentMethod] = useState("Paystack");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    const getOrderId = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/get-order-id/`, {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        });
        setOrderId(response.data.order_id);
      } catch (error) {
        console.log(error);
      }
    };

    getOrderId();
  }, [userInfo.access]);

  const shippingPrice = cartItems.length > 0 ? 1000 : 0;
  const taxPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price * 0.03,
    0
  );
  const totalPrice =
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) +
    shippingPrice +
    taxPrice;

  const createdAt = new Date().toISOString();
  // const createdAt = new Date().toLocaleString()


  const createOrderHandler = async () => {
    const orderItems = cartItems.map((item) => ({
      product: item.product,
      name: item.name,
      qty: item.qty,
      price: item.price,
      image: item.image,
    }));

    await dispatch(
      createOrder({
        orderItems,
        paymentMethod,
        itemsPrice: cartItems.reduce(
          (acc, item) => acc + item.qty * item.price,
          0
        ),
        shippingPrice,
        taxPrice,
        totalPrice,
        order_id,
        createdAt,
      })
    ).catch((error) => {
      console.log("Error creating order:", error);
      throw error;
    });

    history.push(`/shipment/${order_id}`);
  };

  return (
    <Row>
      <div className="d-flex justify-content-center">
        <Col md={6}>
          <h1 className="text-center py-2">Order Summary</h1>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={4}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={8}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <p>
                      {item.qty} x NGN {item.price} = NGN{" "}
                      {item.qty * item.price}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>Order ID: {order_id}</ListGroup.Item>
            <ListGroup.Item>Payment Method: {paymentMethod}</ListGroup.Item>
            <ListGroup.Item>Shipping Cost: NGN {shippingPrice}</ListGroup.Item>
            <ListGroup.Item>Tax: NGN {taxPrice}</ListGroup.Item>
            <ListGroup.Item>Total Amount: NGN {totalPrice}</ListGroup.Item>
            <ListGroup.Item>Timestamp: {createdAt}</ListGroup.Item>
          </ListGroup>

          <div className="text-center py-2">
            <Button
              type="button"
              variant="primary"
              onClick={createOrderHandler}
            >
              Continue to Shipment
            </Button>
          </div>
        </Col>
      </div>
    </Row>
  );
}

export default CheckoutScreen;

// import React, { useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { createOrder } from "../../actions/orderActions";
// import { saveShippingAddress } from "../../actions/cartActions";
// // import { saveShipment } from "../../actions/orderActions";
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

// function Checkout() {
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems, shippingAddress } = cart;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const [order_id, setOrderId] = useState("");
//   const [paymentMethod] = useState("Paystack");

//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [country, setCountry] = useState("");

//   // const [address, setAddress] = useState(shippingAddress.address || '');
//   // const [city, setCity] = useState(shippingAddress.city || '');
//   // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
//   // const [country, setCountry] = useState(shippingAddress.country || '');

//   useEffect(() => {
//     if (!userInfo) {
//       history.push("/login");
//     }
//   }, [userInfo, history]);

//   useEffect(() => {
//     const getOrderId = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/get-order-id/`, {
//           headers: {
//             Authorization: `Bearer ${userInfo.access}`,
//           },
//         });
//         setOrderId(response.data.order_id);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getOrderId();
//   }, [userInfo.access]);

//   const shippingPrice = cartItems.length > 0 ? 1000 : 0;
//   const taxPrice = cartItems.reduce(
//     (acc, item) => acc + item.qty * item.price * 0.03,
//     0
//   );
//   const totalPrice =
//     cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) +
//     shippingPrice +
//     taxPrice;

//   const createdAt = new Date().toISOString();

//   const placeOrderHandler = () => {
//     const orderItems = cartItems.map((item) => ({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       price: item.price,
//       image: item.image,
//     }));

//     return dispatch(
//       createOrder({
//         orderItems,
//         shippingAddress,
//         paymentMethod,
//         itemsPrice: cartItems.reduce(
//           (acc, item) => acc + item.qty * item.price,
//           0
//         ),
//         shippingPrice,
//         taxPrice,
//         totalPrice,
//         order_id,
//         createdAt,
//       })
//     ).catch((error) => {
//       console.log("Error creating order:", error);
//       throw error;
//     });
//   };

//   // const submitHandler = (e) => {
//   //   e.preventDefault();

//   //   console.log("Address:", address);
//   //   console.log("City:", city);
//   //   console.log("Postal Code:", postalCode);
//   //   console.log("Country:", country);

//   //   dispatch(saveShippingAddress({ address, city, postalCode, country }));
//   //   placeOrderHandler();
//   //   history.push(`/payment/${order_id}`);
//   // };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     placeOrderHandler();

//     console.log("Address:", address);
//     console.log("City:", city);
//     console.log("Postal Code:", postalCode);
//     console.log("Country:", country);

//     // const shipmentData = {
//     //   address,
//     //   city,
//     //   postalCode,
//     //   country,
//     //   order_id,
//     //   shippingPrice,
//     // };

//     try {
//       await dispatch(
//         // saveShipment(shipmentData),
//         saveShippingAddress({ address, city, postalCode, country })
//       );
//     } catch (error) {
//       console.log("Shipping address not dispatched.", error);
//     }

//     history.push(`/payment/${order_id}`);
//   };

//   return (
//     <Row>
//       <Col md={6}>
//         <h1>Order Summary</h1>
//         <ListGroup variant="flush">
//           {cartItems.map((item) => (
//             <ListGroup.Item key={item.product}>
//               <Row>
//                 <Col md={4}>
//                   <Image src={item.image} alt={item.name} fluid />
//                 </Col>
//                 <Col md={8}>
//                   <Link to={`/product/${item.product}`}>{item.name}</Link>
//                   <p>
//                     {item.qty} x NGN {item.price} = NGN {item.qty * item.price}
//                   </p>
//                 </Col>
//               </Row>
//             </ListGroup.Item>
//           ))}
//           <ListGroup.Item>Order ID: {order_id}</ListGroup.Item>
//           <ListGroup.Item>Payment Method: {paymentMethod}</ListGroup.Item>
//           <ListGroup.Item>Shipping Cost: NGN {shippingPrice}</ListGroup.Item>
//           <ListGroup.Item>Tax: NGN {taxPrice}</ListGroup.Item>
//           <ListGroup.Item>Total Amount: NGN {totalPrice}</ListGroup.Item>
//           <ListGroup.Item>Timestamp: {createdAt}</ListGroup.Item>
//         </ListGroup>
//       </Col>

//       <Col md={6}>
//         <h1>Shipping</h1>
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId="address">
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter address"
//               value={address}
//               required
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="city">
//             <Form.Label>City</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter city"
//               value={city}
//               required
//               onChange={(e) => setCity(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="postalCode">
//             <Form.Label>Postal Code</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter postal code"
//               value={postalCode}
//               required
//               onChange={(e) => setPostalCode(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="country">
//             <Form.Label>Country</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter country"
//               value={country}
//               required
//               onChange={(e) => setCountry(e.target.value)}
//             />
//           </Form.Group>
//           <Button type="submit" variant="primary">
//             Continue to Payment
//           </Button>
//         </Form>
//       </Col>
//     </Row>
//   );
// }

// export default Checkout;
