// PrivacyPolicyScreen.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function PrivacyPolicyScreen() {
  return (
    <Container>
      <Row className="d-flex justify-content-center py-2 ">
        <Col>
          <h2 className="py-2 text-center">Privacy Policy</h2>

          <p>
            Welcome to Mcdofshop! This Privacy Policy outlines how we
            collect, use, and protect your personal information when you use our
            mobile application.
          </p>

          <h3>1. Information Collection and Use</h3>
          <p>
            We collect information you provide when you register an account,
            make a purchase, or interact with our app in any way. This
            information may include your name, email address, shipping address,
            payment details, and other necessary information to facilitate your
            transactions.
          </p>

          <h3>2. Data Security</h3>
          <p>
            We take the security of your personal information seriously and
            implement industry-standard measures to protect it from unauthorized
            access, disclosure, alteration, or destruction.
          </p>

          <h3>3. Information Sharing</h3>
          <p>
            We may share your personal information with third-party service
            providers, such as payment processors and shipping companies, to
            facilitate transactions and provide you with our services. We ensure
            that these service providers adhere to strict confidentiality and
            data protection standards.
          </p>

          <h3>4. Analytics</h3>
          <p>
            We may use analytics tools to collect and analyze usage data, such
            as app usage, navigation paths, and device information. This helps
            us improve our app and provide a better user experience.
          </p>

          <h3>5. Children's Privacy</h3>
          <p>
            Our app is not intended for children under the age of 13. We do not
            knowingly collect personal information from children. If you are a
            parent or guardian and believe that your child has provided us with
            personal information, please contact us immediately so that we can
            remove it.
          </p>

          <h3>6. Changes to this Privacy Policy</h3>
          <p>
            We reserve the right to update or modify this Privacy Policy at any
            time. We will notify you of any changes by posting the new Privacy
            Policy on this page. It is your responsibility to review this
            Privacy Policy periodically for changes.
          </p>

          <h3>7. Contact Us</h3>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at mcdofshop@gmail.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PrivacyPolicyScreen;
