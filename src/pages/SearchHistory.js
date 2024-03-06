import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext.js';

function SearchHistory() {
    const { searchHistory, resetHistory } = useSearch();

    return (
        <div>
            <h2>Search History</h2>
            <ul>
                {searchHistory.map((query, index) => (
                    <li key={index}>
                        <Link to={{ pathname: '/players', search: `?query=${query}` }}>{encodeURIComponent(query)}</Link>
                    </li>
                ))}
            </ul>
            <button onClick={resetHistory}>Reset History</button>
        </div>
    );
}

export default SearchHistory;