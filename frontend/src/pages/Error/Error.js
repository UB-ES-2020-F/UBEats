import React, {useEffect, useState} from 'react';
import { Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';



import '../../commons/components/Error.css';

class Error extends React.Component {
  render() {  
    return (
        <section className="login">
            <div className="loginContainer">
                <div class="logo">
                    <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/d611f121110e16ba0ab072d584970d89.svg"></img>
                </div>
                <div className="text">
                    <h1>¡Vaya! Inténtalo de nuevo…</h1>
                    <p></p><p></p>
                    <h3>Se ha producido un error al cargar esta página.</h3>

                </div>
                <p></p><p></p><p></p>
                <Link to="/"><button>Volver a la página principal</button></Link>
                <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>
            </div>  
      </section>
    );
  }
}

export default Error;