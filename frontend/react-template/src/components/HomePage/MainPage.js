import React from 'react';
import FlightOptions from './buttons';
import FlightDateTimePicker from './FlightDatePicker';
import FlightSearchButton from './flightsearchbutton';
import "../../styles/styles.css"
import FlightData from '../FlightPage';

const MainContent = () => {
  return (
    <main>
      <div className="square-window">
          <div className="square">
          <div className="background-image">
          
            <p><h2>Flights</h2></p>
            <FlightOptions />
            <div className="date-pickers">  
            <FlightDateTimePicker label="Departure Date" /> 
            <FlightDateTimePicker label="Arriving Date" />
            </div>
            <div>
              <FlightSearchButton />
            </div>
            <FlightData />
            </div>
            </div>
        </div>
        
    </main>
  );
};

export default MainContent;