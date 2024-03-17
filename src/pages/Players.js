import React, { useState, useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Players.css';

import SearchBar from '../components/SearchBar';
import PlayerItem from '../components/PlayerItem'; // Import PlayerItem component

import useSearchParams from '../hooks/useSearchParams';
import usePlayerData from '../hooks/usePlayerData';
import { useSearch } from '../context/SearchContext.js';

import positionMapping from '../utils/positionMapping.js';
import debounce from '../utils/debounce.js';

function Players() {
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useSearchParams(setSearchQuery);
    const { players, error } = usePlayerData();
    const { addSearchQuery } = useSearch();
    
    const filteredPlayers = useMemo(() => players.filter(player => {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const playerData = `
            ${player.attributes?.display_name}
            ${player.attributes?.market}
            ${player.attributes?.team_name}
            ${positionMapping[player.attributes?.position] || player.attributes?.position}
            `.toLowerCase();
        return searchTerms.every(term => playerData.includes(term));
    }), [players, searchQuery]);

    //eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedAddSearchQuery = useCallback(
        debounce((query) => {
            if (query.trim()) { 
                addSearchQuery(query); 
            }
        }, 1000),
        [addSearchQuery]
    );

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedAddSearchQuery(query);
    };

    const handleCancel = () => {
        setSearchQuery('');
        isFocused && setIsFocused(false);
    };

    if (error) return <div>{error}</div>;

    return (
        <div className={'common-wrapper players-wrapper'}>
            <div className='search-row'>
                <div className={'search-column search-nav'}>
                    <div className='paragraph-text search-text color-grey'>Search by Player, Market, Team, or Position</div>
                    <div className='search-text'>
                        <NavLink to='/search-history' className={({ isActive }) => isActive ? 'active' : 'sub-link'}>
                            View Search History
                        </NavLink>
                    </div>
                </div>
                <div className='search-column'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        isFocused={isFocused}
                        setIsFocused={setIsFocused}
                        handleSearchChange={handleSearchChange}
                        handleCancel={handleCancel}
                    />
                </div>
            </div>
            <div className='line-divider'></div>
            {filteredPlayers.length > 0 ? (
                <ul className='players-list'>
                    {filteredPlayers.map((player, index) => (
                        <PlayerItem player={player} index={index} />
                    ))}
                </ul>
            ) : (
                <div className='not-found'>
                    <img className='nrf' src='https://app.prizepicks.com/7478c2713b57c5acff99.png' alt='Magnifying Glass' />
                    <h1>No search results found.</h1>
                    <span>Please try another query.</span>
                </div>
            )}
        </div>
    );
}

export default Players;
