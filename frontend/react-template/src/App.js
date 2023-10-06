import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import FlightData from './components/FlightPage/flightPage';
import Login from "./components/Login/login";
import Register from "./components/Register/register";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<FlightData/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
