import React from 'react';
import {Button} from 'react-bootstrap';

import {Link} from 'react-router-dom';

import Sidebar from 'react-sidebar';

import './GeneralSidebar.css';

const GeneralSidebar = () => { 
    return (
        <Sidebar
            sidebar={
                <div>
                    <div className='div-margin'>
                        <div className='div-button'>
                        <Link to='/login'><Button variant='dark'>Log in</Button></Link>
                        </div>
                        <div style={{ textDecoration: 'none' }}>
                            <Link to='/registerrestaurant' className='navlink'>Register as a restaurant</Link>
                            <br></br>
                            <Link to='/registerdeliveryman'>Register as a deliveryman</Link>
                        </div>
                    </div>
                </div>
            }
            styles={{ sidebar: { background: "white" } }}
        >
        </Sidebar>
    );
    
}

export default GeneralSidebar;