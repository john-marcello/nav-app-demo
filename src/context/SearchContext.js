import React, { createContext, useContext, useState } from 'react';

// context for the search history
// custom hook to use the search context
const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

// provider component to wrap the app with the search context
export const SearchProvider = ({ children }) => {
    
    // set up state to track the search history
    const [searchHistory, setSearchHistory] = useState(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // add a new search query to the search history
    const addSearchQuery = (query) => {
        setSearchHistory(prevHistory => {
            const updatedHistory = [query, ...prevHistory].slice(0, 20);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            return updatedHistory;
        });
    };

    // reset the search history
    const resetHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    // provide the search history and the addSearchQuery to the app
    return (
        <SearchContext.Provider value={{ searchHistory, addSearchQuery, resetHistory }}>
            {children}
        </SearchContext.Provider>
    );
};
