import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [sessionToken, setSessionToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch the session token and user ID logic here and set them using setSessionToken and setUserId.
    const fetchUser = async () => {
      try {
        const sessionToken = Cookies.get('session_token');
        if (sessionToken) {
          const userIdResponse = await fetch(`http://localhost:5000/api/users/find_user_by_session_token?session_token=${sessionToken}`);
          if (!userIdResponse.ok) {
            throw new Error(`HTTP error! Status: ${userIdResponse.status}`);
          }

          const userIdData = await userIdResponse.json();
          if (userIdData && userIdData.user_id) {
            setUserId(userIdData.user_id[0]);
          } else {
            console.error('User ID not found in the response data.');
          }
          setSessionToken(sessionToken);
        } else {
          console.error('Session token not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ sessionToken, userId }}>
      {children}
    </UserContext.Provider>
  );
};