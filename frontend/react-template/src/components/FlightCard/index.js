import { useLocation, useNavigate } from "react-router-dom"
import "../../styles/flightcard.css"
import React, { useState } from "react"

function FlightCard({flight, userId, callback}){
    debugger
    const getDate = (dateString) => {
        const date = new Date(dateString)
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const period = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
    
        const formattedTime = `${hours12}:${minutes}${period}`;
        return formattedTime
    }

    const generateRandomSeatNumbers = (numSeats) => {
        const seats = [];
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
        for (let i = 1; i <= numSeats; i++) {
          const letter = letters[Math.floor(Math.random() * letters.length)]; // Random letter
          seats.push(`Seat ${letter}${i}`);
        }
      
        seats[0] = 'select a seat'
        console.log(seats)
        return seats;
    };
    
    const [selectedSeat, setSelectedSeat] = useState('');
    const [availableSeats, setAvailableSeats] = useState(generateRandomSeatNumbers(50))

    const startTime = new Date(flight.departure)
    const endTime = new Date(flight.arrival)
    const durationInMinutes = (endTime - startTime) / (1000 * 60)
    const hours = Math.floor(durationInMinutes / 60)
    const minutes = durationInMinutes % 60

    const stops = "NonStop"
    const price = hours * 174
    const departTime = getDate(flight.departure)
    const arrivalTime = getDate(flight.arrival)
    const flightName = flight.flight_name
    const flightId = flight.id

    const navigate = useNavigate(); 
    const location = useLocation();

    const handleCheckout = (e) => {
        e.preventDefault()
        if(location.pathname === '/booking'){
            fetch('http://localhost:5000/api/flights/user_flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, flightId})
            }).then((response) => {
                if (response.status == 200) {
                    callback('Booking Confimed!')
                    return response.json();
                } else if(response.status == 400){
                    callback('Already Booked!')
                } 
            })
        } else {
            navigate('/booking', {state: {'flight': flight, 'userId': userId}})
        }
    }

    const handleSeatSelection = (e) => {
        e.preventDefault()
        const newSelectedSeat = e.target.value;
        setSelectedSeat(newSelectedSeat);
    };

    return (
        <div className="flight-card-container">
            <div className="flight-card-departing-info">
                <div className="flight-card-dep-and-arr-times">
                    <p className="depart-time">
                        {departTime} 
                    </p>
                    <p>></p>
                    <p className="arrival-time">
                        {arrivalTime}
                    </p>
                </div>
            </div>
            <div>
                <div className="flight-card-duration">
                    {`${hours}h ${minutes}m`}
                </div>
                <div className="flight-card-flight-name">
                    {flightName}
                </div>
            </div>
            <div className="flight-card-stops">
                {stops}
            </div>
            <div className="flight-card-price-container">
                <p className="flight-card-from">From</p>
                <div className="flight-card-price">
                    {`$${price}`}
                </div>
            </div>
            <div className="flight-card-seat-selection">
                <select value={selectedSeat} onChange={(e) => handleSeatSelection(e)}>
                    {availableSeats.map((seat, index) => (
                        <option key={index} value={seat}>
                            {seat}  
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <div>
                    <button onClick={handleCheckout} className="checkout-btn">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FlightCard