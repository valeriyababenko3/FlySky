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
    def check_credentials(cls, username):
        db.execute('SELECT * FROM users WHERE username = %s', (username,))
        account = db.fetch_results()
        return account
        