import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import { HeartIcon, StarIcon, PersonIcon, GearIcon, GasIcon } from '../common/Icons'
import { useCar } from '../../context/CarContext'

const CarCard = ({ car }) => {

    const navigate = useNavigate()
    const { toggleFavourite, favourites } = useCar()

    const [isFav, setIsFav] = useState(
        favourites.some(f => f._id === car?._id) || car?.isFavorite || false
    )
    const [imgError, setImgError] = useState(false)

    const handleFavorite = (e) => {
        e.stopPropagation()
        setIsFav((prev) => !prev)
        toggleFavourite(car)
    }

    const handleRentNow = () => navigate(`/cars/${car._id}`)

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < Math.round(rating)} />
        ))

    if (!car) return null

    return (
        <div className="bg-white w-[317px] h-[388px] rounded-[10px] p-5 flex flex-col gap-5 flex-shrink-0 hover:shadow-lg transition-shadow duration-300">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-[#1A202C] font-bold text-base leading-tight truncate">{car.name}</h3>
                    <p className="text-[#90A3BF] text-xs font-medium mt-1">{car.category}</p>
                </div>
                <button onClick={handleFavorite} className="flex-shrink-0 p-1 rounded-full hover:bg-red-50 transition-colors">
                    <HeartIcon className={`w-5 h-5 ${isFav ? 'text-red-500' : 'text-[#90A3BF]'}`} />
                </button>
            </div>

            {/* Car Image */}
            <div className="relative flex items-center justify-center h-[120px] w-full">
                <img
                    src={imgError ? 'https://www.pngall.com/wp-content/uploads/13/2022/04/Tesla-Model-3-PNG.png' : car.image || ''}
                    alt={car.name}
                    className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
                    onError={() => setImgError(true)}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/10 blur-md rounded-full" />
            </div>

            {/* Specs */}
            <div className="flex items-center justify-between text-[#90A3BF]">
                <div className="flex items-center gap-1">
                    <GasIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">{car.gasoline}L</span>
                </div>
                <div className="flex items-center gap-1">
                    <GearIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">{car.transmission}</span>
                </div>
                <div className="flex items-center gap-1">
                    <PersonIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">{car.capacity} People</span>
                </div>

            </div>

            {/* Price + Button */}
            <div className="flex items-center justify-between mt-auto">
                <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[#1A202C] font-bold text-lg">${car.pricePerDay}/</span>
                        <span className="text-[#90A3BF] text-sm font-medium">day</span>
                    </div>
                    {car.originalPrice && (
                        <p className="text-[#90A3BF] text-xs line-through">${car.originalPrice}.00</p>
                    )}
                    {car.rating > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                            {renderStars(car.rating)}
                            <span className="text-[#90A3BF] text-xs">({car.reviewCount})</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleRentNow}
                    variant="primary"
                    className="w-[116px] h-[44px] px-5 rounded-[4px] text-[16px] font-semibold leading-[150%] tracking-[-0.02em] text-white"
                >
                    Rent Now
                </button>

            </div>

        </div>
    )
}

export default CarCard