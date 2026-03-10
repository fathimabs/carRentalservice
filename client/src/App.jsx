import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './routes/ProtectedRoute';


// Simple placeholder for the Home page within the Layout
const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 text-center px-4">
            <h1 className="text-3xl font-bold text-[#1A202C] mb-4">Welcome to MORENT</h1>
            <p className="text-[#90A3BF] text-lg max-w-sm">
                (Home page content is out of current scope)
            </p>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            {/* CarProvider wraps everything so context is accessible across all routes */}
           
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

                    {/* Catch all - redirect unknown routes to login */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
         
        </BrowserRouter>
    );
}

export default App;