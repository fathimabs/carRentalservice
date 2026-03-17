import React, { useEffect, useState } from 'react';
import { useCar } from '../context/CarContext';
import CarCard from '../components/ui/CarCard';
import FilterSidebar from '../components/ui/FilterSidebar'
import SearchBar from '../components/ui/SearchBar'

// ─── Sort options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
    { label: 'Newest First',       sort: 'createdAt',   order: 'desc' },
    { label: 'Price: Low → High',  sort: 'pricePerDay', order: 'asc'  },
    { label: 'Price: High → Low',  sort: 'pricePerDay', order: 'desc' },
    { label: 'Top Rated',          sort: 'rating',      order: 'desc' },
];

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="bg-white rounded-[20px] p-5 flex flex-col gap-5 animate-pulse">
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

// ─── Component ────────────────────────────────────────────────────────────────
const CarList = () => {
    const {
        cars = [], loading, error,
        total, page, totalPages,
        sort, order, filters,
        loadCars, setPage, setSort,
    } = useCar();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Re-fetch when any filter, sort or page changes
    // Pass current state as explicit params — no stale closure risk
    useEffect(() => {
        loadCars({
            ...filters,
            sort,
            order,
            page,
            limit: 8,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters, sort, order, page]);  // ← real deps, not the function

    const handleSortChange = (e) => {
        const [s, o] = e.target.value.split(':');
        setSort(s, o);
    };

    const currentSortValue = `${sort}:${order}`;

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1440px] mx-auto px-6 py-8 flex gap-6">

                {/* ── Sidebar ── */}
                <>
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}
                    <aside className={`
                        fixed top-0 left-0 h-full w-[260px] z-40 overflow-y-auto pt-6 pb-10 px-4 bg-[#F6F7F9]
                        transition-transform duration-300
                        lg:static lg:translate-x-0 lg:h-auto lg:w-[260px] lg:z-auto lg:p-0 lg:overflow-visible lg:flex-shrink-0
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        <div className="flex justify-between items-center mb-4 lg:hidden">
                            <span className="text-[#1A202C] font-bold text-sm">Filters</span>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="text-[#90A3BF] hover:text-[#1A202C] transition-colors"
                            >✕</button>
                        </div>
                        <FilterSidebar />
                    </aside>
                </>

                {/* ── Main content ── */}
                <main className="flex-1 min-w-0 flex flex-col gap-6">

                    {/* Top bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <SearchBar
                            placeholder="Search by brand or model..."
                            onFilterClick={() => setIsSidebarOpen(true)}
                        />
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {!loading && total > 0 && (
                                <span className="text-[#90A3BF] text-sm font-medium hidden sm:block whitespace-nowrap">
                                    {total} {total === 1 ? 'car' : 'cars'} found
                                </span>
                            )}
                            <select
                                value={currentSortValue}
                                onChange={handleSortChange}
                                className="h-[44px] bg-white border border-[#C3D4E9] border-opacity-40 rounded-[10px] px-3 text-sm font-semibold text-[#596780] outline-none cursor-pointer hover:border-[#3563E9] transition-colors"
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <option key={opt.label} value={`${opt.sort}:${opt.order}`}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Error */}
                    {error && !loading && (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <p className="text-[#596780] font-semibold text-center">{error}</p>
                            <button
                                onClick={() => loadCars({ sort, order, page, ...filters })}
                                className="bg-[#3563E9] text-white font-semibold text-sm px-6 h-[44px] rounded-[10px] hover:bg-blue-700 transition-colors active:scale-95"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Skeletons */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && !error && cars.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="w-20 h-20 rounded-full bg-[#EBF0FF] flex items-center justify-center">
                                <span className="text-4xl">🚗</span>
                            </div>
                            <p className="text-[#1A202C] font-bold text-lg">No cars found</p>
                            <p className="text-[#90A3BF] text-sm text-center max-w-xs">
                                Try adjusting your filters or searching for a different model.
                            </p>
                        </div>
                    )}

                    {/* Car grid */}
                    {!loading && !error && cars.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {cars.map((car) => (
                                    <CarCard key={car._id} car={car} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                                    <button
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                        className="h-9 px-4 rounded-[10px] border border-[#C3D4E9] text-sm font-semibold text-[#596780] disabled:opacity-40 hover:border-[#3563E9] hover:text-[#3563E9] transition-colors disabled:pointer-events-none"
                                    >← Prev</button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={`w-9 h-9 rounded-[10px] text-sm font-semibold transition-colors ${
                                                p === page
                                                    ? 'bg-[#3563E9] text-white'
                                                    : 'border border-[#C3D4E9] text-[#596780] hover:border-[#3563E9] hover:text-[#3563E9]'
                                            }`}
                                        >{p}</button>
                                    ))}

                                    <button
                                        onClick={() => setPage(page + 1)}
                                        disabled={page === totalPages}
                                        className="h-9 px-4 rounded-[10px] border border-[#C3D4E9] text-sm font-semibold text-[#596780] disabled:opacity-40 hover:border-[#3563E9] hover:text-[#3563E9] transition-colors disabled:pointer-events-none"
                                    >Next →</button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CarList;

