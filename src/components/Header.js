import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [keyword, setKeyword] = useState("");
  const [greeting, setGreeting] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    // Get the current hour of the day
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting(`Good morning!`);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting(`Good afternoon!`);
    } else {
      setGreeting(`Good evening!`);
    }
  }, []);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            {/* <i className="fas fa-home"></i>  */}
            Mcdof Global
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            <Form
              className="searchBarContainer d-flex flex-grow-1 mt-2"
              onSubmit={searchHandler}
              inline={!userInfo}
            >
              <Form.Control
                type="search"
                placeholder="Search products, brands or categories."
                className="mr-auto ml-auto rounded"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                variant="primary"
                type="submit"
                className="mr-auto ml-auto rounded"
              >
                Search
              </Button>
            </Form>
            <Nav className="mr-auto ml-auto">
              {/* <NavDropdown title="All" id="navbarScrollingDropdown">
                {userInfo ? (
                  <NavDropdown.Item as={Link} to="/"></NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to="/login"></NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/favorites">
                  Services
                </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link as={Link} to="/#">
                Promo Code: WLC4735
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                {greeting}
                {userInfo &&
                  userInfo.avatar && ( // Check if userInfo.avatar exists
                    <img
                      src={userInfo.avatar}
                      alt="Avatar"
                      className="avatar"
                      style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}
              </Nav.Link>
              {userInfo ? (
                // <NavDropdown title={userInfo.first_name}
                <NavDropdown
                  title={
                    userInfo.first_name
                      ? userInfo.first_name.charAt(0).toUpperCase() +
                        userInfo.first_name.slice(1)
                      : ""
                  }
                  id="username"
                  className="profile-dropdown"
                >
                  {/* <NavDropdown.Divider /> */}
                  <Nav.Link as={Link} to="/user-dashboard">
                    {" "}
                    Go to Profile
                  </Nav.Link>
                  <NavDropdown.Divider />
                  {/* <NavDropdown.Item as={Link} to="/favorites">
                    Favorites
                  </NavDropdown.Item>
                  <NavDropdown.Divider /> */}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Sign in
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/cart">
                <div className="cart-icon">
                Cart <i className="fas fa-shopping-cart"></i>
                  {cartItems.length > 0 && (
                    <span className="cart-count">{cartItems.length}</span>
                  )}
                {/* <i>Cart</i> */}
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { Navbar, Nav, Container, Button, NavDropdown, Form } from "react-bootstrap";
// // import { LinkContainer } from "react-router-bootstrap";
// import { logout } from "../actions/userActions";
// import { useDispatch, useSelector } from "react-redux";
// import "./Header.css";

// function Header() {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const [keyword, setKeyword] = useState("");
//   const history = useHistory();

//   const dispatch = useDispatch();
//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       history.push(`/products/search/${keyword}`);
//     } else {
//       history.push("/");
//     }
//   };

