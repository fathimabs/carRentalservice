import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { HeartIcon, StarIcon, PersonIcon, GearIcon, GasIcon } from '../common/Icons';


const CarCard = ({ car, onFavoriteToggle }) => {

    const navigate = useNavigate();
    const [isFav, setIsFav] = useState(car?.isFavorite || false);
    const [imgError, setImgError] = useState(false);

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
        <div className="bg-white rounded-[20px] p-4 sm:p-5 flex flex-col gap-4 sm:gap-5
                        hover:shadow-lg transition-shadow duration-300 h-full">

            {/* ── Header ── */}
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-[#1A202C] font-bold text-sm sm:text-base leading-tight truncate">
                        {car.name}
                    </h3>
                    <p className="text-[#90A3BF] text-xs font-medium mt-0.5">{car.category}</p>
                </div>
                <button
                    onClick={handleFavorite}
                    className="flex-shrink-0 p-1 rounded-full transition-colors hover:bg-red-50"
                    aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                >
                    <HeartIcon
                        className={`w-5 h-5 transition-colors ${isFav ? 'text-red-500' : 'text-[#90A3BF]'
                            }`}
                    />
                </button>
            </div>

            {/* ── Car Image ── */}
            <div className="relative flex items-center justify-center h-[100px] sm:h-[120px] w-full overflow-hidden">
                <img
                    src={imgError ? 'https://www.pngall.com/wp-content/uploads/13/2022/04/Tesla-Model-3-PNG.png' : (car.image || '')}
                    alt={car.name}
                    className="object-contain h-full w-full drop-shadow-md transition-transform
                               duration-300 hover:scale-105"
                    onError={() => setImgError(true)}
                />

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3
                                bg-black/10 blur-md rounded-full" />
            </div>

            {/* ── Specs ── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[#90A3BF]">
                    <GasIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[11px] sm:text-xs font-medium">{car.gasoline}L</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[#90A3BF]">
                    <GearIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[11px] sm:text-xs font-medium">{car.transmission}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[#90A3BF]">
                    <PersonIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[11px] sm:text-xs font-medium">{car.capacity} People</span>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mt-auto">
                <div>
                    {/* Current price */}
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-[#1A202C] font-bold text-base sm:text-lg">
                            ${car.pricePerDay}/
                        </span>
                        <span className="text-[#90A3BF] text-xs sm:text-sm font-medium">day</span>
                    </div>
                    {/* Strikethrough original price */}
                    {car.originalPrice && (
                        <p className="text-[#90A3BF] text-xs font-medium line-through">
                            ${car.originalPrice}.00
                        </p>
                    )}
                    {/* rating */}
                    {car.rating > 0 && (
                        <div className="flex items-center gap-0.5 mt-1">
                            {renderStars(car.rating)}
                            <span className="text-[#90A3BF] text-[10px] sm:text-xs ml-0.5">
                                ({car.reviewCount})
                            </span>
                        </div>
                    )}
                </div>

                <Button
                    onClick={handleRentNow}
                    variant="primary"
                    className="h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm flex-shrink-0"
                >
                    Rent Now
                </Button>
            </div>
        </div>
    );
};

export default CarCard;