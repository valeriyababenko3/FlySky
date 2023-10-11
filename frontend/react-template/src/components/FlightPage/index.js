import '../../Styles/navbar.css'
import React, { useEffect, useState } from 'react'

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
  const getDate = (dateString) => {
    const date = new Date(dateString)
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;

    const formattedTime = `${hours12}:${minutes}${period}`;
    return formattedTime
  }
    
  return (
    <div className='container'>
      {flightData.map((flight, index) => (
        <div className='flight' key={index}>
          <div className='left-side'>
            <div className='top-side'>
              <div className='times'>
              </div>
              <div className='duration'>
                <div className='deptime'>
                  <p>Departure: {getDate(flight.departure)}</p>
                  <p>Arrival: {getDate(flight.arrival)}</p>
                  <p>Duration: </p>
                </div>
              </div>
              <div className='nonstop'>
                Flight Status: {flight.flight_status}
              </div>
            </div>
            <div className='bottom'>
            </div>
          </div>
          <div className='right-side'>
          </div>
        </div>
      ))}
    </div>
  );
}
    export default FlightData;