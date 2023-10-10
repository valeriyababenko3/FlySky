from flask import jsonify, Blueprint, request
from dotenv import load_dotenv
from flask_login import login_required
from models.flight import Flight
from models.user_flight import UserFlight
import os
import requests

flight_requests = Blueprint('flights', __name__)

load_dotenv()
flight_data = {
            "flight_date": "2019-12-12",
            "flight_status": "active",
            "departure": {
                "airport": "San Francisco International",
                "timezone": "America/Los_Angeles",
                "iata": "SFO",
                "icao": "KSFO",
                "terminal": "2",
                "gate": "D11",
                "delay": 13,
                "scheduled": "2019-12-12T04:20:00+00:00",
                "estimated": "2019-12-12T04:20:00+00:00",
                "actual": "2019-12-12T04:20:13+00:00",
                "estimated_runway": "2019-12-12T04:20:13+00:00",
                "actual_runway": "2019-12-12T04:20:13+00:00"
            },
            "arrival": {
                "airport": "Dallas/Fort Worth International",
                "timezone": "America/Chicago",
                "iata": "DFW",
                "icao": "KDFW",
                "terminal": "A",
                "gate": "A22",
                "baggage": "A17",
                "delay": 0,
                "scheduled": "2019-12-12T04:20:00+00:00",
                "estimated": "2019-12-12T04:20:00+00:00",
                "actual": "2019-12-12T04:20:00+00:00",
                "estimated_runway": None,
                "actual_runway": None
            },
            "airline": {
                "name": "American Airlines",
                "iata": "AA",
                "icao": "AAL"
            },
            "flight": {
                "number": "1004",
                "iata": "AA1004",
                "icao": "AAL1004",
                "codeshared": None
            },
            "aircraft": {
               "registration": "N160AN",
               "iata": "A321",
               "icao": "A321",
               "icao24": "A0F1BB"
            },
            "live": {
                "updated": "2019-12-12T10:00:00+00:00",
                "latitude": 36.28560000,
                "longitude": -106.80700000,
                "altitude": 8846.820,
                "direction": 114.340,
                "speed_horizontal": 894.348,
                "speed_vertical": 1.188,
                "is_ground": False
            }
        }

@flight_requests.route('/fetch_api')
def get_flight_data():
    if request.method == 'GET':
        api_key = os.getenv("API_KEY")
        api_url = f"https://airlabs.co/api/v9/flights?api_key={api_key}"
        
        response = requests.get(api_url)

        if response.status_code == 200:
            print("status was okay")
            data = response.json().get("response")
        else:
            print(f'{response.status_code}')
            print(response.text)
            return jsonify({"error": "Fail"})
    
        flights_data = []
        
        for item in data[:50]:  
            airline_name = item.get('airline_iata')  
            flight_name = item.get('flight_iata')  
            flight_status = item.get('status')
            
            flight_data = {
                'airline_name': airline_name,
                'flight_name': flight_name,
                'flight_status': flight_status
            }
            
            flight_iata = item.get('flight_iata')
            api_url_2 = f"https://airlabs.co/api/v9/flight?flight_iata={flight_iata}&api_key={api_key}"
           
            response2 = requests.get(api_url_2)
            
            if response2.status_code == 200:
                print("Status was okay")
                data2 = response2.json().get("response")
                if data2:
                    departure = data2.get('dep_time')
                    arrival = data2.get('arr_time')
                    flight_data['departure'] = departure
                    flight_data['arrival'] = arrival
            else:
                print(f'Status code: {response2.status_code}')
                print(response2.text)
                return jsonify({"error": "Fail"})
            
            flights_data.append(flight_data)
        
        save_flight_data(flights_data)
        return jsonify({"flights": flights_data})

    return jsonify({"error": "Invalid HTTP method"})
