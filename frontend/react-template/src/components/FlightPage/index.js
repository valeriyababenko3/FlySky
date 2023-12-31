import '../../styles/flightindex.css'
import React, { useEffect, useState } from 'react'
import FlightCard from '../FlightCard';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function FlightData({flights}) {
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [userId, setUserId] = useState(null)
  const sessionToken = Cookies.get('session_token');
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    airline: '',
  });

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
      if(flights.length === 0) {
        
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
            } else if (location.pathname === '/userprofile') {
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
        fetchData()
      } else {
        console.log("in the else")
        setFlightData(flights)
      }

    // fetchData();
  }, [sessionToken, location.pathname, userId]);

  // const handleSearch = async () => {
  //   try {
  //     const departureDateString = departureDate ? departureDate.toISOString().split('T')[0] : '';
  //     const arrivalDateString = arrivalDate ? arrivalDate.toISOString().split('T')[0] : '';
  //     const searchResponse = await fetch(
  //       `http://localhost:5000/search-flights?departure=${searchDeparture}&arrival=${searchArrival}&departureDate=${departureDateString}&arrivalDate=${arrivalDateString}`
  //     );

  //     if (!searchResponse.ok) {
  //       throw new Error(`HTTP error! Status: ${searchResponse.status}`);
  //     }
  //     const searchResult = await searchResponse.json();
  //     setFlightData(searchResult.flights);
  //   } catch (error) {
  //     console.error('Error searching for flights:', error);
  //     setError('An error occurred while searching for flights.');
  //   }
  // };
  const handleClick = (e) => {
    e.preventDefault()
    navigate('/userflights')
  }

 
  const handleFilter = async () => {

    try {

      const filterResponse = await fetch(

        `http://localhost:5000/filter-flights?airline=${filters.airline}`

      );

      if (!filterResponse.ok) {

        throw new Error(`HTTP error! Status: ${filterResponse.status}`);

      }

      const filteredData = await filterResponse.json();

      setFlightData(filteredData.flights);

    } catch (error) {

      console.error('Error filtering flights:', error);

      setError('An error occurred while filtering flights.');

    }

  };

  return (
    <div className='container'>
      <div>

</div>
<div>
<h2>Flight Filter</h2>
<input
  type='text'
  placeholder='Airline'
  value={filters.airline}
  onChange={(e) => setFilters({ ...filters, airline: e.target.value })}
/>
<button onClick={handleFilter}>Apply Filters</button>
</div>
     {flightData.map((flight, index) => (
        <FlightCard flight={flight} userId={userId} /> 
    ))}
    </div>
  );
}
    export default FlightData;