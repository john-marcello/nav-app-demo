import React from "react";

// renders the home page
function Home() {
    return (
        <>
            <h1>Home Page</h1>

            <div className='align-center is-hero'>
                <img
                    className='hero_cash emoji_parallax'
                    src='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero.png'
                    alt='money bag emoji'
                    sizes='(max-width: 479px) 100vw, (max-width: 767px) 19vw, (max-width: 991px) 12vw, 14vw'
                    data-w-id='ce6fe720-5da6-d49c-1e4b-51f40bcb2a24'
                    loading='eager'
                    srcset='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero-p-500.png 500w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/64deafcd3f4453c7e7362ef7_money-bag-hero.png 524w'
                />s
                <h1>
                    get your first <span class='block'>deposit matched</span> up
                    to <span className='dollar_sign'>$</span>
                    <span className='dollar_number-1'>1</span>
                    <span className='dollar_number-green'>0</span>
                    <span className='dollar_number-green'>0</span>
                </h1>
            </div>

            <img
                class='availability-map'
                src='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map.png'
                alt=''
                sizes='(max-width: 479px) 90vw, (max-width: 767px) 96vw, (max-width: 991px) 93vw, 94vw'
                fs-richtext-component='availability_map'
                loading='eager'
                srcset='https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map-p-500.png 500w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map-p-800.png 800w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map-p-1080.png 1080w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map-p-1600.png 1600w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map-p-2000.png 2000w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map-p-2600.png 2600w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map-p-3200.png 3200w, https://assets-global.website-files.com/64b5f8bfc12b3ec8aef889d7/65e1435dda5fed0d4d270589_Availability%20Map.png 3699w'
            ></img>
        </>
    );
}

export default Home;
