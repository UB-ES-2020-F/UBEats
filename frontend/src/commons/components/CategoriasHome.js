import React from 'react';
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'
import RestPreviewGeneral from './RestPreviewGeneral.js'
import RestPreviewEmpty from './RestPreviewEmpty.js'

import { Link } from 'react-router-dom';

/**
 * 
 * Componente que muestra la categoria y las preview de los restaurantes, asi como un boton funcional para mostrar todos los restaurantes.
 *  
 */

function CategoriasHome(props){
    const N = 3; //Number of elements to display in categoras home.
    const buildCategory = (arr) => {
        let real_previews = Math.min(arr.length, N);
        let empty_previews = N - Math.min(arr.length, N);
        return arr.slice(0,real_previews).map( (restaurante) =><RestPreviewGeneral rest={restaurante} key={restaurante.email}/>).concat(new Array(empty_previews).fill(<RestPreviewEmpty/>));
    };
    return(
        <div className="container3">
            <div className="header">
                <div className="header-title">
                    <h2>{props.titulo}</h2>
                </div>
                <div className="header-viewOptions">
                    <div className="viewAll">
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
                <div className="listings-col"> {buildCategory(props.listaprops)} </div>
            </div>
        </div>
    );
}

export default CategoriasHome