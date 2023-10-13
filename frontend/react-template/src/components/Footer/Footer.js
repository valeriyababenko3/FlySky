import React from 'react';
import "../../styles/styles.css"

const Footer = () => {
  return (
    <footer>
       <a href="/about-us">About Us</a> |{' '}
        <a href="/contact-us">Contact Us</a> |{' '}
        <a href="/terms">Terms</a>
      <p>&copy; {new Date().getFullYear()} FlySky Co.</p>
    </footer>
  );
};

export default Footer;