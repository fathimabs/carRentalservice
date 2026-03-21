import React, { useEffect, useState } from 'react';
import { useCar } from '../context/CarContext';
import CarCard from '../components/ui/CarCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import PickupDropoff from '../components/ui/PickupDropoff';
import { FilterIcon } from '../components/common/Icons';
import Button from "../components/common/Button";

const CarList = () => {
    const { cars = [], loading, error, total, filters, loadCars } = useCar();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(9);
    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');

    useEffect(() => {
        setVisibleCount(9);
    }, [filters]);

    useEffect(() => {
        loadCars({ ...filters, limit: 100 });
    }, [filters]);

    const visibleCars = cars.slice(0, visibleCount);
    const hasMore = visibleCount < cars.length;

    return (
        <div className="min-h-screen bg-[#F6F7F9]">

            <div className="px-4 sm:px-6 py-6 flex gap-8 items-stretch">

                {/* Sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <aside className={`
                    fixed top-0 left-0 h-full w-[260px] z-50 bg-white shadow-xl
                    overflow-y-auto pt-6 pb-10 px-5 transition-transform duration-300
                    lg:static lg:translate-x-0 lg:shadow-none lg:bg-white
                    lg:z-auto lg:overflow-visible lg:flex-shrink-0 lg:w-[260px]
                    lg:self-stretch lg:h-auto lg:min-h-full
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex justify-between items-center mb-5 lg:hidden">
                        <span className="text-[#1A202C] font-bold">Filters</span>
                        <button onClick={() => setIsSidebarOpen(false)}>✕</button>
                    </div>
                    <FilterSidebar />
                </aside>

                {/* Right Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-6">

                    {/* Pickup & Dropoff */}
                    <PickupDropoff
                        pickupLocation={pickupLocation}
                        setPickupLocation={setPickupLocation}
                        pickupDate={pickupDate}
                        setPickupDate={setPickupDate}
                        dropoffDate={dropoffDate}
                        setDropoffDate={setDropoffDate}
                    />

                    {/* Mobile Filter Button */}
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

                    {/* 🚗 CAR GRID (FINAL FIX) */}
                    {!loading && !error && cars.length > 0 && (
                        <>
                            <div className="
                                w-full
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                gap-6
                            ">
                                {visibleCars.map((car) => (
                                    <CarCard key={car._id} car={car} />
                                ))}
                            </div>

                            {/* Show More */}
                            <div className="relative flex items-center justify-center pt-6 border-t border-[#C3D4E9]/40">

                                {hasMore ? (
                                    <button onClick={() => setVisibleCount((prev) => prev + 9)}>
                                        <Button>Show more car</Button>
                                    </button>
                                ) : (
                                    <span className="text-[#90A3BF] text-sm">
                                        All cars shown
                                    </span>
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