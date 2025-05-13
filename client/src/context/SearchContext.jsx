import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext();

export const useSearchTerm = () => {
    return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    useEffect(() => {
        setSearchTerm("");
    }, [location]);

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};
