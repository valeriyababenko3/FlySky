import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import FlightData from './components/FlightPage';
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<FlightData/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
      </Routes>
      {/* <NavBar />
      <FlightData /> */}
    </div>
  );
}

export default App;
