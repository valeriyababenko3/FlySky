from flask import Flask, session, redirect, url_for, render_template, jsonify, request
from decouple import config
from flask_cors import CORS
from api.flight_requests import flight_requests
from api.weather_requests import weather_requests
from api.user_requests import user_requests
import psycopg2
import psycopg2.extras
from models.db import Database
from flask_login import LoginManager

db = Database()

# Access the connection
conn = db.__conn__
app = Flask(__name__)
login_manager = LoginManager(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
login_manager.login_view = "login"

app.register_blueprint(flight_requests, url_prefix='/api/flights')
app.register_blueprint(weather_requests)
app.register_blueprint(user_requests, url_prefix='/api/users')
    
app.secret_key = config('app.secret_key')

@app.route('/')
def home():
    if 'loggedin' in session:
        return render_template('home.html', username=session['username'])
    return redirect(url_for('login'))

# @app.route('/profile')
# def profile():
#     cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

#     # Check if the user is logged in
#     if 'loggedin' in session:
#         cursor.execute('SELECT * FROM users WHERE id = %s', [session['id']])
#         account = cursor.fetchone()
#         # Show the profile page with account info
#         return render_template('profile.html', account=account)
#     # User is not logged in, redirect to the login page
#     return redirect(url_for('login'))


# New route to fetch flash messages
@app.route('/get-flash-messages', methods=['GET'])
def get_flash_messages():
    # Fetch flash messages from the session
    flash_messages = session.get('flash_messages', [])
    # Clear the flash messages after fetching them
    session['flash_messages'] = []
    # Return the flash messages as JSON
    return jsonify({"flashMessages": flash_messages})


@app.route('/search-flights', methods=['GET'])
def search_flights():
    search_departure = request.args.get('departure')
    search_arrival = request.args.get('arrival')
    departure_date = request.args.get('departureDate')
    arrival_date = request.args.get('arrivalDate')

    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = "SELECT * FROM flights WHERE departure_airport ILIKE %s AND arrival_airport ILIKE %s"
    query_params = (f"%{search_departure}%", f"%{search_arrival}%")

    if departure_date:
        query += " AND departure= %s"
        query_params += (departure_date,)

    if arrival_date:
        query += " AND arrival = %s"
        query_params += (arrival_date,)

    cursor.execute(query, query_params)
    result = cursor.fetchall()
    cursor.close()

    return jsonify({"flights": result})


@app.route('/filter-flights', methods=['GET'])
def filter_flights():
    departure_airport = request.args.get('departure_airport')
    arrival_airport = request.args.get('arrival_airport')

    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = "SELECT * FROM flights WHERE departure_airport = %s AND arrival_airport = %s"
    cursor.execute(query, (departure_airport, arrival_airport,))
    result = cursor.fetchall()
    cursor.close()

    return jsonify({"flights": result})


if __name__ == "__main__":
    app.run(debug=True)
