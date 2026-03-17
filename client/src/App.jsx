import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";


import CarList from "./pages/CarList";
import CarDetails from "./pages/CarDetails";
import { CarProvider } from "./context/CarContext";


import Home from "./pages/Home";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";


import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <CarProvider>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>

              {/* Home + Booking */}
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/my-bookings" element={<MyBookings />} />

              {/* Car Features */}
              <Route path="/cars" element={<CarList />} />
              <Route path="/cars/:id" element={<CarDetails />} />

            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </CarProvider>


      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />

          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>


    </BrowserRouter>
  );
}

export default App;