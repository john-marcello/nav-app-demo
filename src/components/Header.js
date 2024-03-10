import React, { useEffect, useState } from 'react';
import '../assets/styles/Header.css';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/images/logo.svg';

function Header() {
    
    const navLinks = [
        { path: '/available', name: 'Where To Play?' },
        { path: '/players', name: 'Meet The Players' },
        { path: '/search-history', name: 'Search History' },
        { path: '/help', name: 'Help Center' },
      ];

    const [isMobile, setIsMobile] = useState(false);
    const handleMobile = () => setIsMobile(!isMobile);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobile(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className='nav-wrapper'>
                <div className='nav-container'>
                    <a className='nav-logo' href='/'>
                        <img className='nav-logo-img' src={Logo} alt='logo' />
                    </a>
                    <nav className={`nav-screen ${isMobile ? 'active' : ''}`}>
                        {navLinks.map(({ path, name }) => (
                        <NavLink 
                            key={path} to={path} 
                            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{name}
                        </NavLink>
                        ))}
                    </nav>
                    <div className='nav-buttons'>
                        <a className={`btn btn-primary btn-signup`} href='https://app.prizepicks.com/sign-up' target='_blank' rel='noreferrer'>Sign Up</a>
                        <a className={`btn btn-secondary btn-login`} href='https://app.prizepicks.com/login' target='_blank' rel='noreferrer'>Log In</a>
                        <button className={`btn-mobile ${isMobile ? 'active' : ''}`} onClick={handleMobile}>
                            <div className="top-line"></div>
                            <div className="mid-line"></div>
                            <div className="end-line"></div>
                        </button>
                    </div>
                    <nav className={`nav-mobile ${isMobile ? 'active' : ''}`}>
                        {navLinks.map(({ path, name }) => (
                        <NavLink 
                            key={path} to={path} 
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleMobile}>{name}
                        </NavLink>
                        ))}
                        <a className='nav-tertiary-btn' href='https://apps.apple.com/us/app/prizepicks-fantasy-game/id1437843273' target='_blank' rel='noreferrer'>Download The App</a>
                   </nav>
                </div>
            </div>
        </>
    );
}

export default Header;
