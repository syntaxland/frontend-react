// import React from "react";
// import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
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
//     <div>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <LinkContainer to="/" LinkContainer>
//             <Navbar.Brand>A.R.K</Navbar.Brand>
//           </LinkContainer>

//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="mr-auto my-2 my-lg-0"
//               style={{ maxHeight: "100px" }}
//               navbarScroll
//             >
//               <LinkContainer to="/">
//                 <Nav.Link>
//                   <i className="fas fa-home"></i> Home
//                 </Nav.Link>
//               </LinkContainer>

//               <LinkContainer to="/cart">
//                 <Nav.Link>
//                   <i className="fas fa-shopping-cart"></i> Cart
//                 </Nav.Link>
//               </LinkContainer>
//               {userInfo ? (
//                 <NavDropdown title={userInfo.name} id="username">
//                   <LinkContainer to="/profile">
//                     <NavDropdown.Item>Profile</NavDropdown.Item>
//                   </LinkContainer>

//                   <NavDropdown.Item onClick={logoutHandler}>
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               ) : (
//                 <LinkContainer to="/login">
//                   <Nav.Link>
//                     <i className="fas fa-user"></i> Login
//                   </Nav.Link>
//                 </LinkContainer>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </div>
//   );
// }

// export default Header;

import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <i className="fas fa-home"></i>
              Mcdof Global Store
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>

                <NavDropdown title="All" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/login">Sign in
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/logout">Logout
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/">
                    Favourite
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={Link} to="/sell">
                  Sell
                </Nav.Link>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <Nav.Link as={Link} to="/profile">
                    profile
                    </Nav.Link>

                    <NavDropdown.Item onClick={logoutHandler}>Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link as={Link} to="/login">
                    <i className="fas fa-user"></i>Hello, sign in
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/cart">
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
