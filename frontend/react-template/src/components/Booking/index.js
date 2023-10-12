import FlightCard from "../FlightCard";
import '../../styles/booking.css'

function Booking(flight){
    return (
        <div className="booking-main">
            <FlightCard flight={flight}/>
        </div>
    )
}

export default Booking