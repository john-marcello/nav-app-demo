import React from 'react';
import '../assets/styles/Home.css';

// renders the home page
function Home() {
    return (      
        <>
            <div className='home-wrapper'>
                <header className='hero-home'>
                    <p className='hero-subtext'>Daily Fantasy Made Easy</p> 
                    <h1 className='hero-text'>
                        <span>get your first</span> 
                        <span className='hero-block'>deposit matched</span> up to 
                        <span className='hero-dollar'>&nbsp;$</span>
                        <span className='hero-dollar'>1</span>
                        <span className='hero-dollar'>0</span>
                        <span className='hero-dollar'>0</span>
                    </h1>
                    <img className='hero-cash' 
                        src='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero.png' 
                        sizes='(max-width: 479px) 100vw, (max-width: 767px) 19vw, (max-width: 991px) 12vw, 14vw' 
                        srcSet='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero-p-500.png 500w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero.png 524w'
                        alt='money bag emoji' 
                    />
                </header>
                <a className={'btn btn-primary btn-home'} href='/available'>Where To Play?</a>
                <div className='home-divider'></div>
            </div>    
        </>
    );        
}

export default Home;
