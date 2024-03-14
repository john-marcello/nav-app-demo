import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../assets/styles/Players.css';
import axios from 'axios';

import { useSearch } from '../context/SearchContext.js';
import positionMapping from '../utils/positionMapping.js';
import  debounce from '../utils/debounce.js';
import randomNumber from '../utils/randomNumber.js';

// renders the players page
function Players() {

    // set state for players data, loading state, error state
    const [data, setData] = useState({ players: [], isLoading: true, error: '', });
    const [isFocused, setIsFocused] = useState(false);


    // fetch data source from JSON file via axios request and prevent re-renders
    useEffect(() => {
        const savedData = sessionStorage.getItem('playerData');
        if (savedData) {
            setData({ players: JSON.parse(savedData), isLoading: false, error: '' });
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get('/data.json');
                    const playersWithScores = response.data.data.map(player => ({
                        ...player,
                        attributes: {
                            ...player.attributes,
                            score: randomNumber()
                        }
                    }));
                    sessionStorage.setItem('playerData', JSON.stringify(playersWithScores));
                    setData({ players: playersWithScores, isLoading: false, error: '' });
                } catch (error) {
                    console.error('Error fetching data: ', error);
                    setData({ players: [], isLoading: false, error: 'Error fetching data' });
                }
            };
            fetchData();
        }
    }, []);


    // preprocess search - get current location, create an object, extract query params
    const location = useLocation(); 
    const searchParams = new URLSearchParams(location.search); 
    const initialSearchQuery = searchParams.get('query') || ''; 
    
    // set state to track the search query and invoke context hook
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const { addSearchQuery } = useSearch();

    

    // filter players by search query input, and access positionMapping object for position attribute
    const filteredPlayers = useMemo(() => data.players.filter(player => {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const playerData = `
            ${player.attributes?.display_name} 
            ${player.attributes?.market} 
            ${player.attributes?.team_name} 
            ${positionMapping[player.attributes?.position] || player.attributes?.position}
            `.toLowerCase();
        return searchTerms.every(term => playerData.includes(term));
    }), [data.players, searchQuery]);


    // update the search query state when the location changes
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryParam = searchParams.get('query');
        if (queryParam) {
            const decodedQueryParam = decodeURIComponent(queryParam);
            setSearchQuery(decodedQueryParam);
        } else {
            setSearchQuery('');
        }
    }, [location.search]);
    

    // debounced search query function for better search history
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedAddSearchQuery = useCallback(debounce((query) => {
        if (query.trim()) { addSearchQuery(query); }
    }, 800), [addSearchQuery]);


    // handle the search query input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedAddSearchQuery(query);
    };


    // handle the cancel search button and clear state
    const handleCancel = () => { 
        setSearchQuery('');
        isFocused && setIsFocused(false);
    };
    
    // if (data.isLoading) return <div>Loading...</div>;
    if (data.error) return <div>{data.error}</div>;


// render the players list or shows a no results found
return (
    <div className={'common-wrapper players-wrapper'}>
        <div className='search-row'>
            <div className={'search-column search-nav'}>
                <div className='paragraph-text search-text color-grey'>Search by Player, Market, Team, or Position</div>
                <div className='search-text'>
                    <NavLink 
                        to='/search-history' 
                        className={({ isActive }) => isActive ? 'active' : 'sub-link'}
                    >
                        View Search History
                    </NavLink>
                </div>
            </div>
            <div className='search-column'>
                <div className='search-bar'>
                    <div className='search-wrapper'>
                        <div className='search-icon'>
                            <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                                <g transform='translate(5 4)' stroke='#FFF' strokeWidth='1.5' fill='none' fillRule='evenodd' opacity='0.5'>
                                    <circle cx='6.5' cy='6.5' r='6.5'></circle>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m11 12 2.955 3.289'></path>
                                </g>
                            </svg>
                        </div>
                        <div className='search-input'>
                            <input
                                id="search"
                                placeholder='Search'
                                type='text'
                                autoComplete='off'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => console.log('search input NOT focused')}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${!isFocused ? 'cancel-hide' : 'cancel'}`} onClick={handleCancel}>Cancel</div>
            </div>
        </div>
        <div className='line-divider'></div>
        {filteredPlayers.length > 0 ? (
            <ul className='players-list'>
                {filteredPlayers.map((player, index) => (
                    <li className='players-item' key={index}>
                        <div className='player-container'>
                            <div className='player-contents'>
                                <button className='btn-five'>
                                    <div className='btn-five-box'>
                                        <svg
                                            width='25'
                                            height='24'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M4.75 8h2v12h-2zm5-3h2v15h-2zm5 10h2v5h-2zm5-4h2v9h-2z'
                                                fill='#FFF'
                                                fillRule='evenodd'
                                            ></path>
                                        </svg>
                                    </div>
                                </button>
                                <div className='player-divider'></div>
                                <div className='player'>
                                    <picture className='player-picture'>
                                        <img
                                            className='player-image'
                                            src={
                                                player.attributes?.image_url
                                            }
                                            alt={`${player.attributes?.display_name}`}
                                        />
                                    </picture>
                                    <h3 className='player-name'>
                                        {player.attributes?.display_name}
                                    </h3>
                                    <p className='player-team'>
                                        {player.attributes?.market}{' '}
                                        {player.attributes?.team_name}
                                    </p>
                                    <p className='player-position'>
                                        {positionMapping[
                                            player.attributes?.position
                                        ] || player.attributes?.position}
                                    </p>
                                </div>
                            </div>
                            <div className='projected-score'>
                                <div className='score-container'>
                                    <div className='score'>{player.attributes?.score}</div>
                                </div>
                                <div className='projected-divider'></div>
                                <p className='points'>Points</p>
                            </div>
                        </div>
                        <div className='more-less'>
                            <button className='less'>
                                <div>LESS</div>
                            </button>
                            <button className='more'>
                                <div>MORE</div>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <div className='not-found'>
                <img
                    className='nrf'
                    src='https://app.prizepicks.com/7478c2713b57c5acff99.png'
                    alt='Magnifying Glass'
                />
                <h1>No search results found.</h1>
                <span>Please try another query.</span>
            </div>
        )}
        </div>
    );
}

export default Players;
