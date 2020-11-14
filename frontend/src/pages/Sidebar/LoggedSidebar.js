import React from 'react';
import {useDispatch} from 'react-redux';

import {Link} from 'react-router-dom';

import profile from  '../../images/default_profile.png';
import favourites from  '../../images/favourites.jpg';
import orders from  '../../images/orders.jpg';
import wallet from  '../../images/wallet.jpg';
import promotions from  '../../images/promotions.jpg';
import invite from  '../../images/invite.jpg';
import help from  '../../images/help.jpg';

import { logout } from "../../actions/auth";



import './GeneralSidebar.css';

// This function returns the sidebar content when the uiser is logged in. It will only be called in GeneralSidebar.
// It has {openSidebar} prop in order to close the GeneralSidebar when accessing one of the links in this page.
// It contains user info and useful links.
// All the links close the sidebar upon clicked. Only the register and profile links are implemented, promotions, orders... are empty.
const LoggedSidebar = ({openSidebar}) => { 
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logout());
        openSidebar(false);
    };

    return (
        <div>
            {}
            <div className='parentDiv'>
                <div className='profile'>
                    <div className='column1'>
                        <Link to='/profileclient' onClick={() => openSidebar(false)}>
                            <img
                                src={profile}   
                                alt='profile image'
                                height='40px'
                                width='40px'
                            ></img>
                        </Link>
                    </div>
                    <div className='column2'>
                        <a><span className='username'>Username</span></a>
                        <br></br>
                        <a onClick={() => openSidebar(false)}><Link to='/profileclient' className='account'>See account</Link></a>
                    </div>
                    <br></br>
                    <br></br>
                </div>
                <div className='actions'>
                    <div>
                        <div className='column3'>
                                <img 
                                    src={orders}   
                                    alt='profile image'
                                    height='15px'
                                    width='15px'
                                ></img>
                        </div>
                        <div className='column4'>
                            <a onClick={() => openSidebar(false)}><span className='actionLabel'>Orders</span></a>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    <div>
                        <div className='column3'>
                                <img 
                                    src={favourites}   
                                    alt='profile image'
                                    height='15px'
                                    width='15px'
                                ></img>
                        </div>
                        <div className='column4'>
                            <a onClick={() => openSidebar(false)}><span className='actionLabel'>Favourites</span></a>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    <div>
                        <div className='column3'>
                                <img 
                                    src={wallet}   
                                    alt='profile image'
                                    height='15px'
                                    width='15px'
                                ></img>
                        </div>
                        <div className='column4'>
                            <a onClick={() => openSidebar(false)}><span className='actionLabel'>Wallet</span></a>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    <div>
                        <div className='column3'>
                                <img 
                                    src={help}   
                                    alt='profile image'
                                    height='15px'
                                    width='15px'
                                ></img>
                        </div>
                        <div className='column4'>
                            <a onClick={() => openSidebar(false)}><span className='actionLabel'>Help</span></a>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    <div>
                        <div className='column3'>
                                <img 
                                    src={promotions}   
                                    alt='profile image'
                                    height='15px'
                                    width='15px'
                                ></img>
                        </div>
                        <div className='column4'>
                            <a onClick={() => openSidebar(false)}><span className='actionLabel'>Promotions</span></a>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    <div>
                        <a onClick={() => console.log('click!')}>
                            <div className='column3'>
                                    <img 
                                        src={invite}   
                                        alt='profile image'
                                        height='15px'
                                        width='15px'
                                    ></img>
                            </div>
                            <div className='column4'>
                                <a onClick={() => openSidebar(false)}><span className='actionLabel'>Invite friends</span></a>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='logoutDiv'>
                    <Link className='logout' onClick={logOut}>Log out</Link>
                </div>
            </div>
            <hr className='separator'></hr>
            <div className='parentDiv'>
                
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

export default LoggedSidebar;
