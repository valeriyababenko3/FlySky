import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import { useUser } from '../UserProvide';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';

const NavBar = () => {
  const { sessionToken, userId } = useUser();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Initialize history

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (userId) {
          const userResponse = await fetch(`http://localhost:5000/api/users/get_user_name?userId=${userId}`);
          if (!userResponse.ok) {
            throw new Error(`HTTP error! Status: ${userResponse.status}`);
          }

          const userData = await userResponse.json();
          if (userData && userData.name) {
            setUserName(userData.name);
          } else {
            console.error('User name not found in the response data.');
          }
        } else {
          console.error('User ID not available.');
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };


    fetchUserName();
  }, [userId]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const handleLogout = async () => {
  //     Cookies.remove('session_token');
  // };

  const handleLogout = async () => {
    Cookies.remove('session_token');
    setUserName('Sign In/ Log In');
    setIsDropdownOpen(false); //
  };
  
  const handleProfileClick = (e) => {
    e.preventDefault()
    navigate('/userprofile'); // Navigate to the logout route
  }

  const dropdownText = sessionToken ? (
    <>
      <a onClick={handleProfileClick}>Profile</a>
      <a>Settings</a>
      <a onClick={handleLogout}>Logout</a>
    </>
  ) : (
    <a href="/login">Sign In/ Log In</a>
  );
  
  return (
    <nav>
      <ul>
        <li><a>Home</a></li>
        <li>
          <a onClick={toggleDropdown}>
            {sessionToken ? `Welcome, ${userName}` : 'Sign In/ Log In'}
          </a>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {dropdownText}
            </div>
          )}
        </li>
        <li><a href="#">Menu</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;