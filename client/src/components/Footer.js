// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto w-100">
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col xs={12}>
            <p className="mb-0 small text-center">
              &copy; {new Date().getFullYear()} <strong>SkgBreath</strong>. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
