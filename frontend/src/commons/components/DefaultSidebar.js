import React from 'react';

import {Link} from 'react-router-dom';


import './GeneralSidebar.css';

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