#save the flight data from the third party api to the database
@flight_requests.route('/api_data', methods=['GET'])
def save_flight_data(flights_data):
    print(flight_data)
    errors = []
    for item in flights_data:
        departure = item.get('departure')  
        arrival = item.get('arrival')   
        airline_name = item.get('airline_name')  
        flight_name = item.get('flight_name')  
        flight_status = item.get('flight_status') 
        
    # departure = flight_data['departure']['actual']
    # arrival = flight_data['arrival']['actual']
    # airline_name = flight_data['airline']['name']
    # flight_name = flight_data['flight']['number']
    # flight_status = flight_data['flight_status']
    
        flight = Flight(None, departure, arrival, airline_name, flight_name, flight_status)
        print(flight)
        success = flight.save_flight_data(flight)
    
        if not success:
            errors.append("Failed to save flight data")

    if errors:
        return jsonify({"errors": errors}, 500)
    else:
        return jsonify({"message": "All flight data saved successfully"})
    
#Get a flights details using the flightid
@flight_requests.route('/<int:flight_id>', methods=['GET'])
def get_flight_details(flight_id):
    try:
        flight = Flight.find_flight(flight_id)

        if flight:
            return jsonify(flight.serialize()), 200
        else:
            return jsonify({"message": "Flight not found"}), 404
    except Exception as e:
        print(f"Error fetching flight details: {e}")
        return jsonify({"error": "Failed to retrieve flight details"}), 500
    
#create a users flight
@flight_requests.route('/user_flights', methods=['POST'])
def create_user_flight():
    data = request.get_json()

    if data:
        user_id = data.get('user_id')
        flight_id = data.get('flight_id')

        if UserFlight.flight_exists(user_id, flight_id):
            return jsonify({"error": "User flight already exists"}), 400

        user_flight = UserFlight(user_id, flight_id)
        success = user_flight.save_user_flight()

        if success:
            return jsonify({"message": "User flight created successfully"}), 201
        else:
            return jsonify({"error": "Failed to create user flight"}), 500
    else:
        return jsonify({"error": "Invalid data format"}), 400
    
# Get all flights for a user
@login_required
@flight_requests.route('/user_flights/<int:user_id>', methods=['GET'])
def get_all_user_flights(user_id):
    try:
        user_flights = UserFlight.get_user_flights(user_id)

        if user_flights:
            return jsonify({"user_flights": user_flights}), 200
        else:
            return jsonify({"message": "No user flights found for this user"}), 404
    except Exception as e:
        print(f"Error fetching user flights: {e}")
        return jsonify({"error": "Failed to retrieve user flights"}), 500
    
#get a user flight
@login_required
@flight_requests.route('/user_flights/<int:user_id>/<int:flight_id>', methods=['GET'])
def get_user_flight_details(user_id, flight_id):
    try:
        user_flight = UserFlight.get_user_flight(user_id, flight_id)

        if user_flight:
            return jsonify({"user_flight": user_flight}), 200
        else:
            return jsonify({"message": "No matching user flight found"}), 404
    except Exception as e:
        print(f"Error fetching user flight details: {e}")
        return jsonify({"error": "Failed to retrieve user flight details"}), 500  
      
#Get all the flight data from db
@flight_requests.route('/', methods=['GET'])
def get_saved_flight_data():
    try:
        flights = Flight.get_flights()
        
        if flights:
            return jsonify({"flights": [flight.serialize() for flight in flights]}), 200
        else:
            return jsonify({"message": "No user flights found for this user"}), 404
    except Exception as e:
        print(f"Error fetching flights: {e}")
        return jsonify({"error": "Failed to retrieve flights"}), 500

#delete one flight from db
@flight_requests.route('/<int:flight_id>', methods=['DELETE'])
def delete_flight(flight_id):
    try:
        success = Flight.delete_flight(flight_id)

        if success:
            return jsonify({"flight_deleted": f"Flight with ID {flight_id} was deleted successfully"}), 200
        else:
            return jsonify({"error": "Failed to delete flight data"}), 500
    except Exception as e:
        print(f"Error deleting flight data: {e}")
        return jsonify({"error": "Failed to delete flight data"}), 500
