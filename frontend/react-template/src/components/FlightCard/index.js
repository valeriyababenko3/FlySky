import "../../styles/flightcard.css"

function FlightCard(flight){
    flight = flight.flight
    console.log(flight)
    const departingDay = ""
    const duration = ""
    const stops = ""
    const price = ""
    const departTime = ""
    const arrivalTime = ""

    const getDate = (dateString) => {
        const date = new Date(dateString)
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const period = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
    
        const formattedTime = `${hours12}:${minutes}${period}`;
        return formattedTime
    }

    return (
        <div>
            <div>
                <p>Trip Summary</p>
                <div className="flight-card-container">
                    <div className="flight-card-departing-info">
                        <p>Departing: </p>
                        <div className="flight-card-dep-and-arr-times">
                            <p className="depart-time">
                                {getDate(flight.departure)}
                            </p>
                            <p className="arrival-time">
                                {getDate(flight.arrival)}
                            </p>
                        </div>
                    </div>
                    <div className="flight-card-duration">
                        {duration}
                    </div>
                    <div className="flight-card-stops">
                        {stops}
                    </div>
                    <div className="flight-card-price">
                        {price}
                    </div>
                </div>
            </div>
        </div>
    )
}

// <div className='flight' key={index}>
//           <div className='left-side'>
//             <div className='top-side'>
//               <div className='times'>
//               </div>
//               <div className='duration'>
//                 <div className='deptime'>
//                   <p>Departure: {getDate(flight.departure)}</p>
//                   <p>Arrival: {getDate(flight.arrival)}</p>
//                   <p>Duration: </p>
//                 </div>
//               </div>
//               <div className='nonstop'>
//                 Flight Status: {flight.flight_status}
//               </div>
//             </div>
//             <div className='bottom'>
//             </div>
//           </div>
//           <div className='right-side'>
//           </div>
//         </div>

export default FlightCard