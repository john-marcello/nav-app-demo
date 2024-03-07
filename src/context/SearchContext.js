import React, { createContext, useContext, useState } from 'react';

// create context to store search history
const SearchContext = createContext();

// export custom hook to use the search context
export const useSearch = () => useContext(SearchContext);

// export provider wrap the app with search context
export const SearchProvider = ({ children }) => {
    
    // set up state to track the search history
    const [searchHistory, setSearchHistory] = useState(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // add search query to the search history and set local storage
    const addSearchQuery = (query) => {
        setSearchHistory(prevHistory => {
            const updatedHistory = [query, ...prevHistory].slice(0, 20);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            return updatedHistory;
        });
    };

    // reset search history
    const resetHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    // provide search history, addSearchQuery, and resetHistory to the app
    return (
        <SearchContext.Provider value={{ searchHistory, addSearchQuery, resetHistory }}>
            {children}
        </SearchContext.Provider>
    );
};