import "../../styles/flightcard.css"

function FlightCard(flight){
    const departingDay = ""
    const duration = ""
    const stops = ""
    const price = ""
    const departTime = ""
    const arrivalTime = ""

    return (
        <div>
            <div>
                <p>Trip Summary</p>
                <div className="flight-card-container">
                    <div className="flight-card-departing-info">
                        <p>Departing: {departingDay}</p>
                        <div className="flight-card-dep-and-arr-times">
                            <p className="depart-time">

                            </p>
                            <p className="arrival-time">

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

export default FlightCard