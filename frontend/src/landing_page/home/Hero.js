import React from 'react';

function Hero() {
    return ( 
        <div className= 'container p-5 mb-5'>
            <div className= 'row text-center'>
                <img src= 'media/homeHero.png' alt= 'Hero Image' className='mb-5'/>
                <h1 className='mt-5'>Invest in Everything</h1>
                <p>TradeX is a platform that allows you to invest in stocks, crypto, and commodities all in one place.</p>
                <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"20%", margin:"0 auto"}}>Sign Up</button>
            </div>
        </div>
     );
}

export default Hero;