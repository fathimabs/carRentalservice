import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-[#C3D4E9] border-opacity-40">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 sm:py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                    <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-8">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-3xl font-bold text-[#3563E9] tracking-tight">MORENT</span>
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center w-[492px] h-[44px] px-4 rounded-full border border-[#C3D4E9] border-active-40 group focus-within:ring-2 focus-within:ring-[#3563E9]">
                            <svg className="w-6 h-6 text-[#596780]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search something here"
                                className="ml-3 w-full bg-transparent border-none outline-none text-[#596780] font-medium placeholder-[#596780]"
                            />
                            <svg className="w-6 h-6 text-[#596780] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
                        {/* Notification/Action Icons (Figma) */}
                        <div className="hidden sm:flex items-center space-x-3 mr-2">
                            <div className="p-2 border border-[#C3D4E9] border-opacity-40 rounded-full cursor-pointer hover:bg-gray-50">
                                <svg className="w-6 h-6 text-[#596780]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </div>
                            <div className="relative p-2 border border-[#C3D4E9] border-opacity-40 rounded-full cursor-pointer hover:bg-gray-50">
                                <svg className="w-6 h-6 text-[#596780]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
                                <span className="absolute top-2 right-2 w-[11px] h-[11px] bg-[#FF4423] rounded-full border-2 border-white"></span>
                            </div>
                            <div className="p-2 border border-[#C3D4E9] border-opacity-40 rounded-full cursor-pointer hover:bg-gray-50">
                                <svg className="w-6 h-6 text-[#596780]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
                            </div>
                        </div>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full overflow-hidden border border-[#C3D4E9] border-opacity-40">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button onClick={handleLogout} className="text-[#596780] font-bold text-sm hover:text-[#3563E9]">Logout</button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline" size="sm" className="h-[44px]">Log In</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary" size="sm" className="h-[44px]">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
