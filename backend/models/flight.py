from models.db import Database

db = Database()

class Flight:
    def __init__(self, id, departure, arrival, airline_name, flight_name, flight_status):
        self.id = id
        self.departure = departure
        self.arrival = arrival
        self.airline_name = airline_name
        self.flight_name = flight_name
        self.flight_status = flight_status
        
    def save_flight_data(self, flight):
        try:
            sql_query = """
                INSERT INTO flights (departure, arrival, airline_name, flight_name, flight_status) 
                VALUES (%s, %s, %s, %s, %s)
            """
            params = (flight.departure, flight.arrival, flight.airline_name, flight.flight_name, flight.flight_status)
            
            db.execute(sql_query, params)
            db.commit()
            # cursor.close() not sure if I need this
            return True  
        except Exception as e:
            print(f"Error saving flight: {e}")
        
    @classmethod
    def delete_flight(cls, flight_id):
        try:
            sql_query = "DELETE FROM flights WHERE id = %s"
            params = (flight_id,)

            db.execute(sql_query, params)
            db.commit()

            return True
        except Exception as e:
            print(f"Error deleting flight data: {e}")
            return False
        
    def serialize(self):
        return {
            "id": self.id,
            "departure": self.departure,
            "arrival": self.arrival,
            "airline_name": self.airline_name,
            "flight_name": self.flight_name,
            "flight_status": self.flight_status
        }
        
    @classmethod
    def get_flights(cls):
        try:
            sql_query = 'SELECT * FROM flights'

            db.execute(sql_query)
            flights_data = db.fetch_results(True)
            print("here1")
            #cursor.close()
            flights = []
            for flight_data in flights_data:
                flight = cls(
                id=flight_data['flight_id'], 
                departure=flight_data['departure'],
                arrival=flight_data['arrival'],
                airline_name=flight_data['airline_name'],
                flight_name=flight_data['flight_name'],
                flight_status=flight_data['flight_status']
            )
                flights.append(flight)

            return flights
        except Exception as e:
            print(f"Error fetching flights: {e}")
            return []
        
    @classmethod
    def find_flight(cls, flight_id):
        try:
            sql_query = "SELECT * FROM flights WHERE id = %s"
            params = (flight_id,)

            db.execute(sql_query, params)
            flight_data = db.fetch_results()

            if flight_data:
                id, departure, arrival, airline_name, flight_name, flight_status = flight_data
                return cls(id, departure, arrival, airline_name, flight_name, flight_status)
            else:
                return None 
        except Exception as e:
            print(f"Error finding flight: {e}")
