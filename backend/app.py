from flask import Flask, request, session, redirect, url_for, render_template, jsonify, make_response
import psycopg2
import psycopg2.extras
import re
from werkzeug.security import generate_password_hash, check_password_hash
from decouple import config
from flask_cors import CORS, cross_origin  # Import cross_origin
from api.flight_requests import flight_requests
from api.weather_requests import weather_requests

# Allow cross-origin requests


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(flight_requests, url_prefix='/api/flights')
app.register_blueprint(weather_requests)

app.secret_key = config('app.secret_key')

DB_HOST = config('DB_HOST')
DB_NAME = config('DB_NAME')
DB_USER = config('DB_USER')
DB_PASS = config('DB_PASS')

# PostgreSQL connection
conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

@app.route('/')
def home():
    # Check if the user is logged in
    if 'loggedin' in session:
        # User is logged in, show them the home page
        return render_template('home.html', username=session['username'])
    # User is not logged in, redirect to the login page
    return redirect(url_for('login'))


@app.route('/login', methods=['POST'])
@cross_origin()  # Apply cross_origin to the login route
def login():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response

    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    data = request.get_json()

    if data:
        # Create variables for easy access
        username = data.get('username')
        password = data.get('password')

        # Check if the account exists using PostgreSQL
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        # Fetch one record and return the result
        account = cursor.fetchone()

        if account:
            password_rs = account['password']
            # If the account exists in the users table in our database
            if check_password_hash(password_rs, password):
                # Create session data, which can be accessed in other routes
                session['loggedin'] = True
                session['id'] = account['id']
                session['username'] = account['username']
                return jsonify({"message": "Login successful"})
            else:
                # Account doesn't exist or the username/password is incorrect
                return jsonify({"error": "Incorrect username/password"})
        else:
            # Account doesn't exist or the username/password is incorrect
            return jsonify({"error": "Incorrect username/password"})


@app.route('/register', methods=['POST'])
@cross_origin()  # Apply cross_origin to the register route
def register():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    data = request.get_json()

    if data:
        # Create variables for easy access
        fullname = data.get('fullname')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        _hashed_password = generate_password_hash(password)

        # Check if the account exists using PostgreSQL
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        account = cursor.fetchone()

        if account:
            return jsonify({"error": "Account already exists"})
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            return jsonify({"error": "Invalid email address!"})
        elif not re.match(r'[A-Za-z0-9]+', username):
            return jsonify({"error": "Username must contain only characters and numbers!"})
        elif not username or not password or not email:
            return jsonify({"error": "Please fill out the form"})
        else:
            # Account doesn't exist, and the form data is valid; now, insert a new account into the users table
            cursor.execute("INSERT INTO users (fullname, username, password, email) VALUES (%s,%s,%s,%s)",
                           (fullname, username, _hashed_password, email))
            conn.commit()
            return jsonify({"message": "You have successfully registered!"})
    else:
        return jsonify({"error": "Invalid data format"})


@app.route('/logout')
@cross_origin()  # Apply cross_origin to the logout route
def logout():
    # Remove session data, this will log the user out
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    # Redirect to the login page
    return redirect(url_for('login'))


@app.route('/profile')
def profile():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Check if the user is logged in
    if 'loggedin' in session:
        cursor.execute('SELECT * FROM users WHERE id = %s', [session['id']])
        account = cursor.fetchone()
        # Show the profile page with account info
        return render_template('profile.html', account=account)
    # User is not logged in, redirect to the login page
    return redirect(url_for('login'))


# New route to fetch flash messages
@app.route('/get-flash-messages', methods=['GET'])
def get_flash_messages():
    # Fetch flash messages from the session
    flash_messages = session.get('flash_messages', [])
    # Clear the flash messages after fetching them
    session['flash_messages'] = []
    # Return the flash messages as JSON
    return jsonify({"flashMessages": flash_messages})


if __name__ == "__main__":
    app.run(debug=True)
