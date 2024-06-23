// src/pages/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css'; // Adjust the path if needed

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/my-fixture">My Fixture</Link></li>
        <li><Link to="/other-fixture">Other Fixture</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
