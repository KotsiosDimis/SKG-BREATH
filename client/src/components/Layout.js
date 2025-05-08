// src/components/Layout.js
import React from 'react';
import AppNavbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
