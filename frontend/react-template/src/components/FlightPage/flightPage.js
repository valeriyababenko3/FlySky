import '../../styles/navbar.css'
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
        setFlightData(flightData);
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
          <div className='left-side'>
            <div className='top-side'>
              <div className='times'> 

              </div>
              <div className='duration'>
                <div className='deptime'>
                  <p>7:30am</p>
                </div>
                <div className='arrtime'>
                  <p>7:30pm</p>
                </div>
              </div>
              <div className='nonstop'>

              </div>
            </div>
            <div className='bottom'>

            </div>
          </div>
          <div className='right-side'>

          </div>
        </div>
      );
    }

    {/* {flightData.map((flightInfo, index) => (
            <ul key={index}>
              {Object.values(flightInfo)}
            </ul>
          ))} */}
    
    export default FlightData;