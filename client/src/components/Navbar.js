// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../styles/theme.css';

const AppNavbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('theme-dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        {/* Logo */}
        <div className="d-flex align-items-center me-3">
          <span className="navbar-logo-text">SKG</span>
          <Navbar.Brand as={Link} to="/" className="ms-2">Breath</Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/data" active={location.pathname === '/data'}>Historical Data</Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>About</Nav.Link>
            <Nav.Link as={Link} to="/map" active={location.pathname === '/map'}>Map</Nav.Link>
          </Nav>

          {/* 🌙 Dark Mode Toggle */}
          <Form.Switch
            id="darkModeSwitch"
            label="Dark Mode"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="text-light"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
