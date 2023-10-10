from models.db import Database

db = Database()

class UserFlight:
    def __init__(self, user_id, flight_id):
        self.user_id = user_id
        self.flight_id = flight_id
        
    @classmethod
    def get_user_flights(cls, user_id):
        try:
            sql_query = "SELECT * FROM user_flights WHERE user_id = %s"
            params = (user_id,)

            db.execute(sql_query, params)
            user_flights_data = db.fetch_results()

            user_flights = []
            for flight_data in user_flights_data:
                user_flight = UserFlight(
                    flight_data['user_id'],
                    flight_data['flight_id']
                )
                user_flights.append(user_flight)

            return user_flights
        except Exception as e:
            print(f"Error fetching user flights: {e}")
            return []

    def save_user_flight(self):
        try:
            sql_query = """
                INSERT INTO user_flights (user_id, flight_id) VALUES (%s, %s)
            """
            params = (self.user_id, self.flight_id)

            db.execute(sql_query, params)
            db.commit()
            return True  
        except Exception as e:
            print(f"Error saving user flight: {e}")
            return False  

    def get_user_flight(cls, user_id, flight_id):
        try:
            sql_query = "SELECT * FROM user_flights WHERE user_id = %s AND flight_id = %s"
            params = (user_id, flight_id)

            db.execute(sql_query, params)
            user_flight_data = db.fetch_results()

            if user_flight_data:
                user_flight = UserFlight(
                    user_flight_data[0]['user_id'],
                    user_flight_data[0]['flight_id']
                )
                return user_flight
            else:
                return None
        except Exception as e:
            print(f"Error fetching user flight details: {e}")
            return None
        
    @classmethod
    def flight_exists(cls, user_id, flight_id):
        try:
            sql_query = "SELECT * FROM user_flights WHERE user_id = %s AND flight_id = %s"
            params = (user_id, flight_id)

            db.execute(sql_query, params)
            user_flight_data = db.fetch_results()

            return user_flight_data is not None  
        except Exception as e:
            print(f"Error checking user flight existence: {e}")
            return False 