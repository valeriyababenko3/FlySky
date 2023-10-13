from flask import Blueprint, request, session, redirect, url_for, jsonify, make_response, current_app
from models.user import User
import re
from werkzeug.security import generate_password_hash
from flask_cors import cross_origin 
from flask_login import login_required
import secrets

user_requests = Blueprint('users', __name__)

#a user shouldnt be able to login if they are already logged in
@user_requests.route('/login', methods=['POST'])
@cross_origin()
def login():   
    if 'loggedin' in session:
        return jsonify({"error": "User is already logged in"})
    else:
        if request.method == 'OPTIONS':
            
            response = make_response()
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', '*')
            response.headers.add('Access-Control-Allow-Methods', '*')
            return response
        
        session_token = secrets.token_hex(16)
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
                    session['session_token'] = session_token
                    User.create_session(user.id, session_token)
                    return jsonify({"session": session})
                else:
                    return jsonify({"error": "Incorrect username/password"})
            else:
                return jsonify({"error": "Incorrect username/password"})
        return jsonify({"session": session})
    
@user_requests.route('/find_user_by_session_token', methods=['GET'])
def find_user_by_session_token():
    session_token = request.args.get('session_token')

    if session_token:
        user_id = User.find_by_session_token(session_token)

        if user_id:
            return jsonify({"user_id": user_id})
        else:
            return jsonify({"message": "User not found"}, 404)
    else:
        return jsonify({"message": "Missing session_token parameter"}, 400)
    
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

@user_requests.route('/get_user_name', methods=['GET'])
def get_user_name():
    user_id = request.args.get('userId')

    if user_id:
        user = User.find_user_by_id(user_id)

        if user:
            return jsonify({"name": user.fullname})
        else:
            return jsonify({"message": "User not found"}, 404)
    else:
        return jsonify({"message": "Missing userId parameter"}, 400)
    
#a user should only be able to logout when logged in
# @cross_origin() 
# @user_requests.route('/<int:user_id>/logout', methods=['POST'])  # Change the HTTP method to POST
# @login_required
# def logout(user_id):
#     print("here")
#     print(user_id)
#     if user_id:
#         User.delete_session(user_id)
#         return jsonify({"message": "Logged out successfully"})
#     else:
#         return jsonify({"error": "Session data missing"}, 400)