import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useCar } from '../../context/CarContext';
import Button from '../common/Button';
import { SearchIcon, FilterIcon, HeartIcon, NotificationIcon, SettingsIcon } from '../common/Icons';

const Navbar = () => {

    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const { setFilters, favourites } = useCar();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const mobileDropdownRef = useRef(null);
    const desktopDropdownRef = useRef(null);

    const handleLogout = () => {
        setIsProfileOpen(false);
        logout();
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue.trim()) return;
        setFilters({ search: searchValue.trim() });
        navigate('/cars');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideMobile = mobileDropdownRef.current && mobileDropdownRef.current.contains(event.target);
            const isClickInsideDesktop = desktopDropdownRef.current && desktopDropdownRef.current.contains(event.target);
            if (!isClickInsideMobile && !isClickInsideDesktop) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white border-b border-[#C3D4E9] border-opacity-40 sticky top-0 z-50 h-auto md:h-[124px] flex items-center">
            <div className="max-w-[1440px] w-full mx-auto px-6 py-6 pb-8 md:py-0">

                {/* --- MOBILE LAYOUT --- */}
                <div className="flex flex-col gap-8 md:hidden">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-[24px] font-bold text-[#3563E9] leading-[150%] tracking-[-0.03em] font-['Plus_Jakarta_Sans']">MORENT</span>
                        </Link>
                        {isAuthenticated ? (
                            <div className="relative" ref={mobileDropdownRef}>
                                <div
                                    className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 cursor-pointer border border-[#C3D4E9] border-opacity-40"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-[#C3D4E9] border-opacity-40 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-5 py-3 border-b border-[#C3D4E9] border-opacity-40">
                                            <p className="text-sm font-bold text-[#1A202C]">{user?.name}</p>
                                            <p className="text-xs font-medium text-[#90A3BF] truncate">{user?.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-50 transition-colors"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="text-[#3563E9] text-sm font-semibold">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Search */}
                    <div className="flex items-center gap-4">
                        <form
                            onSubmit={handleSearch}
                            className="flex-grow flex items-center h-[48px] px-6 rounded-[10px] border border-[#C3D4E9] border-opacity-40 bg-white focus-within:ring-2 focus-within:ring-[#3563E9]"
                        >
                            <SearchIcon className="w-6 h-6 text-[#596780] mr-3" />
                            <input
                                type="text"
                                placeholder="Search something here"
                                className="w-full bg-transparent border-none outline-none text-[#596780] text-sm font-medium placeholder-[#596780]"
                            />
                        </form>
                        <div className="w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center rounded-[10px] border border-[#C3D4E9] border-opacity-40 bg-white cursor-pointer hover:bg-gray-50 text-[#596780]">
                            <FilterIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* --- DESKTOP LAYOUT --- */}
                <div className="hidden md:flex items-center justify-between gap-4">
                    {/* Left: Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <span className="text-3xl font-bold text-[#3563E9] tracking-tight">MORENT</span>
                    </Link>

                    {/* Desktop Search Bar */}
                    <div className="flex-grow max-w-[492px] flex items-center h-[44px] px-4 rounded-full border border-[#C3D4E9] border-opacity-40 group focus-within:ring-2 focus-within:ring-[#3563E9] ml-8">
                        <SearchIcon className="w-5 h-5 text-[#596780]" />
                        <input
                            type="text"
                            placeholder="Search something here"
                            className="ml-3 w-full bg-transparent border-none outline-none text-[#596780] font-medium placeholder-[#596780]"
                        />
                        <FilterIcon className="w-5 h-5 text-[#596780] cursor-pointer" />
                    </div>

                    {/* Right: Actions & User */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Icons */}
                        <div className="flex items-center gap-3">

                            <div
                                onClick={() => navigate('/favourites')}
                                className="relative w-11 h-11 flex items-center justify-center border border-[#C3D4E9] border-opacity-40 rounded-full cursor-pointer hover:bg-gray-50 text-[#596780] transition-all"
                            >
                                <HeartIcon className="w-6 h-6" />
                                {favourites.length > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF4423] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {favourites.length}
                                    </span>
                                )}
                            </div>
                            <div className="relative p-2 border border-[#C3D4E9] border-opacity-40 rounded-full cursor-pointer hover:bg-gray-50 text-[#596780]">
                                <NotificationIcon className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF4423] rounded-full"></span>
                            </div>
                            <div className="p-2 border border-[#C3D4E9] border-opacity-40 rounded-full cursor-pointer hover:bg-gray-50 text-[#596780]">
                                <SettingsIcon className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Profile / Auth */}
                        {isAuthenticated ? (
                            <div className="relative" ref={desktopDropdownRef}>
                                <div
                                    className="w-11 h-11 rounded-full overflow-hidden border border-[#C3D4E9] border-opacity-40 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-[#3563E9] transition-all"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 border border-[#C3D4E9] border-opacity-40 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-5 py-3 border-b border-[#C3D4E9] border-opacity-40">
                                            <p className="text-sm font-bold text-[#1A202C]">{user?.name}</p>
                                            <p className="text-xs font-medium text-[#90A3BF] truncate">{user?.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-5 py-3 text-sm font-semibold text-red-600 hover:bg-gray-50 transition-colors"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline" size="sm" className="h-10 px-4">Log In</Button>
                                </Link>
                                <Link to="/signup" className="hidden sm:block">
                                    <Button variant="primary" size="sm" className="h-10 px-4">Sign Up</Button>
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