-- Drop the user_flights table
DROP TABLE IF EXISTS user_flights;

-- Drop the flights table
DROP TABLE IF EXISTS flights;

-- Drop the users table
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Create the flights table
CREATE TABLE IF NOT EXISTS flights (
    id SERIAL PRIMARY KEY,
    departure TIMESTAMP NOT NULL,
    arrival TIMESTAMP NOT NULL,
    airline_name VARCHAR(255) NOT NULL,
    flight_name VARCHAR(255) NOT NULL,
    flight_status VARCHAR(255) NOT NULL
);

-- Create the user_flights table (join table)
CREATE TABLE IF NOT EXISTS user_flights (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    flight_id INT REFERENCES flights(id),
    CONSTRAINT unique_user_flight UNIQUE (user_id, flight_id)
);