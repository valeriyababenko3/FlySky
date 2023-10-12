import '../../styles/navbar.css'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FlightData() {
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState(null);
  const [searchDeparture, setSearchDeparture] = useState('');
  const [searchArrival, setSearchArrival] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [filters, setFilters] = useState({
    airline: '',
  });

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

  const handleFilter = async () => {
    try {
      // Implement filter logic here
      const filterResponse = await fetch(
        `http://localhost:5000/api/flights?departure=${filters.departure}&arrival=${filters.arrival}&airline=${filters.airline}`
      );
      if (!filterResponse.ok) {
        throw new Error(`HTTP error! Status: ${filterResponse.status}`);
      }
      const filteredData = await filterResponse.json();
      setFlightData(filteredData);
    } catch (error) {
      console.error('Error filtering flights:', error);
      setError('An error occurred while filtering flights.');
    }
  };
    
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
          <div>
          <h2>Flight Search</h2>
          <input
            type='text'
            placeholder='Departure Airport'
            value={searchDeparture}
            onChange={(e) => setSearchDeparture(e.target.value)}
          />
          <input
            type='text'
            placeholder='Arrival Airport'
            value={searchArrival}
            onChange={(e) => setSearchArrival(e.target.value)}
          />
          <div className='date-pickers'>
            <div>
              <label>Departure Date:</label>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                placeholderText='Select a Date'
              />
            </div>
            <div>
              <label>Arrival Date:</label>
              <DatePicker
                selected={arrivalDate}
                onChange={(date) => setArrivalDate(date)}
                placeholderText='Select a Date'
              />
            </div>
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>
            <div>
            <h2>Flight Filter</h2>
          <input
            type='text'
            placeholder='Departure Airport'
            value={filters.departure}
            onChange={(e) => setFilters({ ...filters, departure: e.target.value })}
          />
          <input
            type='text'
            placeholder='Arrival Airport'
            value={filters.arrival}
            onChange={(e) => setFilters({ ...filters, arrival: e.target.value })}
          />
          <input
            type='text'
            placeholder='Airline'
            value={filters.airline}
            onChange={(e) => setFilters({ ...filters, airline: e.target.value })}
          />
          <button onClick={handleFilter}>Apply Filters</button>
            </div>
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