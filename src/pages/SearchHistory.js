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
                        <div className='history-text'>View your 20 Most Recent Searches</div>
                        <div className='history-text'>
                            <button className='history-button' onClick={resetHistory}>Reset History</button>
                        </div>
                    </div>
                </div>
                <div>
                    {searchHistory.length > 0 ? (
                        <ol className='number-list'>
                        {searchHistory.map((query, index) => (
                            <li key={index}>
                                <NavLink to={{ pathname: '/players', search: `?query=${encodeURIComponent(query)}` }}>{query}</NavLink>
                            </li>
                        ))}
                        </ol>
                    ) : ( 
                        <div className='not-found'>
                            <img
                                className='nrf'
                                src='https://app.prizepicks.com/7478c2713b57c5acff99.png'
                                alt='Magnifying Glass'
                            />
                            <h1>No search history found.</h1>
                            <span>Please try another search.</span>
                            <div className='home-divider'></div>
                                <a className='home-button' href='/players'>Search Again</a>
                                <div className='home-divider'></div>
                        </div>
                    )}
                </div>
            </div>         
        </div>
    );
}

export default SearchHistory;