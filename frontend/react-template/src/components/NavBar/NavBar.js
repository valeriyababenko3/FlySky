import React from 'react';
import "../../styles/styles.css"

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="/login">Sign In/ Log In</a></li>
        <li><a href="#">Menu</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;