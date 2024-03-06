import React, { createContext, useContext, useState } from 'react';

// create a new context for the search history
const SearchContext = createContext();

// create a custom hook to use the search context
export const useSearch = () => useContext(SearchContext);

// create a new provider component to wrap the app with the search context
export const SearchProvider = ({ children }) => {
    
    // set up state to track the search history
    const [searchHistory, setSearchHistory] = useState([]);

    // add a new search query to the search history
    const addSearchQuery = (query) => {
        setSearchHistory((prevHistory) => {
            const updatedHistory = [query, ...prevHistory];
            return updatedHistory.slice(0, 20); // Keep only the last 20 entries
        });
    };

    // reset the search history
    const resetHistory = () => setSearchHistory([]);

    // provide the search history and the addSearchQuery function to the app
    return (
        <SearchContext.Provider value={{ searchHistory, addSearchQuery, resetHistory }}>
            {children}
        </SearchContext.Provider>
    );
};
