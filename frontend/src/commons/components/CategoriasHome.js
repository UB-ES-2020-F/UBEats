import React from 'react';
import './Main.css';
import 'react-bootstrap';
import'react-router-dom';
import photo from '../../images/ubeats.png'
import RestPreviewGeneral from './RestPreviewGeneral.js'
import { Link } from 'react-router-dom';


function CategoriasHome(props){
    return(
        <div class="container3">
            <div class="header">
                <div class="header-title">
                    <h2>{props.titulo}</h2>
                </div>
                <div class="header-viewOptions">
                    <div class="viewAll">
                        <Link to="./viewall" className="link">View All</Link>
                    </div>
                    <div class="viewMore">
                        <span class="arrow circle left"><i data-feather="arrow-left"></i>
                        </span>
                        <span class="arrow circle right darker">
                            <i data-feather="arrow-right"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="listings-grid">
                <div class="listings-col"> {props.listaprops.map( (restaurante) =><RestPreviewGeneral Image={restaurante.Image} name={restaurante.name} desc={restaurante.desc} time={restaurante.time} />)} </div>
            </div>
        </div>
    );
}


export default CategoriasHome