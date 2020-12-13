import React, { useState } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

import 'react-bootstrap';
import 'react-router-dom';
import Heart from "react-animated-heart";
import './Main.css';

import RestService from "../../api/restaurant.service";

function RestPreviewMin(props){
    const {user: currentUser, isLoggedIn:  isLogged} = useSelector((state) => state.auth); //We get the user value and isLogged from store state.
    const [isClick, setClick] = useState(props.rest.favourite);
    const updateRestaurant = () => {
        if (currentUser.user.email){
            RestService.postFav(props.rest.email, currentUser.user.email);
        }
    };

    return(
        <div className="listings-grid-element">
            <div className="image">
                <img src={props.rest.url} alt="Restaurant image"></img>
            </div>
            <div className="text">
                <div className="text-title">
                    <h3><Link className='linkto' to={{
                            pathname:'/profilerestaurant',
                            rest_id: props.rest.email
                    }}>{props.rest.name}</Link></h3>
                    <div className="info">
                        <span><strong>€</strong></span>
                    </div>
                </div>
                <div className="rating">
                    {isLogged && <Heart isClick={isClick} onClick={() => {
                        setClick(!isClick);
                        updateRestaurant();
                        }
                    } />}
                </div>
            </div>
        </div>
    );
}

export default RestPreviewMin