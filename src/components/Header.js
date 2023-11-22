// Headers.js
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
            <i className="fas fa-home" style={{ fontSize: "16px" }}></i> McDof
            Shop
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
                variant="info"
                type="submit"
                className="mr-auto ml-auto rounded"
              >
                <i className="fas fa-search"></i>
              </Button>
            </Form>

            <Nav className="mr-auto ml-auto">
              <Nav.Link as={Link} to="/marketplace">
                {" "}
                MarketPlace
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                {greeting}
                {userInfo && userInfo.avatar && (
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
                  <Nav.Link as={Link} to="/dashboard">
                    {" "}
                    Go to Dashboard
                  </Nav.Link>
                  <NavDropdown.Divider />

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
