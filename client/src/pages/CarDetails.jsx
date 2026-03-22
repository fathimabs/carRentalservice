import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import { useCar } from "../context/CarContext"
import { HeartIcon,StarIcon,SpecRow } from "../components/common/Icons"
import FilterSidebar from "../components/ui/FilterSidebar"
import CarCard from "../components/ui/CarCard"
import ReviewCard from "../components/ui/ReviewCard"


const FALLBACK = "https://www.pngall.com/wp-content/uploads/13/2022/04/Tesla-Model-3-PNG.png";

const CarDetails = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const { selectedCar: car, loading, error, cars, loadCarById, loadCars, clearSelectedCar } = useCar()

    const [activeThumb, setActiveThumb] = useState(0)
    const [imgError, setImgError] = useState(false)
    const [showAllReviews, setShowAllReviews] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {

        loadCarById(id)
        loadCars({ limit: 8 })

        return () => clearSelectedCar()
    }, [id]);

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => <StarIcon key={i} filled={i < Math.round(rating)} />)

    const reviews = car?.reviews || []
    const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2)
    const recentCars = cars.filter((c) => c._id !== id).slice(0, 4)
    const recommendedCars = cars.filter((c) => c._id !== id && c.category === car?.category).slice(0, 4)

    if (loading) {

        return (
            <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
                <p className="text-[#90A3BF] text-sm">Loading car details...</p>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-center gap-4 px-4">
                <p className="text-[#596780] font-semibold">{error || "Car not found"}</p>
                <button onClick={() => navigate("/cars")} className="text-[#3563E9] text-sm font-semibold underline">
                    Back to listings
                </button>
            </div>
        );
    }

    const imgSrc = imgError || !car.image ? FALLBACK : car.image

    return (
        <div className="min-h-screen bg-[#F6F7F9] flex">

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}
            
            <aside className={`
                fixed top-0 left-0 h-full w-[260px] z-50 bg-white shadow-xl
                overflow-y-auto pt-6 pb-10 px-5 transition-transform duration-300
                lg:static lg:translate-x-0 lg:shadow-none lg:bg-white
                lg:z-auto lg:overflow-y-auto lg:flex-shrink-0 lg:w-[260px]
                lg:h-auto lg:min-h-screen lg:pt-6 lg:px-5 lg:pb-10
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex justify-between items-center mb-5 lg:hidden">
                    <span className="text-[#1A202C] font-bold">Filters</span>
                    <button onClick={() => setIsSidebarOpen(false)}>✕</button>
                </div>
                <FilterSidebar />
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0 flex flex-col gap-6 px-4 sm:px-6 py-6">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-[#90A3BF] hover:text-[#3563E9] transition-colors self-start"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-semibold">Back</span>
                </button>

                {/* Car image + details */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* Left — images */}
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
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
                        <div className="flex gap-3">
                            {[0, 1, 2].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveThumb(i)}
                                    className={`flex-1 h-16 sm:h-20 rounded-[16px] flex items-center justify-center p-2 transition-all
                                        ${activeThumb === i ? "ring-2 ring-[#3563E9] bg-[#EBF0FF]" : "bg-white hover:ring-2 hover:ring-[#C3D4E9]"}`}
                                >
                                    <img src={imgSrc} alt={`View ${i + 1}`} className="object-contain h-full w-full" onError={() => setImgError(true)} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right — details */}
                    <div className="bg-white rounded-[20px] p-5 sm:p-8 flex flex-col gap-5 w-full lg:w-1/2">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-[#1A202C] font-bold text-xl sm:text-3xl">{car.name}</h1>
                                {car.rating > 0 && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex">{renderStars(car.rating)}</div>
                                        <span className="text-[#596780] text-sm">{car.reviewCount}+ Reviewer</span>
                                    </div>
                                )}
                            </div>
                            <button className="p-1 rounded-full hover:bg-red-50 transition-colors">
                                <HeartIcon className="w-5 h-5 text-[#90A3BF]" />
                            </button>
                        </div>

                        <p className="text-[#596780] text-sm leading-relaxed">
                            {car.description || `Experience the thrill of driving the ${car.name}.`}
                        </p>

                        <div className="grid grid-cols-2 gap-x-8">
                            <SpecRow label="Type Car" value={car.category} />
                            <SpecRow label="Capacity" value={`${car.capacity} Person`} />
                            <SpecRow label="Steering" value={car.steering || "Manual"} />
                            <SpecRow label="Gasoline" value={`${car.gasoline}L`} />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[#1A202C] font-bold text-2xl">${car.pricePerDay}/</span>
                                    <span className="text-[#90A3BF] text-sm">days</span>
                                </div>
                                {car.originalPrice && (
                                    <p className="text-[#90A3BF] text-xs line-through">${car.originalPrice}.00</p>
                                )}
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

                {/* Reviews */}
                <div className="bg-white rounded-[10px] p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-[#1A202C] font-bold text-xl">Reviews</h2>
                        <span className="bg-[#3563E9] text-white text-sm font-bold px-3 py-1 rounded-full">
                            {reviews.length}
                        </span>
                    </div>

                    {reviews.length === 0 ? (
                        <p className="text-[#90A3BF] text-sm">No reviews yet.</p>
                    ) : (
                        <>
                            <div>
                                {visibleReviews.map((review, i) => (
                                    <ReviewCard key={i} {...review} />
                                ))}
                            </div>
                            {reviews.length > 2 && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={() => setShowAllReviews((prev) => !prev)}
                                        className="flex items-center gap-2 px-5 py-2.5 text-[#90A3BF] font-semibold text-base hover:text-[#3563E9] transition-colors"
                                    >
                                        {showAllReviews ? 'Show Less' : 'Show All'}
                                        <svg className={`w-4 h-4 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Recent Car */}
                {recentCars.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[#90A3BF] text-sm font-semibold">Recent Car</h2>
                            <button onClick={() => navigate('/cars')} className="text-[#3563E9] text-sm font-semibold hover:underline">
                                View All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recentCars.map((c) => (
                                <CarCard key={c._id} car={c} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendation Car */}
                {recommendedCars.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[#90A3BF] text-sm font-semibold">Recomendation Car</h2>
                            <button onClick={() => navigate('/cars')} className="text-[#3563E9] text-sm font-semibold hover:underline">
                                View All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recommendedCars.map((c) => (
                                <CarCard key={c._id} car={c} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CarDetails;