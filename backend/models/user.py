from werkzeug.security import generate_password_hash, check_password_hash
from models.db import Database

db = Database()

class User():
    def __init__(self, id, fullname, username, password, email):
        self.id = id
        self.fullname = fullname
        self.username = username
        self.password = password
        self.email = email
        
    @classmethod
    def from_dict(cls, user_dict):
        return cls(
            id=user_dict['id'],
            fullname=user_dict['fullname'],
            username=user_dict['username'],
            password=user_dict['password'],
            email=user_dict['email']
        )
        
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def hash_password(self):
        self.password = generate_password_hash(self.password)
        
    def save_user(self, user):
        try:
            sql_query = """
                INSERT INTO users (fullname, username, password, email)
                VALUES (%s, %s, %s, %s)
            """
            params = (user.fullname, user.username, user.password, user.email)
            
            db.execute(sql_query, params)
            db.commit()
            return True 
        except Exception as e:
            print(f"Error saving user: {e}")
            return False 
       
    @classmethod 
    def create_session(cls, user_id, session_token):
        try:
            sql_query = """
                UPDATE users
                SET session_token = %s
                WHERE id = %s
            """
            params = (session_token, user_id)
            
            db.execute(sql_query, params)
            db.commit()
        except Exception as e:
            print(f"Error creating session: {e}")
            return "Error creating session"
        
    @classmethod
    def find_by_session_token(cls, session_token):
        try:
            sql_query = "SELECT id FROM users WHERE session_token = %s"
            params = (session_token,)

            db.execute(sql_query, params)
            user_data = db.fetch_results()

            return user_data
        except Exception as e:
            print(f"Error finding user by session token: {e}")
            return None

    @classmethod
    def check_credentials(cls, username):
        db.execute('SELECT * FROM users WHERE username = %s', (username,))
        account = db.fetch_results()
        return account
        