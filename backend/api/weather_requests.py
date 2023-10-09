from flask import jsonify, Blueprint
from dotenv import load_dotenv
import os
import requests

weather_requests = Blueprint('weather', __name__)

load_dotenv()
@weather_requests.route('/api/weather_data', methods=['GET'])
def get_weather_data():
    city = 'New York'
    api_key = os.getenv("API_NINJA_KEY")
    api_url = 'https://api.api-ninjas.com/v1/weather?city={}'.format(city)
    response = requests.get(api_url, headers={'X-Api-Key': api_key})

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        print("Error:", response.status_code, response.text)