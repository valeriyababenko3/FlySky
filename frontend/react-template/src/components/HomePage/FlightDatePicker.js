import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../styles/styles.css"

const FlightDateTimePicker = ({ label }) => {
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState(null);
  const [searchDeparture, setSearchDeparture] = useState('');
  const [searchArrival, setSearchArrival] = useState('');

  const handleSearch = async () => {
    try {
      const departureDateString = departureDate ? departureDate.toISOString().split('T')[0] : '';
      const arrivalDateString = arrivalDate ? arrivalDate.toISOString().split('T')[0] : '';
      const searchResponse = await fetch(
        `http://localhost:5000/search-flights?departure=${searchDeparture}&arrival=${searchArrival}&departureDate=${departureDateString}&arrivalDate=${arrivalDateString}`
      );

      if (!searchResponse.ok) {
        throw new Error(`HTTP error! Status: ${searchResponse.status}`);
      }
      const searchResult = await searchResponse.json();
      setFlightData(searchResult.flights);
    } catch (error) {
      console.error('Error searching for flights:', error);
      setError('An error occurred while searching for flights.');
    }
  };

  return (
    <div>
      <div className='date-pickers'>
        <div className='flight-date-picker'>
          <h3>Arrival Airport</h3>
            <input
              type='text'
              placeholder='Arrival Airport'
              value={searchArrival}
              onChange={(e) => setSearchArrival(e.target.value)}
            />
        </div>
        <div className='flight-date-picker'>
          <h3>Departure Airport</h3>
            <input
              type='text'
              placeholder='Departure Airport'
              value={searchDeparture}
              onChange={(e) => setSearchDeparture(e.target.value)}
           />
        </div>
        <div className="flight-date-picker">
          <h3>Arrival Date</h3>
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            placeholderText='Select a Date'
          />
        </div>
        <div className="flight-date-picker">
          <h3>Departure Date</h3>
          <DatePicker
            selected={arrivalDate}
            onChange={(date) => setArrivalDate(date)}
            placeholderText='Select a Date'
          />
        </div>
      </div>
      <div className="flight-search-button">
        <button onClick={handleSearch}>Search Flights</button>
      </div>
    </div>
  );
  
};

export default FlightDateTimePicker;