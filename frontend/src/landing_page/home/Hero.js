import React from 'react';

function Hero() {
    return ( 
        <div className= 'container p-5 mb-5'>
            <div className= 'row text-center'>
                <img src= 'media/homeHero.png' alt= 'Hero Image' className='mb-5'/>
                <h1 className='mt-5'>Invest in Everything</h1>
                <p>TradeX is a platform that allows you to invest in stocks, crypto, and commodities all in 1 place.</p>
            </div>
        </div>
     );
}

export default Hero;