// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

// function Footer() {
//   return (
//     <footer>
//       <Container>
//         <Row>
//           <Col className='text-center py-3'>@Copywrite McdofGlobal - Designed by SoftGlobal</Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;

// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

// function Footer() {
//   return (
//     <footer className="bg-dark text-light">
//       <Container>
//         <Row>
//           <Col className="text-center py-3">
//             &copy; McdofGlobal - Designed by SoftGlobal
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;

// import React from "react";
// import { Container } from "react-bootstrap";

// function Footer() {
//   return (
//     <footer className="bg-dark text-light">
//       <Container fluid className="py-3">
//         <p className="text-center m-0">
//           &copy; McdofGlobal - Designed by SoftGlobal
//         </p>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;


import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light">
      <Container fluid>
        <Row className="py-3">
          <Col className="text-center">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
          <Col className="text-center">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li>Electronics</li>
              <li>Clothing</li>
              <li>Home &amp; Garden</li>
              <li>Books</li>
            </ul>
          </Col>
          <Col className="text-center">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>FAQs</li>
              <li>Shipping &amp; Returns</li>
              <li>Customer Service</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            &copy; McdofGlobal - Designed by SoftGlobal
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
