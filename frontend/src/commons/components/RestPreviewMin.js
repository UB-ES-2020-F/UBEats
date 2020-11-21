import React from 'react';
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'

function RestPreviewMin(props){

    return(
    <div class="listings-grid-element">
        <div class="image">
            <img src={props.Image} alt="Restaurant image"></img>
        </div>
        <div class="text">
            <div class="text-title">
                <h3>{props.name}</h3>
                <div class="info">
                    <span> {props.time} MINS </span>
                </div>
            </div>
        </div>
    </div>
    );

}



export default RestPreviewMin