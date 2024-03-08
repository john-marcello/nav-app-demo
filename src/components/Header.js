import React, { useState } from 'react';
import '../assets/styles/Header.css';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/images/logo.svg';

function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const handleMobile = () => setIsMobile(!isMobile);

    return (
        <>
            <div className='nav-wrapper'>
                <div className='nav-container'>
                    <a className='nav-logo' href='/'>
                        <img className='nav-logo-img' src={Logo} alt='logo' />
                    </a>
                    <nav className={`nav-bar ${isMobile ? 'active' : ''}`}>
                        <NavLink to='/available' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Where To Play?</NavLink>
                        <NavLink to='/players' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Meet The Players</NavLink>
                        <NavLink to='/search-history' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Search History</NavLink>
                        <NavLink to='/help' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Help Center</NavLink>
                    </nav>
                    <div className='nav-buttons'>
                        <a className='nav-primary-btn' href='https://app.prizepicks.com/sign-up' target='_blank' rel='noreferrer'>Sign Up</a>
                        <a className='nav-secondary-btn' href='https://app.prizepicks.com/login' target='_blank' rel='noreferrer'>Log In</a>
                        <button className={`nav-mobile-btn ${isMobile ? 'active' : ''}`} onClick={handleMobile}>
                            <div className="top-line"></div>
                            <div className="mid-line"></div>
                            <div className="end-line"></div>
                        </button>
                    </div>
                    <div className={`nav-mobile ${isMobile ? 'active' : ''}`}>
                        <NavLink to='/available' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleMobile}>Where To Play?</NavLink>
                        <NavLink to='/players' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleMobile}>Meet The Players</NavLink>
                        <NavLink to='/search-history' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleMobile}>Search History</NavLink>
                        <NavLink to='/help' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleMobile}>Help Center</NavLink>
                        <a className='nav-tertiary-btn' href='https://app.prizepicks.com/login' target='_blank' rel='noreferrer'>Download The App</a>
                   </div>
                </div>
            </div>
        </>
    );
}

export default Header;
