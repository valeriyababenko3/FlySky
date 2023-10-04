import React, { useEffect, useState } from 'react'

function FlightData() {
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/flight_data')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('An error occurred while fetching data.');
            });
    }, []);

    console.log(data)
    
      return (
        <div>
          <h1>Hello World</h1>
        </div>
      );
    }
    
    export default FlightData;