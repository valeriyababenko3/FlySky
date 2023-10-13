import FlightCard from "../FlightCard";
import '../../styles/booking.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useLocation } from "react-router-dom";

function Booking(){
    const location = useLocation()
    const editIcon = <FontAwesomeIcon icon={faPenToSquare} />
    const flight = location.state.flight
    const userId = location.state.userId

    return (
        <div className="booking-main">
            <div className="booking-heading">
                <p className="booking-heading-one">My FlySky Trip</p>
                <p className="booking-heading-two">Would You Like to Make any Changes to Your Trip?</p>
            </div>
            <FlightCard flight={flight} userId={userId}/>
            <button className="flight-card-edit-btn">
                Edit {editIcon}
            </button>
        </div>
    )
}

export default Booking