from flask import jsonify, Blueprint
from dotenv import load_dotenv
import os
import requests

flight_requests = Blueprint('flights', __name__)

load_dotenv()


@flight_requests.route('/api/flight_data', methods=['GET'])
def get_flight_data():
    api_key = os.getenv("API_KEY")
    print(api_key)
    api_url = f"http://api.aviationstack.com/v1/flights?access_key={api_key}"
    print(api_url)

    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        print(f'{response.status_code}')
        print(response.text)
        return jsonify({"error": "Fail"})
