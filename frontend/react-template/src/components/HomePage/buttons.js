import React, { useState } from 'react';
import "../../styles/styles.css"

const FlightOptions = () => {
  const [selectedOption, setSelectedOption] = useState('round-trip');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flight-options">
      <button
        className={selectedOption === 'round-trip' ? 'active' : ''}
        onClick={() => handleOptionChange('round-trip')}
      >
        Round Trip
      </button>
      <button
        className={selectedOption === 'one-way' ? 'active' : ''}
        onClick={() => handleOptionChange('one-way')}
      >
        One Way
      </button>
    </div>
  );
};

export default FlightOptions;