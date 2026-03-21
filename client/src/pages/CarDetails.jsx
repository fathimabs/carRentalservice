import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useCar } from "../context/CarContext";
import {SpecRow,GasIcon,GearIcon,PersonIcon,StarIcon} from "../components/common/Icons"



const FALLBACK = "https://www.pngall.com/wp-content/uploads/13/2022/04/Tesla-Model-3-PNG.png";

const CarDetails = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedCar: car, loading, error, loadCarById, clearSelectedCar } = useCar();

    const [activeThumb, setActiveThumb] = useState(0);
    const [imgError, setImgError] = useState(false);

    useEffect(() => { 
        loadCarById(id);
        return () => clearSelectedCar();
    }, [id]);

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => <StarIcon key={i} filled={i < Math.round(rating)} />);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
                <p className="text-[#90A3BF] text-sm">Loading car details...</p>
            </div>
        );
    }

    // Error state
    if (error || !car) {
        return (
            <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-center gap-4 px-4">
                <p className="text-[#596780] font-semibold">{error || "Car not found"}</p>
                <button
                    onClick={() => navigate("/cars")}
                    className="text-[#3563E9] text-sm font-semibold underline"
                >
                    Back to listings
                </button>
            </div>
        );
    }

    const imgSrc = imgError || !car.image ? FALLBACK : car.image;

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-8">

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

                {/* Main layout */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* Left — images */}
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">

                        {/* Hero image */}
                        <div className="bg-gradient-to-br from-[#3563E9] to-[#1A3CA8] rounded-[20px] h-56 sm:h-72 flex items-center justify-center relative overflow-hidden p-8">
                            <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-white/10" />
                            <div className="absolute -bottom-8 -right-4 w-56 h-56 rounded-full bg-white/5" />
                            <img
                                src={imgSrc}
                                alt={car.name}
                                className="object-contain h-full w-full drop-shadow-2xl relative z-10"
                                onError={() => setImgError(true)}
                            />
                        </div>

                        {/* 3 thumbnails */}
                        <div className="flex gap-3">
                            {[0, 1, 2].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveThumb(i)}
                                    className={`flex-1 h-16 sm:h-20 rounded-[16px] flex items-center justify-center p-2 transition-all
                                        ${activeThumb === i ? "ring-2 ring-[#3563E9] bg-[#EBF0FF]" : "bg-white hover:ring-2 hover:ring-[#C3D4E9]"}`}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={`View ${i + 1}`}
                                        className="object-contain h-full w-full"
                                        onError={() => setImgError(true)}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right — details */}
                    <div className="bg-white rounded-[20px] p-5 sm:p-8 flex flex-col gap-5 w-full lg:w-1/2">

                        {/* Name + stars */}
                        <div>
                            <h1 className="text-[#1A202C] font-bold text-xl sm:text-3xl">{car.name}</h1>
                            {car.rating > 0 && (
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex">{renderStars(car.rating)}</div>
                                    <span className="text-[#596780] text-sm">{car.reviewCount}+ Reviewer</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-[#596780] text-sm leading-relaxed">
                            {car.description || `Experience the thrill of driving the ${car.name}.`}
                        </p>

                        {/* Specs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <SpecRow label="Gasoline"     value={`${car.gasoline}L`}         icon={<GasIcon />} />
                            <SpecRow label="Capacity"     value={`${car.capacity} Persons`}   icon={<PersonIcon />} />
                            <SpecRow label="Transmission" value={car.transmission}            icon={<GearIcon />} />
                            <SpecRow label="Steering"     value={car.steering || "Power"}     icon={<GearIcon />} />
                            <SpecRow label="Category"     value={car.category}                icon={<span>🏷️</span>} />
                            <SpecRow label="Fuel Type"    value={car.fuelType}                icon={<span>⛽</span>} />
                        </div>

                        {/* Price + book */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[#1A202C] font-bold text-2xl">${car.pricePerDay}</span>
                                    <span className="text-[#90A3BF] text-sm">/day</span>
                                </div>
                                {car.originalPrice && (
                                    <p className="text-[#90A3BF] text-xs line-through">${car.originalPrice}.00</p>
                                )}
                                {car.isAvailable
                                    ? <span className="text-xs font-semibold text-green-500 mt-1 block">● Available</span>
                                    : <span className="text-xs font-semibold text-red-400 mt-1 block">● Not Available</span>
                                }
                            </div>
                            <Button
                                variant="primary"
                                onClick={() => navigate(`/booking/${car._id}`)}
                                disabled={!car.isAvailable}
                                className="h-[44px] px-6"
                            >
                                Rent Now
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Reviews section */}
                {car.reviewCount > 0 && (
                    <div className="mt-8 bg-white rounded-[20px] p-5 sm:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[#1A202C] font-bold text-xl">Reviews</h2>
                            <span className="bg-[#3563E9] text-white text-sm font-bold px-3 py-1 rounded-full">
                                {car.reviewCount}+
                            </span>
                        </div>
                        <p className="text-[#90A3BF] text-sm">Reviews will appear here.</p>
                    </div>
                )}

            </div>
            
        </div>
    );
};

export default CarDetails;