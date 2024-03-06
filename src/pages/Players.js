import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../assets/styles/Players.css';
import axios from 'axios';

import { useSearch } from '../context/SearchContext.js';
import positionMapping from '../utils/positionMapping.js';
import  debounce from '../utils/debounce.js';

// renders the players page
function Players() {

    // set up state to track the players data, loading state, and error state
    // set the default state for the search query
    const [data, setData] = useState({ players: [], isLoading: true, error: '', });
    

    // get current location and create a new URLSearchParams object
    // extract the query parameter from the search string
    const location = useLocation(); 
    const searchParams = new URLSearchParams(location.search); 
    const initialSearchQuery = searchParams.get('query') || ''; 
    

    // set up state to track the search query
    // useSearch hook to access the addSearchQuery function from the search context
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const { addSearchQuery } = useSearch();

    
    // fetch data source from the JSON file with axios get request on page load
    // dependency array is empty to prevent rerenders
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/data.json');
                setData({ players: response.data.data, isLoading: false, error: '', });
            } catch (error) {
                console.error('Error fetching data: ', error);
                setData({ players: [], isLoading: false, error: 'Error fetching data', });
            }
        };
        fetchData();
    }, []);


    // update the search query state when the location changes
    // use effect hook triggers the update search query function when the location changes
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
    


    // debounced search query function, memoize the debounced function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedAddSearchQuery = useCallback(debounce((query) => {
        if (query.trim()) { addSearchQuery(query); }
    }, 1000), [addSearchQuery]);


    // handle the search query input change
    // update search query state and call the debounced add search query function
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedAddSearchQuery(query);
    };


    // handle the cancel button click
    // clear the search query state
    const handleCancel = () => {setSearchQuery('');};


    // if (data.isLoading) return <div>Loading...</div>;
    if (data.error) return <div>{data.error}</div>;


    // filter the players based on the search query input
    // positionMapping to map the position abbreviation to the full position name
    const filteredPlayers = data.players.filter((player) => {
        const searchTerms = searchQuery.toLowerCase().split(' '); // Split search query into terms
        const playerData = `
            ${player.attributes?.display_name} 
            ${player.attributes?.market} 
            ${player.attributes?.team_name} 
            ${positionMapping[player.attributes?.position] || player.attributes?.position}
            `.toLowerCase();
        return searchTerms.every(term => playerData.includes(term));
    });

    // render the players list or shows a no results found
    return (
        <div className='players-container'>
            <div className='search-row'>
                <div className='sub-header'>
                    <div className='sub-text'>Search by play, market, team, or position</div>
                    <div className='sub-text'>
                    <NavLink to='/search-history' className={({ isActive }) => isActive ? 'active' : 'sub-link'}>Search History</NavLink>                    </div>
                </div>
                <div>
                    <div className='search-bar'>
                        <div className='search-wrapper'>
                            <div className='search-icon'>
                                <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                                    <g transform='translate(5 4)' stroke='#FFF' stroke-width='1.5' fill='none' fill-rule='evenodd' opacity='0.5'>
                                        <circle cx='6.5' cy='6.5' r='6.5'></circle>
                                        <path stroke-linecap='round' stroke-linejoin='round' d='m11 12 2.955 3.289'></path>
                                    </g>
                                </svg>
                            </div>
                            <div className='search-input'>
                                <input
                                    placeholder='Search'
                                    type='text'
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div className='cancel' onClick={handleCancel}>Cancel</div>
                    </div>
                </div>
            </div>
            {filteredPlayers.length > 0 ? (
                <ul className='players-list'>
                    {filteredPlayers.map((player, index) => (
                        <li className='players-item' key={index}>
                            <div className='player-container'>
                                <div className='player-contents'>
                                    <button className='last-five-button'>
                                        <div className='last-five-container'>
                                            <svg
                                                width='25'
                                                height='24'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    d='M4.75 8h2v12h-2zm5-3h2v15h-2zm5 10h2v5h-2zm5-4h2v9h-2z'
                                                    fill='#FFF'
                                                    fill-rule='evenodd'
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
                                        <div className='score'>18.5</div>
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
