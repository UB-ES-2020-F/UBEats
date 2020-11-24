import React from 'react';
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'
import RestPreviewGeneral from './RestPreviewGeneral.js'

/**
 * 
 * Componente estatico que siempre mostrara tres elementos compuestos por una imagen, un titulo y una descripcion
 * Y que corresponde al registro de restaurante y de deliveryman.
 *  
 */

function RegisterPubli(props){
    return(
        <div className="listings-grid-element">
            <div className="image_publi">
                <img src={props.Image} alt="Listing pic"></img>
            </div>
            <div className="text">
                <div className="text-title_publi">
                    <h3>{props.title}</h3>
                    <div className="info_publi">
                        <span>{props.desc}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default RegisterPubli

