import React, { useEffect, useState } from 'react';
import { useCar } from '../context/CarContext';
import CarCard from '../components/ui/CarCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import PickupDropoff from '../components/ui/PickupDropoff';
import { FilterIcon } from '../components/common/Icons';

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="bg-white rounded-[20px] p-5 flex flex-col gap-5 animate-pulse w-full">
        <div className="flex justify-between">
            <div className="flex flex-col gap-2">
                <div className="h-4 w-28 bg-[#F6F7F9] rounded-full" />
                <div className="h-3 w-16 bg-[#F6F7F9] rounded-full" />
            </div>
            <div className="w-5 h-5 bg-[#F6F7F9] rounded-full" />
        </div>
        <div className="h-[120px] bg-[#F6F7F9] rounded-xl" />
        <div className="flex justify-between">
            <div className="h-3 w-10 bg-[#F6F7F9] rounded-full" />
            <div className="h-3 w-14 bg-[#F6F7F9] rounded-full" />
            <div className="h-3 w-14 bg-[#F6F7F9] rounded-full" />
        </div>
        <div className="flex justify-between items-center">
            <div className="h-6 w-20 bg-[#F6F7F9] rounded-full" />
            <div className="h-9 w-24 bg-[#F6F7F9] rounded-[10px]" />
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const CarList = () => {
    const {
        cars = [], loading, error,
        total, sort, order, filters,
        loadCars, setSort,
    } = useCar();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [visibleCount, setVisibleCount]   = useState(9);

    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupDate, setPickupDate]         = useState('');
    const [dropoffDate, setDropoffDate]       = useState('');

    useEffect(() => { setVisibleCount(9); }, [filters, sort, order]);

    useEffect(() => {
        loadCars({ ...filters, sort, order, limit: 100 });
    }, [filters, sort, order]);

    const visibleCars = cars.slice(0, visibleCount);
    const hasMore     = visibleCount < cars.length;

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-8">

                {/* ── PickupDropoff ── */}
                <PickupDropoff
                    pickupLocation={pickupLocation}
                    setPickupLocation={setPickupLocation}
                    pickupDate={pickupDate}
                    setPickupDate={setPickupDate}
                    dropoffDate={dropoffDate}
                    setDropoffDate={setDropoffDate}
                />

                {/* ════════════════════════════════════════
                    MAIN LAYOUT — sidebar LEFT + content RIGHT
                ════════════════════════════════════════ */}
                <div className="flex gap-6 mt-8 items-start">

                    {/* ── SIDEBAR — desktop: always visible left, mobile: drawer ── */}

                    {/* Mobile overlay */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Sidebar panel */}
                    <aside className={`
                        fixed top-0 left-0 h-full w-[280px] z-50
                        bg-white shadow-2xl overflow-y-auto pt-6 pb-10 px-5
                        transition-transform duration-300 ease-in-out
                        lg:static lg:translate-x-0 lg:shadow-none lg:bg-transparent
                        lg:h-auto lg:w-[260px] lg:z-auto lg:p-0
                        lg:overflow-visible lg:flex-shrink-0
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        {/* Mobile header */}
                        <div className="flex justify-between items-center mb-6 lg:hidden">
                            <span className="text-[#1A202C] font-bold text-base">Filters</span>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full
                                           text-[#90A3BF] hover:bg-[#F6F7F9] hover:text-[#1A202C]
                                           transition-colors text-lg"
                            >✕</button>
                        </div>
                        <FilterSidebar />
                    </aside>

                    {/* ── MAIN CONTENT ── */}
                    <div className="flex-1 min-w-0 flex flex-col gap-5">

                        {/* Top bar — sort + filter toggle */}
                        <div className="flex items-center justify-between gap-3 flex-wrap">

                            {/* Car count */}
                            {!loading && total > 0 && (
                                <span className="text-[#90A3BF] text-sm font-medium">
                                    {total} {total === 1 ? 'car' : 'cars'} available
                                </span>
                            )}

                            <div className="flex items-center gap-2 ml-auto">
                                {/* Sort dropdown */}
                                <select
                                    value={`${sort}:${order}`}
                                    onChange={(e) => {
                                        const [s, o] = e.target.value.split(':');
                                        setSort(s, o);
                                    }}
                                    className="h-[44px] bg-white border border-[#C3D4E9] border-opacity-40
                                               rounded-[10px] px-3 text-sm font-semibold text-[#596780]
                                               outline-none cursor-pointer hover:border-[#3563E9] transition-colors"
                                >
                                    <option value="createdAt:desc">Newest First</option>
                                    <option value="pricePerDay:asc">Price: Low → High</option>
                                    <option value="pricePerDay:desc">Price: High → Low</option>
                                    <option value="rating:desc">Top Rated</option>
                                </select>

                                {/* Filter button — visible only on mobile */}
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden flex items-center gap-2 h-[44px] px-4
                                               bg-white border border-[#C3D4E9] border-opacity-40
                                               rounded-[10px] text-sm font-semibold text-[#596780]
                                               hover:border-[#3563E9] hover:text-[#3563E9] transition-colors"
                                >
                                    <FilterIcon className="w-4 h-4" />
                                    Filter
                                </button>
                            </div>
                        </div>

                        {/* ── Error ── */}
                        {error && !loading && (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                                    <span className="text-2xl">⚠️</span>
                                </div>
                                <p className="text-[#596780] font-semibold text-center">{error}</p>
                                <button
                                    onClick={() => loadCars({ ...filters, sort, order, limit: 100 })}
                                    className="bg-[#3563E9] text-white font-semibold text-sm px-6
                                               h-[44px] rounded-[10px] hover:bg-blue-700
                                               transition-colors active:scale-95"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* ── Skeletons ── */}
                        {loading && (
                            <div className="flex flex-wrap gap-5">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                                        <SkeletonCard />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── Empty ── */}
                        {!loading && !error && cars.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-20 h-20 rounded-full bg-[#EBF0FF] flex items-center justify-center">
                                    <span className="text-4xl">🚗</span>
                                </div>
                                <p className="text-[#1A202C] font-bold text-lg">No cars found</p>
                                <p className="text-[#90A3BF] text-sm text-center max-w-xs">
                                    Try adjusting your filters or search for a different model.
                                </p>
                            </div>
                        )}

                        {/* ── Car flex list ── */}
                        {!loading && !error && cars.length > 0 && (
                            <>
                                {/* 
                                    RESPONSIVE FLEX:
                                    mobile  → 1 column (full width)
                                    sm      → 2 columns
                                    lg      → 3 columns (sidebar takes space)
                                */}
                                <div className="flex flex-wrap gap-5">
                                    {visibleCars.map((car) => (
                                        <div
                                            key={car._id}
                                            className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                                        >
                                            <CarCard car={car} />
                                        </div>
                                    ))}
                                </div>

                                {/* Show more + total count */}
                                <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#C3D4E9] border-opacity-40">
                                    {hasMore ? (
                                        <button
                                            onClick={() => setVisibleCount((prev) => prev + 9)}
                                            className="text-[#596780] text-sm font-semibold
                                                       hover:text-[#3563E9] transition-colors
                                                       underline underline-offset-2"
                                        >
                                            Show more car
                                        </button>
                                    ) : (
                                        <span className="text-[#90A3BF] text-sm font-medium">
                                            All cars shown
                                        </span>
                                    )}
                                    <span className="text-[#90A3BF] text-sm font-medium">
                                        {total} Car
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarList;