import '../../styles/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useState } from 'react'
function NavBar(){

    const airplaneIcon = <FontAwesomeIcon icon={faPlane} />
    const userProfileIcon = <FontAwesomeIcon id='dropdown-menu-icon' icon={faUser}/>
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState(null)

//     useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const weatherResponse = await fetch('http://localhost:5000/api/weather_data');
//         if (!weatherResponse.ok) {
//           throw new Error(`HTTP error! Status: ${weatherResponse.status}`);
//         }
//         const weatherData = await weatherResponse.json();
//         setWeatherData(weatherData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('An error occurred while fetching data.');
//       }
//     };

//     fetchData();
//   }, []);

  console.log(weatherData)

    return (
        <div className='topnav'>
            <div className='topnav-container'>
            {airplaneIcon}
                <div className='topnav-icons'>
                    <div id='weather-time'>
                        WeatherData 27
                    </div>
                    <div className='dropdown-menu'>
                        <button className='dropdown-menu-btn' role='button' >
                            {userProfileIcon}
                            <p id='dropdown-menu-text'>FlySky</p>
                        </button>
                        <div className='dropdown-content'>
                            <p>Sign In</p>
                            <p>Sign Up</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar