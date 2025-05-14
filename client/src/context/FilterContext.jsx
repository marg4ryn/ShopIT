import { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const FilterContext = createContext();

export const useFilterContext = () => {
    return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
    const { t } = useTranslation();
    const [sortOption, setSortOption] = useState(t('sorting.mostPopular'));
    const [filters, setFilters] = useState({
        selectedCategories: [],
        priceFrom: undefined,
        priceTo: undefined,
    });

    const location = useLocation();

    useEffect(() => {
        setSortOption(t('sorting.mostPopular'));
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
