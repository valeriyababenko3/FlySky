import React from 'react';
import "../../styles/styles.css"

const FlightSearchButton = () => {
  
  const handleSearch = () => {};

  return (
    <div className="flight-search-button">
      <button onClick={handleSearch}>Search Flights</button>
    </div>
  );
};

export default FlightSearchButton;