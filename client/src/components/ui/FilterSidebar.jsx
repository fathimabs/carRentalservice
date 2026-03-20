import React from 'react';
import { useCar } from '../../context/CarContext';

const CATEGORIES = ['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback'];
const CAPACITIES = [
    { label: '2 Person', value: '2' },
    { label: '4 Person', value: '4' },
    { label: '6 Person', value: '6' },
    { label: '8 or More', value: '8' },
];

// ─── Reusable checkbox row ────────────────────────────────────────────────────
const CheckItem = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
        <div
            onClick={onChange}
            className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-colors ${
                checked
                    ? 'bg-[#3563E9] border-[#3563E9]'
                    : 'border-[#C3D4E9] group-hover:border-[#3563E9]'
            }`}
        >
            {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </div>
        <span className="text-[#596780] text-sm font-semibold">{label}</span>
    </label>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────
const FilterSection = ({ title, children }) => (
    <div className="flex flex-col gap-4">
        <p className="text-[#90A3BF] text-xs font-semibold uppercase tracking-widest">
            {title}
        </p>
        <div className="flex flex-col gap-4">{children}</div>
    </div>
);

// ─── Component ────────────────────────────────────────────────────────────────
const FilterSidebar = () => {
    const { filters, setFilters, resetFilters } = useCar();

    const toggleCategory = (cat) =>
        setFilters({ category: filters.category === cat ? '' : cat });

    const toggleCapacity = (val) =>
        setFilters({ capacity: filters.capacity === val ? '' : val });

    const handleMaxPrice = (e) =>
        setFilters({ maxPrice: e.target.value });

    const hasActiveFilters =
        filters.category || filters.capacity || filters.maxPrice;

    return (
        <aside className="bg-white rounded-[20px] p-6 flex flex-col gap-8 w-full">

            <FilterSection title="Type">
                {CATEGORIES.map((cat) => (
                    <CheckItem
                        key={cat}
                        label={cat}
                        checked={filters.category === cat}
                        onChange={() => toggleCategory(cat)}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Capacity">
                {CAPACITIES.map(({ label, value }) => (
                    <CheckItem
                        key={value}
                        label={label}
                        checked={filters.capacity === value}
                        onChange={() => toggleCapacity(value)}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Price">
                <input
                    type="range"
                    min={0}
                    max={500}
                    step={10}
                    value={filters.maxPrice || 500}
                    onChange={handleMaxPrice}
                    className="w-full accent-[#3563E9] cursor-pointer h-1.5 rounded-full"
                />
                <div className="flex justify-between items-center">
                    <span className="text-[#1A202C] text-sm font-semibold">
                        Max. ${filters.maxPrice || 500}.00
                    </span>
                </div>
            </FilterSection>

            {hasActiveFilters && (
                <button
                    onClick={resetFilters}
                    className="text-[#90A3BF] text-sm font-semibold hover:text-[#3563E9] transition-colors text-left"
                >
                    Clear all filters
                </button>
            )}
        </aside>
    );
};

export default FilterSidebar;