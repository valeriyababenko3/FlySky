from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/flight_data', methods=['GET'])
def get_flight_data():
    api_url = "http://api.aviationstack.com/v1/flights?access_key=4a5fe6cb7eeeef3777ad1cd30cea2b62"
    
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        print(f'{response.status_code}')
        print(response.text)
        return jsonify({"error": "Fail"})

if __name__ == '__main__':
    app.run(debug=True)