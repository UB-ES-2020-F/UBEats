import React from 'react';
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'
import RestPreviewGeneral from './RestPreviewGeneral.js'

/**
 * 
 * Componente que muestra la imagen de una categoria y su titulo. Ejemplo:
 * Imagen y alcohol
 *  
 */

function Categorias(props){
    return(
        <div class="listings-grid-element">
              <div class="image">
              <img src={props.Image} alt="Type image"></img>
              </div>
              <div class="text">
                <div class="text-title">
                  <h3>{props.title}</h3>
                </div>
              </div>
            </div>
    );
}


export default Categorias