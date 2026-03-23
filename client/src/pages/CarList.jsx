import React, { useEffect, useState } from 'react'
import { useCar } from '../context/CarContext'
import CarCard from '../components/ui/CarCard'
import FilterSidebar from '../components/ui/FilterSidebar'
import PickupDropoff from '../components/ui/PickupDropoff'
import { FilterIcon } from '../components/common/Icons'
import Button from '../components/common/Button'

const CarList = () => {

    const { cars = [], loading, error, total, filters, loadCars } = useCar()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [visibleCount, setVisibleCount] = useState(8)
    const [pickupLocation, setPickupLocation] = useState('')
    const [pickupDate, setPickupDate] = useState('')
    const [dropoffDate, setDropoffDate] = useState('')

    useEffect(() => {
        setVisibleCount(8)
    }, [filters])

    useEffect(() => {
        loadCars({ ...filters, limit: 100 })
    }, [filters])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const visibleCars = cars.slice(0, visibleCount)
    const hasMore = visibleCount < cars.length

    const handleShowMore = () => {

        const next = visibleCount + 8
        setVisibleCount(next >= cars.length ? cars.length : next)
    };

    return (

        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="flex items-stretch">

                {/* Mobile View */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Filter Sidebar */}
                <aside className={`
                    fixed top-0 left-0 h-full w-[260px] z-50 bg-white shadow-xl
                    overflow-y-auto transition-transform duration-300
                    lg:static lg:translate-x-0 lg:shadow-none lg:bg-white
                    lg:z-auto lg:overflow-visible lg:flex-shrink-0 lg:w-[260px]
                    lg:self-stretch lg:h-auto lg:min-h-full
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex justify-between items-center mb-5 lg:hidden px-4 pt-4">
                        <span className="text-[#1A202C] font-bold">Filters</span>
                        <button onClick={() => setIsSidebarOpen(false)}>✕</button>
                    </div>
                    <FilterSidebar />
                </aside>

                {/* Main content */}
                <div className="flex-1 min-w-0 flex flex-col gap-6 px-4 sm:px-6 py-6">

                    {/* Pickup & Dropoff */}
                    <PickupDropoff
                        pickupLocation={pickupLocation}
                        setPickupLocation={setPickupLocation}
                        pickupDate={pickupDate}
                        setPickupDate={setPickupDate}
                        dropoffDate={dropoffDate}
                        setDropoffDate={setDropoffDate}
                    />

                    {/* Mobile filter button */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden flex items-center gap-2 h-11 px-4 bg-white border border-[#C3D4E9] rounded-[10px] text-sm font-semibold text-[#596780]"
                        >
                            <FilterIcon className="w-4 h-4" />
                            Filter
                        </button>
                    </div>

                    {/* Error */}
                    {error && !loading && (
                        <div className="flex flex-col items-center py-20 gap-4">
                            <p className="text-[#596780] font-semibold">{error}</p>
                            <button
                                onClick={() => loadCars({ ...filters, limit: 100 })}
                                className="bg-[#3563E9] text-white px-6 h-11 rounded-[10px]"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="flex justify-center py-20">
                            <p className="text-[#90A3BF]">Loading cars...</p>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && !error && cars.length === 0 && (
                        <div className="flex flex-col items-center py-20 gap-3">
                            <span className="text-5xl">🚗</span>
                            <p className="font-bold">No cars found</p>
                            <p className="text-[#90A3BF] text-sm">Try adjusting filters</p>
                        </div>
                    )}

                    {/* Car grid */}
                    {!loading && !error && cars.length > 0 && (
                        <>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                                {visibleCars.map((car) => (
                                    <CarCard key={car._id} car={car} />
                                ))}
                            </div>

                            {/* Show more */}
                            <div className="relative flex items-center justify-center pt-6 border-t border-[#C3D4E9]/40">
                                {hasMore ? (
                                    <Button
                                        onClick={handleShowMore}
                                        variant="primary"
                                        className="text-[16px] font-semibold leading-[150%] tracking-[-0.02em] border-none text-[#596780] hover:text-[#3563E9]"
                                    >
                                        Show more car
                                    </Button>
                                ) : (
                                    <span className="text-[#90A3BF] text-sm">All cars shown</span>
                                )}
                                <span className="absolute right-0 text-[#90A3BF] text-sm">
                                    {visibleCars.length} of {total} cars
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarList;