import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../assets/styles/Players.css';
import positionMapping from '../utils/positionMapping';

// renders the players page
function Players() {

    // set up state to track the players data, loading state, and error state
    // set the initial state of the players data to an empty array
    // set the initial state of the loading state to true
    // set the initial state of the error state to an empty string
    const [data, setData] = useState({
        players: [],
        isLoading: true,
        error: '',
    });

    // Add a new state for the search query
    const [searchQuery, setSearchQuery] = useState('');

    // fetch data from the JSON file or API with axios get request
    // the try block returns a list of players and their attributes
    // the catch block logs an error if the data cannot be fetched
    // the use effect hook triggers the fetch data function on page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/data.json');
                setData({
                    players: response.data.data,
                    isLoading: false,
                    error: '',
                });
            } catch (error) {
                console.error('Error fetching data: ', error);
                setData({
                    players: [],
                    isLoading: false,
                    error: 'Error fetching data',
                });
            }
        };

        fetchData();
    }, []);

    // if the data is loading, display a loading message
    // if there is an error, display the error message
    // if (data.isLoading) return <div>Loading...</div>;
    if (data.error) return <div>{data.error}</div>;

    const filteredPlayers = data.players.filter((player) => {
        const searchLower = searchQuery.toLowerCase();
        const displayName = player.attributes?.display_name?.toLowerCase().includes(searchLower);
        const market = player.attributes?.market?.toLowerCase().includes(searchLower);
        const teamName = player.attributes?.team_name?.toLowerCase().includes(searchLower);
        const position = positionMapping[player.attributes?.position]?.toLowerCase().includes(searchLower) || player.attributes?.position?.toLowerCase().includes(searchLower);
    
        return displayName || market || teamName || position;
    });
    
    // render the players list
    return (
        <>                  
            <div className='players-container'>
                <div className='search-row'>
                    <div className='sub-header'>
                        <input
                            type='text'
                            placeholder='Search players...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='search-input'
                        />
                    </div>
                    <div>right</div>
                </div>
                    {filteredPlayers.length > 0 ? (
                    <ul className='players-list'>
                        {filteredPlayers.map((player, index) => (
                        <li className='players-item' key={index}>
                            <div className='player-container'>
                                <div className='player-contents'>
                                    <button className='last-five-button'>
                                        <div className='last-five-container'>
                                            <svg width='25' height='24' xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M4.75 8h2v12h-2zm5-3h2v15h-2zm5 10h2v5h-2zm5-4h2v9h-2z' fill='#FFF' fill-rule='evenodd'></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <div className='player-divider'></div>
                                    <div className='player'>
                                        <picture className='player-picture'>
                                        <img
                                            className='player-image'
                                            src={player.attributes?.image_url}
                                            alt={`${player.attributes?.display_name}`}
                                        />
                                        </picture>
                                        <h3 className='player-name'>{player.attributes?.display_name}</h3>
                                        <p className='player-team'>{player.attributes?.market}{' '}{player.attributes?.team_name}</p>
                                        <p className='player-position'>{positionMapping[player.attributes?.position] || player.attributes?.position}</p>
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
                        <img class='nrf' src='https://app.prizepicks.com/7478c2713b57c5acff99.png' alt='Magnifying Glass'  />
                        <h1>No search results found.</h1>
                        <span>Please try another query.</span>
                    </div>
                )}
                
            </div>
        </>
    );
}

export default Players;
