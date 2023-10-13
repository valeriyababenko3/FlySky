import '../../styles/flightindex.css'
import React, { useEffect, useState } from 'react'
import FlightCard from '../FlightCard';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function FlightData() {
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [userId, setUserId] = useState(null)
  const sessionToken = Cookies.get('session_token');
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionToken) {
      const fetchUser = async () => {
        try {
          debugger
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
        } catch (error) {
          console.error('Error fetching user ID:');
        }
      };
    
      fetchUser();
    } else {
      console.error('Session token not found.');
    }

    const fetchData = async () => {
      try {
        debugger
        if(location.pathname === '/'){
          const flightResponse = await fetch('http://localhost:5000/api/flights');
          if (!flightResponse.ok) {
            throw new Error(`HTTP error! Status: ${flightResponse.status}`);
          }
          const flightData = await flightResponse.json();
          setFlightData(Object.values(flightData)[0]);
        } else if (location.pathname === '/userflights') {
          const userFlightsResponse = await fetch(`http://localhost:5000/api/flights/user_flights/${userId}`);
          if (!userFlightsResponse.ok) {
            throw new Error(`HTTP error! Status: ${userFlightsResponse.status}`);
          }
          const userFlightData = await userFlightsResponse.json();
          setFlightData(Object.values(userFlightData)[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, [sessionToken, location.pathname, userId]);

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/userflights')
  }

  return (
    <div className='container'>
      <button onClick={handleClick}>

      </button>
     {flightData.map((flight, index) => (
      <FlightCard flight={flight} userId={userId} /> 
  ))}
    </div>
  );
}
    export default FlightData;