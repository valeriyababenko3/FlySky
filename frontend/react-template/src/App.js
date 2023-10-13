import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Booking from "./components/Booking";
import FilteredFlights from "./components/FilteredFlightsPage";
import Header from "./components/Header/header";
import MainContent from "./components/HomePage/MainPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/booking" element={<Booking/>} />
        <Route exact path="/userflights" element={<FilteredFlights/>} />
      </Routes> 
      <Header />
      <MainContent />
      <Footer />
      {/* <NavBar />
      <FlightData /> */}
    </div>
  );
}

export default App;
