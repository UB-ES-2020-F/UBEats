import React, {useRef, useState} from 'react';
import { useDispatch } from "react-redux";

import { logout } from "../../actions/auth";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import {Link} from 'react-router-dom';
import sidebar from '../../images/sidebar.jpg';

import './MainNav.css'

//This function contains the navbar.
//It displays a clickable logo that links to the homepage, a form that wil be used to input direction of delivery and a button to open the sidebar, openSidebar is called to manage this latter action.
//isLogged is used to select whether the right-most part of the navbar displays a log in button that is linked to /login page or a log out button that logs the current user out.
const GeneralNav = ({isLogged, openSidebar}) => {
    const dispatch = useDispatch();
    
    const form = useRef(); //form reference.
    const [ubication, setUbication] = useState(); //get delivery address value, and update it.

    //This function dispatches redux action logout, to log out the user.
    const logOut = () => {
        dispatch(logout());
      };
    

    return (
        <header className='navbar'>
            <link href="//db.onlinewebfonts.com/c/11469c307f0de6481e3a04cc5d54ae93?family=Uber+Move+Text" rel="stylesheet" type="text/css"/> 
            <div class="container">
                <a className='tosidebar' onClick={() => openSidebar()}>
                    <img
                        src={sidebar} 
                        height="15px"
                        width="17px"
                        alt="Open sidebar">
                    </img>
                </a>
                <div class="logo">
                <Link to='/' className='linkto'><h1>UB<span>Eats</span></h1></Link>
                </div>
                <div class="navbarform">
                    <div class="header-option">
                        <i data-feather="map-pin"></i>
                        <Form ref={form}>
                        <Input
                            type="text"
                            name='ubication'
                            size='30'
                            placeholder="Enter delivery address"
                            value={ubication}
                        />
                        </Form>
                    </div>
                </div>
            
                <div class="searchBar">
                    <div class="header-option">
                        {isLogged ? (
                            <Link className='linkto' onClick={logOut}>Log out</Link>
                        ) : (
                            <Link to='/login' className='linkto'>Sign in</Link>)}
                        
                    </div>
                </div>
            </div>
        </header>
    );
}

export default GeneralNav;