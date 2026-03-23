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
        <nav className="bg-white border-b border-[#C3D4E966] sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">

                {/* ================= MOBILE ================= */}
                <div className="flex flex-col gap-4 py-4 md:hidden">

                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <span className="text-[24px] font-bold text-[#3563E9]">MORENT</span>
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative" ref={mobileDropdownRef}>
                                <div
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="w-[40px] h-[40px] rounded-full overflow-hidden border border-[#C3D4E966]"
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user?.name}`}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#C3D4E966] rounded-lg shadow-md">
                                        <div className="p-3 border-b">
                                            <p className="text-sm font-semibold">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                        <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-50">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="text-[#3563E9] font-semibold">
                                Login
                            </Link>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <form
                            onSubmit={handleSearch}
                            className="flex-1 h-[44px] flex items-center px-4 border border-[#C3D4E966] rounded-lg"
                        >
                            <SearchIcon className="w-5 h-5 text-[#596780]" />
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search..."
                                className="ml-2 w-full outline-none text-sm"
                            />
                        </form>

                        <div className="w-[44px] h-[44px] flex items-center justify-center border border-[#C3D4E966] rounded-lg">
                            <FilterIcon className="w-5 h-5 text-[#596780]" />
                        </div>
                    </div>
                </div>

                {/* ================= DESKTOP ================= */}
                <div className="hidden md:flex items-center justify-between h-[124px]">

                    {/* LEFT GROUP */}
                    <div className="flex items-center gap-8">

                        {/* Logo */}
                        <Link to="/">
                            <span className="text-[32px] font-bold text-[#3563E9] tracking-[-0.03em]">
                                MORENT
                            </span>
                        </Link>

                        {/* Search (FIXED SIZE) */}
                        <form
                            onSubmit={handleSearch}
                            className="w-[492px] h-[44px] flex items-center px-4 border border-[#C3D4E966] rounded-full focus-within:ring-2 focus-within:ring-[#3563E9]"
                        >
                            <SearchIcon className="w-5 h-5 text-[#596780]" />

                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                    if (e.target.value === '') setFilters({ search: '' });
                                }}
                                placeholder="Search something here"
                                className="ml-3 w-full outline-none text-sm"
                            />

                            <FilterIcon className="w-5 h-5 text-[#596780]" />
                        </form>
                    </div>


                    {/* RIGHT */}
                    <div className="flex items-center gap-4">

                        <div className="flex items-center gap-3">
                            <div
                                onClick={() => navigate('/favourites')}
                                className="relative w-[44px] h-[44px] flex items-center justify-center border border-[#C3D4E966] rounded-full cursor-pointer"
                            >
                                <HeartIcon className="w-5 h-5 text-[#596780]" />
                                {favourites.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                                        {favourites.length}
                                    </span>
                                )}
                            </div>

                            <div className="relative w-[44px] h-[44px] flex items-center justify-center border border-[#C3D4E966] rounded-full">
                                <NotificationIcon className="w-5 h-5 text-[#596780]" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </div>

                            <div className="w-[44px] h-[44px] flex items-center justify-center border border-[#C3D4E966] rounded-full">
                                <SettingsIcon className="w-5 h-5 text-[#596780]" />
                            </div>
                        </div>

                        {isAuthenticated ? (
                            <div className="relative" ref={desktopDropdownRef}>
                                <div
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="w-[44px] h-[44px] rounded-full overflow-hidden border border-[#C3D4E966] cursor-pointer"
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user?.name}`}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white border border-[#C3D4E966] rounded-xl shadow-lg">
                                        <div className="p-4 border-b">
                                            <p className="text-sm font-bold">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary">Sign Up</Button>
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