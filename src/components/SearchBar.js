import React from 'react';

const SearchBar = ({ searchQuery, isFocused, setIsFocused, handleSearchChange, handleCancel }) => {
    return (
        <div className='search-bar'>
            <div className='search-wrapper'>
                <div className='search-icon'>
                    <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                        <g transform='translate(5 4)' stroke='#FFF' strokeWidth='1.5' fill='none' fillRule='evenodd' opacity='0.5'>
                            <circle cx='6.5' cy='6.5' r='6.5'></circle>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m11 12 2.955 3.289'></path>
                        </g>
                    </svg>
                </div>
                <div className='search-input'>
                    <input
                        id="search"
                        placeholder='Search'
                        type='text'
                        autoComplete='off'
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => console.log('search input NOT focused')}
                    />
                </div>
            </div>
            <div className={`${!isFocused ? 'cancel-hide' : 'cancel'}`} onClick={handleCancel}>Cancel</div>
        </div>
    );
};

export default SearchBar;
