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
        <div className="bg-white rounded-[20px] p-5 flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300">
            {/* ── Header ── */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-[#1A202C] font-bold text-base leading-tight">{car.name}</h3>
                    <p className="text-[#90A3BF] text-xs font-medium mt-0.5">{car.category}</p>
                </div>
                <button
                    onClick={handleFavorite}
                    className="p-1 rounded-full transition-colors hover:bg-red-50"
                    aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                >
                    <HeartIcon
                        className={`w-5 h-5 transition-colors ${
                            isFav ? 'text-red-500' : 'text-[#90A3BF]'
                        }`}
                    />
                </button>
            </div>

            {/* ── Car Image ── */}
            <div className="relative flex items-center justify-center h-[120px]">
                <img
                    src={car.image || '/placeholder-car.png'}
                    alt={car.name}
                    className="object-contain h-full w-full drop-shadow-md"
                    onError={(e) => {
                        e.target.src =
                            'https://www.pngall.com/wp-content/uploads/13/2022/04/Tesla-Model-3-PNG.png';
                    }}
                />
                {/* subtle shadow under car */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/10 blur-md rounded-full" />
            </div>

            {/* ── Specs ── */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[#90A3BF]">
                    <GasIcon />
                    <span className="text-xs font-medium">{car.gasoline}L</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#90A3BF]">
                    <GearIcon />
                    <span className="text-xs font-medium">{car.transmission}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#90A3BF]">
                    <PersonIcon />
                    <span className="text-xs font-medium">{car.capacity} People</span>
                </div>
            </div>

            {/*  Price */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-[#1A202C] font-bold text-lg">${car.pricePerDay}/</span>
                        <span className="text-[#90A3BF] text-sm font-medium">day</span>
                    </div>
                    {car.rating > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                            {renderStars(car.rating)}
                            <span className="text-[#90A3BF] text-xs ml-0.5">({car.reviewCount})</span>
                        </div>
                    )}
                </div>
                <Button
                    onClick={handleRentNow}
                    variant="primary"
                    className="h-9 px-4 text-sm"
                >
                    Rent Now
                </Button>
            </div>
        </div>
    );
};

export default CarCard;