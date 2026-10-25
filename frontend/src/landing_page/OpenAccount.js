import React from 'react';

function OpenAccount() {
    return ( 
        <div className= 'container p-5 mb-5'>
            <div className= 'row text-center'>
                <h1 className='mt-5'>Open An Account</h1>
                <p>TradeX is a platform that allows you to invest in stocks, crypto, and commodities all in one place.</p>
                <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"20%", margin:"0 auto"}}>Sign Up Now</button>
            </div>
        </div>
     );
}

export default OpenAccount;