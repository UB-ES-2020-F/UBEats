import React, {useRef, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Navbar} from 'react-bootstrap';
import {Link} from  'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import SearchForm from "./SearchForm.js";
import { logout } from "../../actions/auth";
import sidebar from '../../images/sidebar_btn.jpg';
import Logo from '../../commons/components/Logo.js';
import './MainNav.css';


const NavCustom = ({openSidebar}) => {
    const {user: currentUser, isLoggedIn:  isLogged} = useSelector((state) => state.auth); //We get the user value and isLogged from store state.

    const dispatch = useDispatch();
    
    const form = useRef(); //form reference.

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
            <div className="navbarcustomform mt-sm-3">
                <SearchForm />                
            </div>
            <div>
                <div className='mr-sm-4 mt-sm-3'>
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