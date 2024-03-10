import React, { useState } from 'react';
import '../assets/styles/Available.css';
// Adjust the path as necessary to match your project structure
import data from '../data/tabs.json';

function Available() {
    const [activeTab, setActiveTab] = useState(data.tabs[0]);

    return (
        <>
            <div className='available-container'>
                <h1 className='available-hero'>PrizePicks is available in <span className='text-color-green'>32</span> States, Washington DC, and Canada</h1>
                <div className='available-divider'></div>
                <div className='tab-list'>
                    {data.tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`button ${activeTab.id === tab.id ? 'button-active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.alt}
                        </button>
                    ))}
                </div>
                <div className='available-divider'></div>
                <div className='available-subtext'>
                    <p className='text-description'>{activeTab.text}</p>
                </div>
                <div className='available-divider'></div>
                <img
                    className='availability-map'
                    src={activeTab.image}
                    alt={activeTab.alt}
                />
                <div className='bottom-divider'></div>
                <p className='available-disclaimer'>*Available in all of Canada, except for Ontario.</p>
                <div className='bottom-divider'></div>       
            </div>
        </>
    );
}

export default Available;
