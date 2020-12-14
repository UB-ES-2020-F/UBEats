import React from 'react';
import './Main.css';

import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className="header2">
            <div className="container2">
                <div className="logo">
                    <Link to='/'><h1>UB<span>Eats</span></h1></Link>
                </div>
                <div className="searchBar">
                    <div className="header-option">
                        <i data-feather="search"/>
                        <Link to='/registerrestaurant' className='linkto'><span>Create an enterprise account</span></Link>
                    </div>
                    <div className="header-option">
                        <Link to='/registerdeliveryman' className='linkto'><span>Join the delivery crew!</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;