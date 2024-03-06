import React from 'react';
import '../assets/styles/Home.css';

// renders the home page
// todo: buttons can be styled components in the future
function Home() {
    return (      
        <>
            <div className='container-primary'>
                <p className='subheading is-hero'>Daily Fantasy Made Easy<br /></p>
                <div className='is-hero'>
                    <img className='hero-cash' 
                        src='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero.png' 
                        style={{ 
                            transform: 'translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                            opacity: 1,
                            transformStyle: 'preserve-3d'
                        }} 
                        sizes='(max-width: 479px) 100vw, (max-width: 767px) 19vw, (max-width: 991px) 12vw, 14vw' 
                        srcSet='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero-p-500.png 500w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero.png 524w'
                        alt='money bag emoji' 
                    />
                    <h1 className='hero-text'>
                        <span>get your first</span> 
                        <span className='block'>deposit matched</span> up to 
                        <span className='dollar-sign'>&nbsp;$</span>
                        <span className='dollar-number-1'>1</span>
                        <span className='dollar-sign'>0</span>
                        <span className='dollar-sign'>0</span>
                    </h1>
                </div>
                <div className='padding-divider'></div>
                <div className='padding-divider'></div>
                <a className='home-button' href='/available'>Where To Play?</a>
                <div className='padding-divider'></div>
                <div className='padding-divider'></div>
            </div>    
        </>
    );        
}

export default Home;
