import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../styles/theme.css';

const AppNavbar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        {/* Logo on the left */}
        <div className="d-flex align-items-center me-3">
          <span className="navbar-logo-text">SKG</span>
          <Navbar.Brand as={Link} to="/" className="ms-2">Breath</Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/data" active={location.pathname === '/data'}>Live Data</Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>About</Nav.Link>
            <Nav.Link as={Link} to="/map" active={location.pathname === '/map'}>Map</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
