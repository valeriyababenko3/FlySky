from models.db import Database
from models.flight import Flight

db = Database()

class UserFlight:
    def __init__(self, user_id, flight_id):
        self.user_id = user_id
        self.flight_id = flight_id
        
    @classmethod
    def get_user_flights(cls, user_id):
        try:
            sql_query = """
            SELECT *
            FROM user_flights AS uf
            JOIN flights AS f ON uf.flight_id = f.id
            WHERE uf.user_id = %s
            """
            params = (user_id,)

            db.execute(sql_query, params)
            user_flights_data = db.fetch_results(True)

            user_flights = []
            for flight_data in user_flights_data:
                user_flight = cls(
                    user_id,
                    flight_data['flight_id']
                )
                flight_details = Flight.find_flight(user_flight.flight_id)
                user_flight.departure = flight_details.departure
                user_flight.arrival = flight_details.arrival
                user_flight.airline_name = flight_details.airline_name
                user_flight.flight_name = flight_details.flight_name
                user_flight.flight_status = flight_details.flight_status

                user_flight_dict = {
                    "user_id": user_flight.user_id,
                    "flight_id": user_flight.flight_id,
                    "departure": user_flight.departure,
                    "arrival": user_flight.arrival,
                    "airline_name": user_flight.airline_name,
                    "flight_name": user_flight.flight_name,
                    "flight_status": user_flight.flight_status,
                }

                user_flights.append(user_flight_dict)

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