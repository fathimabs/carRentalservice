import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { HeartIcon } from '../common/Icons';

const GasIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="M3 22V8l9-6 9 6v14M10 22V16h4v6" />
        <circle cx="14" cy="10" r="1.5" fill="currentColor" />
    </svg>
);

const GearIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeWidth="1.5"
            d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
);

const PersonIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const StarIcon = ({ filled }) => (
    <svg width="12" height="12" viewBox="0 0 24 24"
        fill={filled ? '#FBAD39' : 'none'} stroke="#FBAD39" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// ─── Component ───
const CarCard = ({ car, onFavoriteToggle }) => {
    const navigate = useNavigate();
    const [isFav, setIsFav] = useState(car?.isFavorite || false);

    const handleFavorite = (e) => {
        e.stopPropagation();
        setIsFav((prev) => !prev);
        onFavoriteToggle?.(car._id, !isFav);
    };

    const handleRentNow = () => navigate(`/cars/${car._id}`);

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < Math.round(rating)} />
        ));

    if (!car) return null;

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between 
                  shadow-[0_4px_24px_rgba(0,0,0,0.04)] 
                  hover:shadow-[0_6px_30px_rgba(0,0,0,0.08)] transition">

            {/* HEADER */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-[#1A202C] font-semibold text-[16px] leading-tight">
                        {car.name}
                    </h3>
                    <p className="text-[#90A3BF] text-[13px] mt-1">
                        {car.category}
                    </p>
                </div>

                <button
                    onClick={handleFavorite}
                    className="p-1"
                >
                    <HeartIcon
                        className={`w-5 h-5 ${isFav ? "text-red-500" : "text-[#90A3BF]"
                            }`}
                    />
                </button>
            </div>

            <div className="relative flex items-end justify-center h-[120px] mt-4">
                <img
                    src={car.image}
                    alt={car.name}
                    className={`max-h-[70px] w-auto object-contain ${car.flip ? "scale-x-[-1]" : ""
                        }`}
                />

                <div className="absolute bottom-2 w-[60%] h-[8px] bg-black/10 blur-md rounded-full" />
            </div>

            {/* SPECS */}
            <div className="flex justify-between items-center mt-4 text-[#90A3BF] text-[12px] font-medium">

                <div className="flex items-center gap-1">
                    <GasIcon className="w-[14px] h-[14px]" />
                    <span>{car.gasoline}L</span>
                </div>

                <div className="flex items-center gap-1">
                    <GearIcon className="w-[14px] h-[14px]" />
                    <span>{car.transmission}</span>
                </div>

                <div className="flex items-center gap-1">
                    <PersonIcon className="w-[14px] h-[14px]" />
                    <span>{car.capacity} People</span>
                </div>

            </div>

            {/* PRICE + BUTTON */}
            <div className="flex justify-between items-center mt-5">

                <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[#1A202C] font-bold text-[18px]">
                            ${car.pricePerDay}.00
                        </span>
                        <span className="text-[#90A3BF] text-[13px]">/day</span>
                    </div>

                    {car.oldPrice && (
                        <p className="text-[#90A3BF] text-[12px] line-through mt-1">
                            ${car.oldPrice}.00
                        </p>
                    )}
                </div>

                <button
                    onClick={handleRentNow}
                    className="bg-blue-600 hover:bg-blue-700 text-white 
                   px-5 py-2 rounded-lg text-[13px] font-medium"
                >
                    Rent Now
                </button>

            </div>

        </div>
    );
};

export default CarCard;