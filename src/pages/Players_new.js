import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles/Players.css';
import axios from 'axios';

import { useSearch } from '../context/SearchContext.js';
import positionMapping from '../utils/positionMapping.js';
import  debounce from '../utils/debounce.js';

// renders the players page
function Players() {

    // set up state to track the players data, loading state, and error state
    // set the initial state of the players data to an empty array
    // set the initial state of the loading state to true
    // set the initial state of the error state to an empty string
    const [data, setData] = useState({ players: [], isLoading: true, error: '', });
    

    // get the current location
    // create a new URLSearchParams object
    // extract the query parameter from the search string
    const location = useLocation(); 
    
    const searchParams = new URLSearchParams(location.search); 
    
    const initialSearchQuery = searchParams.get('query') || ''; 
    

    // set up state to track the search query
    // set the initial state of the search query to the query parameter from the search string
    // use the useSearch hook to access the addSearchQuery function from the search context
    // create a function to handle the search input change and add the search query to the history
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    
    const { addSearchQuery } = useSearch();

    
    // fetch data from the JSON file or API with axios get request
    // the try block returns a list of players and their attributes
    // the catch block logs an error if the data cannot be fetched
    // the use effect hook triggers the fetch data function on page load
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
    // the search query is extracted from the search string
    // the search query is set as the new state
    // the use effect hook triggers the update search query function when the location changes
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query') || '';
        setSearchQuery(query);
    }, [location.search]); 

    // create a debounced version of the addSearchQuery function
    const debouncedAddSearchQuery = useCallback(debounce((query) => {
        if (query.trim()) {
            addSearchQuery(query);
        }
    }, 2000), [addSearchQuery]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedAddSearchQuery(query);
    };

    // create a function to handle the cancel button click
    const handleCancel = () => {setSearchQuery('');};

    // if the data is loading, display a loading message
    // if there is an error, display the error message
    // todo: the loading state is indicator is temporarily disabled to prevent FOUC
    // if (data.isLoading) return <div>Loading...</div>;
    if (data.error) return <div>{data.error}</div>;


    // filter the players based on the search query input
    // the search query is converted to lowercase to help with the search
    // the search query is compared to the player's display name, market, team name, and position
    // positionMapping is used to map the position abbreviation to the full position name
    const filteredPlayers = data.players.filter((player) => {
        const searchLower = searchQuery.toLowerCase();
        const displayName = player.attributes?.display_name?.toLowerCase().includes(searchLower);
        const market = player.attributes?.market?.toLowerCase().includes(searchLower);
        const teamName = player.attributes?.team_name?.toLowerCase().includes(searchLower);
        const position =positionMapping[player.attributes?.position]?.toLowerCase().includes(searchLower) ||player.attributes?.position?.toLowerCase().includes(searchLower);

        return displayName || market || teamName || position;
    });


    // render the players list
    // if the filtered players list is greater than 0, render the players list
    // else show a message that no search results were found
    return (
        <div className='players-container'>
            <div className='search-row'>
                <div className='sub-header'>&nbsp;</div>
                <div>
                    <div class='search-bar'>
                        <div class='search-wrapper'>
                            <div class='search-icon'>
                                <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                                    <g transform='translate(5 4)' stroke='#FFF' stroke-width='1.5' fill='none' fill-rule='evenodd' opacity='0.5'>
                                        <circle cx='6.5' cy='6.5' r='6.5'></circle>
                                        <path stroke-linecap='round' stroke-linejoin='round' d='m11 12 2.955 3.289'></path>
                                    </g>
                                </svg>
                            </div>
                            <div class='search-input'>
                                <input
                                    placeholder='Search'
                                    type='text'
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div class='cancel' onClick={handleCancel}>Cancel</div>
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
                        class='nrf'
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
