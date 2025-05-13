import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FilterContext = createContext();

export const useFilterContext = () => {
    return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
    const [sortOption, setSortOption] = useState("Most popular");
    const [filters, setFilters] = useState({
        selectedCategories: [],
        priceFrom: undefined,
        priceTo: undefined,
    });

    const location = useLocation();

    useEffect(() => {
        setSortOption("Most popular");
        setFilters({
            selectedCategories: [],
            priceFrom: undefined,
            priceTo: undefined,
        });
    }, [location]);

    const updateSortOption = (newSortOption) => {
        setSortOption(newSortOption);
    };

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <FilterContext.Provider value={{ sortOption, filters, updateSortOption, updateFilters }}>
            {children}
        </FilterContext.Provider>
    );
};
