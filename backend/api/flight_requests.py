from flask import jsonify, Blueprint, request
from dotenv import load_dotenv
import os
import requests
import psycopg2 
from psycopg2 import extras
from decouple import config

DB_HOST = config('DB_HOST')
DB_NAME = config('DB_NAME')
DB_USER = config('DB_USER')
DB_PASS = config('DB_PASS')

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

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
# def get_flight_data():
#     if request.method == 'GET':
#         api_key = os.getenv("API_KEY")
#         api_url = f"http://api.aviationstack.com/v1/flights?access_key={api_key}"
        
#         response = requests.get(api_url)

#         if response.status_code == 200:
#             print("status was okay")
#             data = response.json()
#             save_flight_data(data["data"])
#             return jsonify(data["data"])
#         else:
#             print(f'{response.status_code}')
#             print(response.text)
#             return jsonify({"error": "Fail"})

#save the flight data from the third party api to the database
@flight_requests.route('/api_data', methods=['GET'])
def save_flight_data():
    # for item in flight_data:
    #     departure = item.get('departure').get('actual')
    #     arrival = item.get('arrival').get('actual')
    #     airline_name = item.get('airline').get('name')
    #     flight_name = item.get('flight').get('number')
    #     flight_status = item.get('flight_status')
    departure = flight_data['departure']['actual']
    arrival = flight_data['arrival']['actual']
    airline_name = flight_data['airline']['name']
    flight_name = flight_data['flight']['number']
    flight_status = flight_data['flight_status']
    
    try:
        cursor = conn.cursor(cursor_factory=extras.DictCursor)

        cursor.execute(
            "INSERT INTO flights (departure, arrival, airline_name, flight_name, flight_status) VALUES (%s, %s, %s, %s, %s)",
            (departure, arrival, airline_name, flight_name, flight_status)
        )

        conn.commit()
        cursor.close()
        print("It wAS A SUCCESS")
        return 'success'
    except Exception as e:
        print(f"Error saving flight data: {e}")
    return 'non success'
    
#Get all the flight data from db
@flight_requests.route('/', methods=['GET'])
def get_saved_flight_data():
    try: 
        cursor = conn.cursor(cursor_factory=extras.DictCursor)
        query = 'SELECT * FROM flights'
        cursor.execute(query)
        flight_data = cursor.fetchall()
        cursor.close()
        return jsonify({'flight_data': flight_data})
    except Exception as e:
        print(f"Error fetching flight data from the database: {e}")
        return jsonify({"error": "Failed to retrieve data from the database"})
    
#Get one flight data from db
@flight_requests.route('/<int:flight_id>', methods=['GET'])
def get_flight(flight_id):
    flight = ""

#delete one flight from db
@flight_requests.route('<int:flight_id>', methods=['DELETE'])  
def delete_flight(flight_id):
    try:
        cursor = conn.cursor()
        query = 'DELETE FROM flights WHERE flight_id = %s'
        cursor.execute(query, (flight_id,))
        commit = conn.commit()
        print(commit)
        cursor.close()
        return jsonify({"flight deleted": f"flight with ID {flight_id} was deleted successfully"})
    except Exception as e:
        print(f"Error deleting flight data: {e}")
        return jsonify({"error": "Failed to delete flight data"})
