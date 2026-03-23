import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCar } from '../context/CarContext';
import CarCard from '../components/ui/CarCard';

const Favourites = () => {

    const { favourites } = useCar();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F6F7F9] px-6 py-8">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-[#90A3BF] hover:text-[#3563E9] transition-colors mb-6"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-semibold">Back</span>
            </button>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-[#1A202C] font-bold text-2xl">My Favourites</h1>
                <span className="text-[#90A3BF] text-sm">{favourites.length} cars</span>
            </div>

            {favourites.length === 0 ? (
                <div className="flex flex-col items-center py-20 gap-3">
                   
                    <p className="text-[#1A202C] font-bold text-lg">No favourites yet</p>
                    <p className="text-[#90A3BF] text-sm">Click the heart on any car to save it</p>
                    <button
                        onClick={() => navigate('/cars')}
                        className="mt-2 bg-[#3563E9] text-white px-6 h-11 rounded-[10px] text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Browse Cars
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favourites.map((car) => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourites;