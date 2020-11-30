import React from 'react';
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'
import RestPreviewGeneral from './RestPreviewGeneral.js'

import { Link } from 'react-router-dom';

/**
 * 
 * Componente que muestra la categoria y las preview de los restaurantes, asi como un boton funcional para mostrar todos los restaurantes.
 *  
 */

function CategoriasHome(props){
    return(
        <div className="container3">
            <div className="header">
                <div className="header-title">
                    <h2>{props.titulo}</h2>
                </div>
                <div className="header-viewOptions">
                    <div className="viewAll">
                        <Link to="/viewall" className="link"></Link>
                        <Link to={{
                            pathname:'/viewall/'+props.titulo,
                            title: props.titulo,
                            containerdata: props.listaprops
                        }}>
                            View All
                        </Link>
                    </div>
                    <div className="viewMore">
                        <span className="arrow circle left"><i data-feather="arrow-left"></i>
                        </span>
                        <span className="arrow circle right darker">
                            <i data-feather="arrow-right"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div className="listings-grid">
                <div className="listings-col"> {props.listaprops.slice(0,3).map( (restaurante) =><RestPreviewGeneral rest={restaurante} />)} </div>
            </div>
        </div>
    );
}


export default CategoriasHome