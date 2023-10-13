# FlySky

Welcome to the FlySky project! This web application allows users to search for flights, view flight details, and book flights.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- **Flight Search**: Users can search for flights by specifying departure and arrival airports, departure and arrival dates.

- **Filter Flights**: Users can filter flights by an airline.

- **User Authentication**: Users can create accounts, log in, and view their booked flights.

- **Responsive Design**: The application is designed to work on both desktop and mobile devices.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

- **npm**: npm is the package manager for JavaScript. It comes with Node.js.

- **Python**: You will need Python installed to run the Flask backend. You can download it from [python.org](https://www.python.org/downloads/).

- **PostgreSQL**: This project uses PostgreSQL as the database. You need to have it installed and set up.

### Installation

1.  Clone the repository:
    `git clone https://github.com/valeriyababenko3/FlySky`

2.  Install frontend dependencies:
    `cd frontend
cd react-template
npm install`

3.  Install backend dependencies:
    `cd ..
cd ..
cd backend
pip install -r requirements.txt`

4.  Create a .env file in the backend directory for your environment variables (database connection, API keys, etc.). Make sure to include your PostgreSQL database URL.

5.  Initialize and migrate the database

6.  Run the frontend and backend development servers:
    `cd frontend
 cd react-template
 npm run start`

        `cd backend
         flask run`

### Usage

- Open the web application, and you'll see a flight search form
- Enter your search criteria and click "Search" to find flights.
- Use the "Filter Flights" section to narrow down search results by an airline
- If you want to book flights, create an account or log in to an existing one

### Technologies Used

- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
