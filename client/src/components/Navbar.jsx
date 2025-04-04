import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-indigo-600 text-white p-4 flex gap-6">
      <Link to="/" className="font-bold text-white hover:underline">Home</Link>
      <Link to="/about" className="hover:underline">About</Link>
      <Link to="/data" className="hover:underline">Data</Link>
    </nav>
  );
};

export default Navbar;
