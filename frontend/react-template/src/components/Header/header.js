import React from 'react';
import NavBar from '../NavBar/NavBar';
import Logo from './Logo';
import "../../styles/styles.css"


const Header = () => {
  return (
    <header className="header-style">
      <Logo />
      <NavBar />
    </header>
  );
};

export default Header;