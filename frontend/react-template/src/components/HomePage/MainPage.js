import React, { useState } from 'react';
import FlightOptions from './buttons';
import FlightDateTimePicker from './FlightDatePicker';
import "../../styles/styles.css"
import FlightData from '../FlightPage';

const MainContent = () => {
  const [flights, setFlights] = useState([])

  return (
    <main>
      <div className="square-window">
          <div className="square">
          <div className="background-image">
          
            <p><h2>Flights</h2></p>
            <FlightOptions />
            <div className="date-pickers">  
            <FlightDateTimePicker setFlights={setFlights}/> 
            </div>
            </div>
            </div>
            <FlightData flights={flights}/>
        </div>
        
    </main>
  );
};

export default MainContent;