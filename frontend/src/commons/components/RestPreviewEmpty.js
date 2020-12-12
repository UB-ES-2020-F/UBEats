import React, { useState } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

import Heart from "react-animated-heart";
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from "../../images/empty_rest.png";
/**
 * 
 * Componente que muestra la imagen y el nombre de un restaurante.
 *  
 */

function RestPreviewEmpty(){
    return(
    <div className="listings-grid-element">
        <div className="image">
            <img src={photo} alt="Restaurant image"></img>
        </div>
    </div>
    );
}

export default RestPreviewEmpty