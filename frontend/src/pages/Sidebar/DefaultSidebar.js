import React from 'react';

import {Link} from 'react-router-dom';


import './GeneralSidebar.css';
// This function returns the sidebar content when the uiser is not logged in. It will only be called in GeneralSidebar.
// It has {openSidebar} prop in order to close the GeneralSidebar when accessing one of the links in this page.
// It contains login and register links.
const DefaultSidebar = ({openSidebar}) => { 
    return (
        <div>
            <div className='parentDiv'>
                <div className='div-button'>
                <Link to='/login' onClick={() => openSidebar(false)}><button>Log in</button></Link>
                </div>
                <div className='linkdiv'>
                    <a className='sidebarlink' onClick={() => openSidebar(false)}>
                        <Link to='/registerrestaurant' className='linkto smallText'>Register as a restaurant</Link>
                    </a>
                    <br></br>
                    <br></br>
                    <a className='sidebarlink' onClick={() => openSidebar(false)}>
                        <Link to='/registerdeliveryman' className='linkto smallText'>Register as a deliveryman</Link>
                    </a>
                </div>
            </div>
        </div>
    );
    
}

export default DefaultSidebar;
