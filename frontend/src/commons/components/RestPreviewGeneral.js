import React from 'react';
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'

/**
 * 
 * Componente que muestra la imagen, el titulo, el tiempo y la descripcion de un restaurante.
 *  
 */

function RestPreviewGeneral(props){

    return(
    <div className="listings-grid-element">
        <div className="image">
            <img src={props.Image} alt="Restaurant image"></img>
        </div>
        <div className="text">
            <div className="text-title">
                <h3>{props.name}</h3>
                <div className="info">
                    <span> {props.time} MINS </span>
                </div>
            </div>
        </div>
        <div className="text-lower">
            <span className="smallText">{props.desc}</span>
        </div>
    </div>
    );

}



export default RestPreviewGeneral