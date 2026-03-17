import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button'
import useCar from "../context/CarContext";


const GasIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 22V8l9-6 9 6v14M10 22V16h4v6" />
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

const SteeringIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeWidth="1.5" d="M12 2v7M5.27 17l5.46-3M13.27 14l5.46 3" />
    </svg>
);

const StarIcon = ({ filled }) => (
    <svg width="14" height="14" viewBox="0 0 24 24"
        fill={filled ? '#FBAD39' : 'none'} stroke="#FBAD39" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const BackIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
);

// ─── Spec item ────────────────────────────────────────────────────────────────
const SpecItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#F6F7F9] last:border-0">
        <span className="text-[#90A3BF] text-sm font-medium">{label}</span>
        <div className="flex items-center gap-2 text-[#596780]">
            {icon}
            <span className="text-sm font-semibold text-[#1A202C]">{value}</span>
        </div>
    </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const DetailsSkeleton = () => (
    <div className="max-w-[1440px] mx-auto px-6 py-8 animate-pulse">
        <div className="h-5 w-20 bg-white rounded-full mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
                <div className="h-72 bg-white rounded-[20px]" />
                <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-white rounded-[16px]" />)}
                </div>
            </div>
            <div className="bg-white rounded-[20px] p-8 flex flex-col gap-5">
                <div className="h-7 w-40 bg-[#F6F7F9] rounded-full" />
                <div className="h-4 w-32 bg-[#F6F7F9] rounded-full" />
                <div className="h-16 w-full bg-[#F6F7F9] rounded-xl" />
                {[1, 2, 3, 4].map((i) => <div key={i} className="h-10 w-full bg-[#F6F7F9] rounded-xl" />)}
            </div>
        </div>
    </div>
);

// ─── Component ────────────────────────────────────────────────────────────────
const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedCar: car, loading, error, loadCarById, clearSelectedCar } = useCar();
    const [activeThumb, setActiveThumb] = useState(0);

    useEffect(() => {
        loadCarById(id);
        return () => clearSelectedCar();
    }, [id]);

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < Math.round(rating)} />
        ));

    // ── Loading ──
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F6F7F9]">
                <DetailsSkeleton />
            </div>
        );
    }

    // ── Error ──
    if (error || !car) {
        return (
            <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-[#596780] font-semibold">{error || 'Car not found'}</p>
                <button
                    onClick={() => navigate('/cars')}
                    className="text-[#3563E9] text-sm font-semibold underline underline-offset-2"
                >
                    Back to listings
                </button>
            </div>
        );
    }

    // Thumbnail images (use same image for now; swap for car.images[] when available)
    const thumbnails = [car.image, car.image, car.image];

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1440px] mx-auto px-6 py-8">

                {/* ── Back button ── */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-[#90A3BF] hover:text-[#3563E9] transition-colors mb-6 group"
                >
                    <BackIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="text-sm font-semibold">Back</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* ── Left: Image panel ── */}
                    <div className="flex flex-col gap-4">

                        {/* Main hero image */}
                        <div className="bg-gradient-to-br from-[#3563E9] to-[#1A3CA8] rounded-[20px] h-64 md:h-80 flex items-center justify-center relative overflow-hidden p-10">
                            {/* Decorative circles */}
                            <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-white/10" />
                            <div className="absolute -bottom-8 -right-4 w-56 h-56 rounded-full bg-white/5" />
                            <img
                                src={thumbnails[activeThumb] || '/placeholder-car.png'}
                                alt={car.name}
                                className="object-contain h-full w-full drop-shadow-2xl relative z-10"
                                onError={(e) => {
                                    e.target.src =
                                        'https://www.pngall.com/wp-content/uploads/13/2022/04/Tesla-Model-3-PNG.png';
                                }}
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-3 gap-3">
                            {thumbnails.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveThumb(i)}
                                    className={`rounded-[16px] overflow-hidden h-20 flex items-center justify-center p-3 transition-all ${activeThumb === i
                                        ? 'ring-2 ring-[#3563E9] bg-[#EBF0FF]'
                                        : 'bg-white hover:ring-2 hover:ring-[#C3D4E9]'
                                        }`}
                                >
                                    <img
                                        src={src || '/placeholder-car.png'}
                                        alt={`View ${i + 1}`}
                                        className="object-contain h-full w-full"
                                        onError={(e) => {
                                            e.target.src =
                                                'https://www.pngall.com/wp-content/uploads/13/2022/04/Tesla-Model-3-PNG.png';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Details panel ── */}
                    <div className="bg-white rounded-[20px] p-6 md:p-8 flex flex-col gap-6">

                        {/* Title + rating */}
                        <div>
                            <h1 className="text-[#1A202C] font-bold text-2xl md:text-3xl leading-tight">
                                {car.name}
                            </h1>
                            {car.rating > 0 && (
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex gap-0.5">{renderStars(car.rating)}</div>
                                    <span className="text-[#596780] text-sm font-medium">
                                        {car.reviewCount}+ Reviewer
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-[#596780] text-sm leading-relaxed">
                            {car.description ||
                                `Experience the thrill of driving the ${car.name}. This ${car.category.toLowerCase()} delivers exceptional performance, comfort, and style — perfect for every journey.`}
                        </p>

                        {/* Specs grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <SpecItem icon={<GasIcon />} label="Fuel Type" value={`${car.gasoline}L`} />
                            <SpecItem icon={<PersonIcon />} label="Capacity" value={`${car.capacity} Persons`} />
                            <SpecItem icon={<GearIcon />} label="Transmission" value={car.transmission} />
                            <SpecItem icon={<SteeringIcon />} label="Steering" value={car.steering || 'Power'} />
                            <SpecItem label="Category" icon={<span className="text-xs">🏷️</span>} value={car.category} />
                            <SpecItem label="Fuel Type" icon={<span className="text-xs">⛽</span>} value={car.fuelType} />
                        </div>

                        {/* Price + CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#F6F7F9]">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[#1A202C] font-bold text-2xl">
                                        ${car.pricePerDay}
                                    </span>
                                    <span className="text-[#90A3BF] text-sm font-medium">/day</span>
                                </div>
                                <div className="mt-1">
                                    {car.isAvailable ? (
                                        <span className="text-xs font-semibold text-green-500">● Available</span>
                                    ) : (
                                        <span className="text-xs font-semibold text-red-400">● Not Available</span>
                                    )}
                                </div>
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

                {/* ── Reviews placeholder ── */}
                {car.reviewCount > 0 && (
                    <section className="mt-8 bg-white rounded-[20px] p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[#1A202C] font-bold text-xl">Reviews</h2>
                            <span className="bg-[#3563E9] text-white text-sm font-bold px-3 py-1 rounded-full">
                                {car.reviewCount}+
                            </span>
                        </div>
                        <p className="text-[#90A3BF] text-sm">
                            Reviews will appear here once the reviews feature is connected.
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CarDetails