// src/components/Layout.js
import React from 'react';
import AppNavbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ height: '100%' }}>
      <AppNavbar />
      <main className="flex-fill" style={{ height: '100%' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
