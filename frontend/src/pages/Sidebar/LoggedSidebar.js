import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Link, Redirect} from 'react-router-dom';

import profile from  '../../images/default_profile.png';
import favourites from  '../../images/favourites.jpg';
import orders from  '../../images/orders.jpg';
import wallet from  '../../images/wallet.jpg';
import promotions from  '../../images/promotions.jpg';
import invite from  '../../images/invite.jpg';
import help from  '../../images/help.jpg';

import RestService from "../../api/restaurant.service";

import { logout } from "../../actions/auth";



import './GeneralSidebar.css';

// This function returns the sidebar content when the uiser is logged in. It will only be called in GeneralSidebar.
// It has {openSidebar} prop in order to close the GeneralSidebar when accessing one of the links in this page.
// It contains user info and useful links.
// All the links close the sidebar upon clicked. Only the register and profile links are implemented, promotions, orders... are empty.
const LoggedSidebar = ({openSidebar}) => { 
    const {user: currentUser, isLoggedIn:  isLogged} = useSelector((state) => state.auth); //We get the user value and isLogged from store state.

    const dispatch = useDispatch();

    const [restList, setRestList] = useState([{name: '', url:''}]);
    
    const [favList, setFavList] = useState([{name: '', url:''}]);
    const [toFav, setToFav] = useState(false);
    const [fetched, setFetched] = useState(false);

    const logOut = () => {
        dispatch(logout());
        openSidebar(false);
    };

    const fetchFavs = async () => {
        let items = await RestService.getAllLogged(currentUser.email);
        console.log({'ieorjwoekrj':items});
        return items.filter(rest => rest.favourite==1);//We filter those that are faved.
    };

    useEffect(() => {
        fetchFavs();
    }, []);

    if (toFav && fetched){
        openSidebar(false);
        return <Redirect to={{
            pathname:'/viewall/favoritos',
            title: 'Favoritos',
            containerdata: favList,
          }} />;
    };

    return (
        <div>
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
                        <a><span className='username'>{currentUser.name}</span></a>
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
                           <a onClick={() => setToFav(true)}><span className='actionLabel'>Favourites</span></a>
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
