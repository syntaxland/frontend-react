// TermsAndConditionScreen.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function TermsAndConditionScreen() {
  return (
    <Container>
      <Row className="d-flex justify-content-center py-2 ">
        <Col>
          <h2 className="py-2 text-center">Terms and Conditions</h2>

          <p>
            Welcome to our eCommerce platform! These terms and conditions
            outline the rules and regulations for the use of our services.
          </p>

          <h3>Section 1: Introduction</h3>
          <p>
            By accessing this platform, we assume you accept these terms and
            conditions. Do not continue to use our platform if you do not agree
            to take all of the terms and conditions stated on this page.
          </p>

          <h3>Section 2: eCommerce Platform</h3>
          <p>
            - Users can browse and purchase products/services through our
            platform.
          </p>
          <p>
            - Payments, shipping, and returns are subject to our eCommerce terms
            and conditions.
          </p>

          <h3>Section 3: User Responsibilities</h3>
          <p>
            - Users are responsible for maintaining the security of their
            accounts and passwords.
          </p>
          <p>
            - Users must comply with both general and specific terms and
            conditions related to their activities on our platform.
          </p>

          <h3>Section 4: Changes to Terms</h3>
          <p>
            We reserve the right to revise these terms and conditions at any
            time. By using our platform, you agree to be bound by the current
            version of these terms and conditions.
          </p>

          <h3>Section 5: Contact Information</h3>
          <p>
            If you have any questions about these terms and conditions, please
            contact us at support@mcdofshop.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default TermsAndConditionScreen;
