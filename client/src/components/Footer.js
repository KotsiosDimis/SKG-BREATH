// src/components/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <small>&copy; {new Date().getFullYear()} SkgBreath. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;
