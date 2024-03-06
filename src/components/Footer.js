import React from 'react';
import '../assets/styles/Footer.css';

// renders the footer component woth logos and copyright
function Footer() {
    return (
        <>
            <div className='line-divider'></div>
            <footer>
                <div className='footer-wrapper'>
                    <div className='footer-container'>
                        <a href='/' className='footer-logo'>
                            <img
                                src='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64d12477e094cf9b349735d4_Logomark_On-Dark.svg'
                                alt='PrizePicks Logomark'
                            />
                        </a>
                        <div className='footer-credits'>
                            © 2024 PrizePicks. All Rights Reserved.
                        </div>
                        <img
                            className='footer-atl'
                            src='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64d276555d3cffa2cab53088_atl.png'
                            alt='ATL graphic'
                        />
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
