function UpcomingFlights(){
    const [upcomingFlights, setUpcomingFlights] = useState([]);
  
    useEffect(() => {
      
    }, []); 
  
    return (
      <div>
        <h2>Upcoming Flights</h2>
        <ul>
          {upcomingFlights.map((flight) => (
            <li key={flight.id}>
              {flight.departure} to {flight.arrival}
              <br />
              Airline: {flight.airline_name}, Flight: {flight.flight_name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UpcomingFlights;