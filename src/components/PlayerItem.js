import React from 'react';
import positionMapping from '../utils/positionMapping.js';

const PlayerItem = ({ player, index }) => {
    return (
        <li className='players-item' key={index}>
            <div className='player-container'>
                <div className='player-contents'>
                    <button className='btn-five'>
                        <div className='btn-five-box'>
                            <svg width='25' height='24' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M4.75 8h2v12h-2zm5-3h2v15h-2zm5 10h2v5h-2zm5-4h2v9h-2z' fill='#FFF' fillRule='evenodd'></path>
                            </svg>
                        </div>
                    </button>
                    <div className='player-divider'></div>
                    <div className='player'>
                        <picture className='player-picture'>
                            <img className='player-image' src={player?.attributes?.image_url} alt={player?.attributes?.display_name} />
                        </picture>
                        <h3 className='player-name'>{player?.attributes?.display_name}</h3>
                        <p className='player-team'>{player?.attributes?.market} {player?.attributes?.team_name}</p>
                        <p className='player-position'>{positionMapping[player?.attributes?.position] || player?.attributes?.position}</p>
                    </div>
                </div>
                <div className='projected-score'>
                    <div className='score-container'>
                        <div className='score'>{player?.attributes?.score}</div>
                    </div>
                    <div className='projected-divider'></div>
                    <p className='points'>Points</p>
                </div>
            </div>
            <div className='more-less'>
                <button className='less'><div>LESS</div></button>
                <button className='more'><div>MORE</div></button>
            </div>
        </li>
    );
};

export default PlayerItem;
