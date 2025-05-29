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
    <Navbar expand="lg" className="navbar-custom" variant="dark">
      <Container fluid>

        {/* ✅ Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="navbar-logo-text fw-bold text-light">SKG</span>
          <span className="ms-2 fw-bold text-light">Breath</span>
        </Navbar.Brand>

        {/* ✅ Toggle button for mobile */}
        <Navbar.Toggle aria-controls="main-navbar-nav" />

        {/* ✅ Collapsible content */}
        <Navbar.Collapse id="main-navbar-nav">
          {/* ✅ Nav links */}
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/data" active={location.pathname === '/data'}>Historical Data</Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>About</Nav.Link>
            <Nav.Link as={Link} to="/map" active={location.pathname === '/map'}>Map</Nav.Link>
          </Nav>

          {/* ✅ Dark mode toggle */}
          <Form className="d-flex justify-content-end mt-3 mt-lg-0">
            <Form.Switch
              id="darkModeSwitch"
              label="Dark Mode"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="text-light"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
