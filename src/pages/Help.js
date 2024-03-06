import React from 'react';
import '../assets/styles/Help.css';

import VideoEmbed from '../components/VideoEmbed';

// renders the help page
function Help() {
    return (
        <>
            <div className='container-large'>
                <div className='flex-center'>
                    <h1 className='encode-sans'>help center</h1>
                    <div className='brick-accent'>help center</div>
                </div>
            </div>
            <div className='container-large'>
                <p className='leaders'>Management is doing things right; leadership is doing the right things.</p>
                <p className='team-work'>Everyone needs help sometimes. Support your team!</p>
                <div className='video-wrapper'>
                    <div className='video-container'>
                        <VideoEmbed />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Help;
