import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import { useUser } from '../UserProvide';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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

  const handleLogout = () => {
    // Remove user session information, e.g., by making an API call to log out
    // Then navigate to the logout route
    // Replace 'api/logout' with the actual logout API endpoint
    fetch('http://localhost:5000/api/users/logout', {
      method: 'POST',
      headers: {
        'Authorization': sessionToken, // Include session token in the headers if required
      },
    })
      .then(response => {
        if (response.ok) {
          // Log out was successful
          navigate('/logout'); // Navigate to the logout route
        } else {
          // Handle any errors, e.g., display an error message
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <nav>
      <ul>
        <li><a>Home</a></li>
        {sessionToken ? (
          <li>
            <a onClick={toggleDropdown}>
              Welcome, {userName}
            </a>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <a>Profile</a>
                <a>Settings</a>
                <a onClick={handleLogout}>Logout</a> {/* Handle Logout click */}
              </div>
            )}
          </li>
        ) : (
          <li><a href="/login">Sign In/ Log In</a></li>
        )}
        <li><a href="#">Menu</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;