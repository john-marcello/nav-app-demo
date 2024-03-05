import React, { useState } from 'react';
import '../assets/styles/Available.css';

// set up an array of objects to represent the tab data
// each object has an id, alt text, text, and image
const tabs = [
    { 
        id: 1, 
        alt: 'All Games', 
        text: 'The easiest and fastest way to play Daily Fantasy Sports. Pick more or less on player stats to win! We\'ll match your first deposit up to $100!',   
        image: 'https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map.png', 
    },
    { 
        id: 2, 
        alt: 'Pick \'Em', 
        text: 'Select more or less on 2-6 player projections, choose Flex Play (1 or 2 picks can lose) or Power Play (all must win) and then lock in your entry for big payouts.', 
        image: 'https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e14386afcfa48907ecff4f_Pick%20%27Em%20Map.png', 
    },
    { 
        id: 3,
        alt: 'Pick \'Em Arena', 
        text: 'Select more or less on 2, 3, or 4 player projections and then submit your entry. Entries are then placed into groups according to member skill level, entry fee, number of projections selected, and the time of entry submission. Members win by selecting a perfect entry lineup or by having the best entry lineup in the group.', 
        image: 'https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65b176da9e767610a18330b7_Pick%20Em%20Arena%20Map.png',     
    },
    { 
        id: 4, 
        alt: 'Free To Play', 
        text: 'Everyday, users automatically receive 1,000 free "PrizePoints" to budget on entries (100 minimum per entry). Place a few large entries or lots of small ones and the top 100 users will win real money. Simply select more or less on 2-6 player projections, choose Flex Play (1 or 2 picks can lose) or Power Play (all must win), submit your entry, and see if you can win big.', 
        image: 'https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65cd8eafaa208cc50344f740_f2p_map.png', 
    },  
];

// renders the available page
// demonstrates the use of state to track the active tab

function Available() {
    // set up state and set the active tab to the first tab initial load
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <>
            <div className='tab-container'>
                <h1 className='header-available'>PrizePicks is available in <span class='text-color-green'>32</span> States, Washington DC, and Canada</h1>
                <p className='text-description'>If your state is highlighted below, <span class="text-color-green">LFG!</span></p>
                <div className='padding-divider'></div>
                <div className='tab-list'>
                    
                    {/* map through the tabs array and create the list of buttons */}
                    {/* triggeer the event handler to set the corresponding tab as the active tab */}
                    {/* update the class name dynamically to indicat ethe active tab */}
    
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`button ${activeTab.id === tab.id ? 'button-active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.alt}
                        </button>
                    ))}
    
                </div>
                <div className='padding-divider'></div>
                <div className='text-wrapper'>
                    <p className='text-description'>{activeTab.text }</p>
                </div>
                <div className='padding-divider'></div>
                <img
                    className='availability-map'
                    src={activeTab.image}
                    alt={activeTab.alt}
                />
                <div className='padding-divider'></div>
                <div className='padding-divider'></div>
                <p className='text-description'>*Available in all of Canada, except for Ontario.</p>
            </div>
        </>
    );
}

export default Available;




        
