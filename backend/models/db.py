from decouple import config
import psycopg2
import psycopg2.extras

DB_HOST = config('DB_HOST')
DB_NAME = config('DB_NAME')
DB_USER = config('DB_USER')
DB_PASS = config('DB_PASS')

class Database():
    def __init__(self):
        self.__conn__ = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)
        self.__cursor__ = self.__conn__.cursor(cursor_factory=psycopg2.extras.DictCursor)

    #look into optional params
    def execute(self, sql_query, params=None):
        if params:
            self.__cursor__.execute(sql_query, params)
        else:
            self.__cursor__.execute(sql_query)
            
        
    def fetch_results(self, fetch_all=False):
        if fetch_all:
            return self.__cursor__.fetchall()
        else:
            return self.__cursor__.fetchone()
        
    def commit(self):
        self.__conn__.commit()
        
    def close(self):
        self.__cursor__.close()
        self.__conn__.close()

