import React, {useRef, useState} from 'react';
import { useDispatch } from "react-redux";



import {Navbar} from 'react-bootstrap';

import {Link} from  'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


import { logout } from "../../actions/auth";

import sidebar from '../../images/sidebar_btn.jpg';

import Logo from '../../commons/components/Logo.js';

import './MainNav.css';


const NavCustom = ({isLogged, openSidebar}) => {
    const dispatch = useDispatch();
    
    const form = useRef(); //form reference.
    const [ubication, setUbication] = useState(); //get delivery address value, and update it.

    //This function dispatches redux action logout, to log out the user.
    const logOut = () => {
        dispatch(logout());
      };

    return (
        <Navbar fluid bg="light">
            <a className="ml-sm-4 mr-sm-4 mt-sm-3" onClick={() => openSidebar()}>
                <img
                    src={sidebar} 
                    height="15px"
                    width="17px"
                    alt="Open sidebar">
                </img>
            </a>
            <Logo classNameProp='ml-sm-4'/>
            <div className="navbarcustomform">
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
            <div>
                <div className='mr-sm-4'>
                    {isLogged ? (
                        <Link className='linkto' onClick={logOut}>Log out</Link>
                    ) : (
                        <Link to='/login' className='linkto'>Sign in</Link>)}
                </div>
            </div>
        </Navbar>
    );
};

export default NavCustom;