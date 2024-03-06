import React from "react";
import "../assets/styles/Header.css";

import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";


// renders the header componennt with logo, nav, and buttons
// uses react-router-dom to set up linked routes
function Header() {
    return (
        <>
            <div className='nav-wrapper'>
                <div className='nav-container'>
                    <a className='nav-logo' href='/'>
                        <img className='nav-logo-img' src={Logo} alt='logo' />
                    </a>
                    <nav className='nav-bar'>
                        <Link className='nav-link' to='/available'>Where To Play?</Link>
                        <Link className='nav-link' to='/players'>Meet The Players</Link>
                        <Link className='nav-link' to='/help'>Help Center</Link>
                    </nav>
                    <div className='nav-buttons'>
                        <a className='nav-primary-btn' href='https://app.prizepicks.com/sign-up' target='_blank' rel='noreferrer'>Sign Up</a>
                        <a className='nav-secondary-btn' href='https://app.prizepicks.com/login' target='_blank' rel='noreferrer'>Log In</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
