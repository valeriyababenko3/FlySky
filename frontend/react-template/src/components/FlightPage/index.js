import '../../Styles/navbar.css'
import React, { useEffect, useState } from 'react'
import FlightCard from '../FlightCard';

function FlightData() {
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightResponse = await fetch('http://localhost:5000/api/flights');
        if (!flightResponse.ok) {
          throw new Error(`HTTP error! Status: ${flightResponse.status}`);
        }
        const flightData = await flightResponse.json();
        setFlightData(Object.values(flightData)[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  console.log(flightData);

  return (
    <div className='container'>
      {flightData.map((flight, index) => (
        <FlightCard flight={flight}/>
      ))}
    </div>
  );
}
    export default FlightData;