import React, { useState } from 'react';
import '../assets/styles/Available.css';
import data from '../data/tabs.json';

function Available() {
    const [activeTab, setActiveTab] = useState(data.tabs[0]);

    return (
        <>
            <div className='available-container'>
                <h1 className='hero-text hero-text-avail'>PrizePicks is available in <span className='available-green'>32</span> States, Washington DC, and Canada</h1>
                <div className='available-block'>
                    <div className='tab-list'>
                        {data.tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`btn btn-tabs ${activeTab.id === tab.id ? 'btn-tabs-active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.alt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={'paragraph-text'}>
                    <p className='text-description'>{activeTab.text} <a target='_blank' rel='noopener noreferrer' href={`${activeTab.url}`}>Learn How To Play Here</a>.</p>
                </div>
                <div className='available-block'>
                    <img
                        className='availability-map'
                        src={activeTab.image}
                        alt={activeTab.alt}
                    />
                    <p className='available-disclaimer'>*Available in all of Canada, except for Ontario.</p>
                </div>    
            </div>
        </>
    );
}

export default Available;
