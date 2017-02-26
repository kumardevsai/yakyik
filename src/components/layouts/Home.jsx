import React from 'react';

import Zones from '../containers/Zones';
import Comments from '../containers/Comments';
import Nav from '../presentations/Nav'
import Account from '../containers/Account';

const Home = (props) => {

    return (
        <div>
            <Nav />
            <div className='container'>
                <div className='col-sm-6'>
                    <Account />
                    <Zones />
                </div>
                <div className='col-sm-6'>
                    <Comments />
                </div>
            </div>
        </div>
    );
    
}

export default Home;