import { useState } from 'react'
import { SearchIcon, FilterIcon } from '../common/Icons'
import { useCar } from '../../context/CarContext';

const SearchBar = ({ placeholder = 'Search something here', onFilterClick }) => {
    const { filters, setFilters } = useCar();
    const [localSearch, setLocalSearch] = useState(filters.search || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilters({ search: localSearch });
    };

    const handleChange = (e) => {
        setLocalSearch(e.target.value);
        if (e.target.value === '') setFilters({ search: '' });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center h-[44px] px-4 rounded-full border border-[#C3D4E9] border-opacity-40 bg-white focus-within:ring-2 focus-within:ring-[#3563E9] w-full max-w-[492px] gap-3"
        >
            <SearchIcon className="w-5 h-5 text-[#596780] flex-shrink-0" />
            <input
                type="text"
                value={localSearch}
                onChange={handleChange}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none outline-none text-[#596780] text-sm font-medium placeholder-[#596780]"
            />
            {localSearch ? (
                <button
                    type="button"
                    onClick={() => {
                        setLocalSearch('');
                        setFilters({ search: '' });
                    }}
                    className="text-[#90A3BF] hover:text-[#596780] transition-colors text-xs flex-shrink-0"
                    aria-label="Clear search"
                >
                    ✕
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onFilterClick}
                    className="flex-shrink-0 text-[#596780] hover:text-[#3563E9] transition-colors"
                    aria-label="Open filters"
                >
                    <FilterIcon className="w-5 h-5" />
                </button>
            )}
        </form>
    );
};

export default SearchBar;