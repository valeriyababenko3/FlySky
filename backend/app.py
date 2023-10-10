from flask import Flask, session, redirect, url_for, render_template, jsonify
from decouple import config
from flask_cors import CORS
from api.flight_requests import flight_requests
from api.weather_requests import weather_requests
from api.user_requests import user_requests
from flask_login import LoginManager


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
    # Check if the user is logged in
    if 'loggedin' in session:
        # User is logged in, show them the home page
        return render_template('home.html', username=session['username'])
    # User is not logged in, redirect to the login page
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


if __name__ == "__main__":
    app.run(debug=True)
