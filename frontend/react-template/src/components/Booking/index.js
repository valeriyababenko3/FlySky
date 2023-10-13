import FlightCard from "../FlightCard";
import '../../styles/booking.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Booking(){
    debugger
    const location = useLocation()
    const editIcon = <FontAwesomeIcon icon={faPenToSquare} />
    const flight = location.state.flight
    const userId = location.state.userId
    const [flightConfimation, setFlightConfirmation] = useState('Trip Details') 

    return (
        <div className="booking-main">
            <div className="booking-heading">
                <p className="booking-heading-one">My FlySky Trip</p>
                <p className="booking-heading-two">{flightConfimation}</p>
            </div>
            <div className="booking-card-container">
                <FlightCard flight={flight} userId={userId} callback={setFlightConfirmation}/>
            </div>
            <button className="flight-card-edit-btn">
                Edit {editIcon}
            </button>
        </div>
    )
}

export default Booking