//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="md" sticky="top">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/">
//             <i className="fas fa-home"></i> Mcdof Global Store
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarCollapse" />
//           <Navbar.Collapse id="navbarCollapse">
//             <Nav className="mr-auto">
//               <Form className="d-flex flex-grow-1" onSubmit={searchHandler}>
//                 <Form.Control
//                   type="search"
//                   placeholder="Search"
//                   className="mr-2"
//                   aria-label="Search"
//                   value={keyword}
//                   onChange={(e) => setKeyword(e.target.value)}
//                 />
//                 <Button variant="outline-success" type="submit">
//                   Search
//                 </Button>
//               </Form>
//             </Nav>
//             <Nav>
//               <NavDropdown title="All" id="navbarScrollingDropdown">
//                 <NavDropdown.Item as={Link} to="/login">
//                   Sign in
//                 </NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item as={Link} to="/">
//                   Favourite
//                 </NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link as={Link} to="/sell">
//                 Sell
//               </Nav.Link>
//               {userInfo ? (
//                 <NavDropdown title={userInfo.first_name} id="username">
//                   <Nav.Link as={Link} to="/profile">
//                     Profile
//                   </Nav.Link>
//                   <NavDropdown.Item onClick={logoutHandler}>
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               ) : (
//                 <Nav.Link as={Link} to="/login">
//                   <i className="fas fa-user"></i> Hello, sign in
//                 </Nav.Link>
//               )}
//               <Nav.Link as={Link} to="/cart">
//               <div className="cart-icon">
//                 <i className="fas fa-shopping-cart"></i>
//                 {cartItems.length > 0 && (
//                   <span className="cart-count">{cartItems.length}</span>
//                 )}
//               </div>
//             </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

// export default Header;

// import { useState } from "react";
// import { Navbar, Nav, Container, Button, NavDropdown, Form } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom";
// import { logout } from "../actions/userActions";
// import { useDispatch, useSelector } from "react-redux";

// function Header() {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const [keyword, setKeyword] = useState("");
//   const history = useHistory();

//   const dispatch = useDispatch();
//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       history.push(`/products/search/${keyword}`);
//     } else {
//       history.push("/");
//     }
//   };

//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="md" sticky="top">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/">
//             <i className="fas fa-home"></i> Mcdof Global Store
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarCollapse" />
//           <Navbar.Collapse id="navbarCollapse">
//           <Nav className="mr-auto">
//           <Form className="d-flex flex-grow-1" onSubmit={searchHandler}>
//                 <Form.Control
//                   type="search"
//                   placeholder="Search"
//                   className="mr-2"
//                   aria-label="Search"
//                   value={keyword}
//                   onChange={(e) => setKeyword(e.target.value)}
//                 />
//               <Button variant="outline-success" type="submit">
//                 Search
//               </Button>
//             </Form>
//           </Nav>
//             <Nav>
//               <NavDropdown title="All" id="navbarScrollingDropdown">
//                 <NavDropdown.Item as={Link} to="/login">Sign in</NavDropdown.Item>
//                 {/* <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item> */}
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item as={Link} to="/">Favourite</NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link as={Link} to="/sell">Sell</Nav.Link>
//               {userInfo ? (
//                 <NavDropdown title={userInfo.name} id="username">
//                   <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
//                   <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
//                 </NavDropdown>
//               ) : (
//                 <Nav.Link as={Link} to="/login">
//                   <i className="fas fa-user"></i> Hello, sign in
//                 </Nav.Link>
//               )}
//               <Nav.Link as={Link} to="/cart">
//                 <i className="fas fa-shopping-cart"></i> Cart
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

// export default Header;

// import React from "react";
// import { Navbar, Nav, Container, Button, NavDropdown, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { logout } from "../actions/userActions";
// import { useDispatch, useSelector } from "react-redux";

// function Header() {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   const dispatch = useDispatch();
//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="md" sticky="top">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/">
//             <i className="fas fa-home"></i> Mcdof Global Store
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarCollapse" />
//           <Navbar.Collapse id="navbarCollapse">
//             <Nav className="mr-auto">
//               <Form className="d-flex flex-grow-1">
//                 <Form.Control
//                   type="search"
//                   placeholder="Search"
//                   className="mr-2"
//                   aria-label="Search"
//                 />
//                 <Button variant="outline-success">Search</Button>
//               </Form>
//             </Nav>
//             <Nav>
//               <NavDropdown title="All" id="navbarScrollingDropdown">
//                 <NavDropdown.Item as={Link} to="/login">Sign in</NavDropdown.Item>
//                 {/* <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item> */}
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item as={Link} to="/">Favourite</NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link as={Link} to="/sell">Sell</Nav.Link>
//               {userInfo ? (
//                 <NavDropdown title={userInfo.name} id="username">
//                   <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
//                   <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
//                 </NavDropdown>
//               ) : (
//                 <Nav.Link as={Link} to="/login">
//                   <i className="fas fa-user"></i> Hello, sign in
//                 </Nav.Link>
//               )}
//               <Nav.Link as={Link} to="/cart">
//                 <i className="fas fa-shopping-cart"></i> Cart
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

// export default Header;
