import React from 'react';
import '../assets/styles/SearchHistory.css';

import { NavLink } from 'react-router-dom';
import { useSearch } from '../context/SearchContext.js';

// renders the search history page
function SearchHistory() {
    const { searchHistory, resetHistory } = useSearch();

    return (
        <div>

            <div className='history-container'>
                <div className='history-row'>
                    <div className='history-header'>
                        <div className='history-text'>20 Most Recent Searches</div>
                        <div className='history-text'>
                            <button className='history-button' onClick={resetHistory}>Reset History</button>
                        </div>
                    </div>
                </div>
                <div className='history-row'>
                    <ol className='number-list'>
                    {searchHistory.map((query, index) => (
                        <li key={index}>
                            <NavLink to={{ pathname: '/players', search: `?query=${encodeURIComponent(query)}` }}>{query}</NavLink>
                        </li>
                    ))}
                    </ol>
                </div>
            </div>         
        </div>
    );
}

export default SearchHistory;