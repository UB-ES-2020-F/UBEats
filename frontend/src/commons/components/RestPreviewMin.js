import React, { useState } from "react";
import Heart from "react-animated-heart";
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'

function RestPreviewMin(props){
    const [isClick, setClick] = useState(false);
    return(
    <div class="listings-grid-element">
        <div class="image">
            <img src={props.Image} alt="Restaurant image"></img>
        </div>
        <div class="text">
            <div class="text-title">
                <h3>{props.name}</h3>
                <div class="info">
                    <span> {props.price} € </span>
                </div>
            </div>
            <div class="rating">
                <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
            </div>
        </div>
    </div>
    );

}



export default RestPreviewMin