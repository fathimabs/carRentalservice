import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoute />}>
          {/* Main Layout Wrapper for Protected Pages */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        {/* Catch all - redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
