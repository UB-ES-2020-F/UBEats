import React from 'react';
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'

function RestPreviewMin(props){
    console.log(props.name)
    return(
    <div className="listings-grid-element">
        <div className="image">
            <img src={props.Image} alt="Restaurant image"></img>
        </div>
        <div className="text">
            <div className="text-title">
                <h3>{props.name}</h3>
                <div className="info">
                    <span><strong>€</strong></span>
                </div>
            </div>
        </div>
    </div>
    );
}



export default RestPreviewMin