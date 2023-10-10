from flask import Blueprint, request, session, redirect, url_for, jsonify, make_response
from models.user import User
import re
from werkzeug.security import generate_password_hash
from flask_cors import cross_origin 
from flask_login import login_required

user_requests = Blueprint('users', __name__)

@user_requests.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.method == 'OPTIONS':
        
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response
    
    data = request.get_json()
    
    if data:
        username = data.get('username')
        password = data.get('password')
        
        account = User.check_credentials(username)
        
        if account:
            user = User.from_dict(account)
            if user.check_password(password):
                session['loggedin'] = True
                session['id'] = user.id
                session['username'] = user.username
                return jsonify({"message": "Login successful"})
            else:
                return jsonify({"error": "Incorrect username/password"})
        else:
            return jsonify({"error": "Incorrect username/password"})

@user_requests.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()

    if data:
        fullname = data.get('fullname')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        _hashed_password = generate_password_hash(password)

        account = User.check_credentials(username)

        if account:
            return jsonify({"error": "Account already exists"})
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            return jsonify({"error": "Invalid email address!"})
        elif not re.match(r'[A-Za-z0-9]+', username):
            return jsonify({"error": "Username must contain only characters and numbers!"})
        elif not username or not password or not email:
            return jsonify({"error": "Please fill out the form"})
        else:
            user = User(None, fullname, username, _hashed_password, email)
            user.save_user(user)
            return jsonify({"message": "You have successfully registered!"})
    else:
        return jsonify({"error": "Invalid data format"})

@user_requests.route('/logout')
@cross_origin() 
@login_required
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))