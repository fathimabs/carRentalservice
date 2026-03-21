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
    <div className="bg-white rounded-[20px] p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 hover:shadow-lg transition-shadow duration-300 h-full">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="text-[#1A202C] font-bold text-sm sm:text-base truncate">
            {car.name}
          </h3>
          <p className="text-[#90A3BF] text-xs font-medium mt-0.5">
            {car.category}
          </p>
        </div>

        <button
          onClick={handleFavorite}
          className="p-1 rounded-full hover:bg-red-50"
        >
          <HeartIcon
            className={`w-5 h-5 ${isFav ? 'text-red-500' : 'text-[#90A3BF]'}`}
          />
        </button>
      </div>

      {/* Image */}
      <div className="relative flex items-center justify-center h-[110px] sm:h-[120px] w-full">
        <img
          src={
            imgError
              ? 'https://www.pngall.com/wp-content/uploads/13/2022/04/Tesla-Model-3-PNG.png'
              : car.image || ''
          }
          alt={car.name}
          className="object-contain h-full w-full hover:scale-105 transition-transform"
          onError={() => setImgError(true)}
        />
        <div className="absolute bottom-0 w-3/4 h-3 bg-black/10 blur-md rounded-full" />
      </div>

      {/* Specs */}
      <div className="flex justify-between text-[#90A3BF]">
        <div className="flex items-center gap-1">
          <GasIcon className="w-4 h-4" />
          <span className="text-xs">{car.gasoline}L</span>
        </div>
        <div className="flex items-center gap-1">
          <GearIcon className="w-4 h-4" />
          <span className="text-xs">{car.transmission}</span>
        </div>
        <div className="flex items-center gap-1">
          <PersonIcon className="w-4 h-4" />
          <span className="text-xs">{car.capacity} People</span>
        </div>
      </div>

      {/* Price + Button */}
      <div className="flex justify-between items-center mt-auto">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-[#1A202C] text-base sm:text-lg">
              ${car.pricePerDay}/
            </span>
            <span className="text-[#90A3BF] text-sm">day</span>
          </div>

          {car.originalPrice && (
            <p className="text-xs text-[#90A3BF] line-through">
              ${car.originalPrice}
            </p>
          )}

          {car.rating > 0 && (
            <div className="flex items-center gap-1 mt-1">
              {renderStars(car.rating)}
              <span className="text-xs text-[#90A3BF]">
                ({car.reviewCount})
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={handleRentNow}
          variant="primary"
          className="px-3 sm:px-4 h-9 text-sm"
        >
          Rent Now
        </Button>
      </div>
    </div>
  );
};

export default CarCard;