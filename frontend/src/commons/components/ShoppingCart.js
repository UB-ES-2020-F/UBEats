import '../../commons/components/ShoppingCart.css';
import { Button, Container, Row, Card, Col, Modal, Nav } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';

function ShoppingCart(props){
    return (
        <body>
          <div className='container2'>
          <Row>
            
                <Col>
                  <h5>{props.titulo}</h5>
                  <h7>{props.precio} €</h7>
                </Col>
                <Col>
                  <h5><b>Cantidad</b></h5>
                  <input className="number" type="number" id="quantity" name="quantity" min="1" max="30"></input>
                </Col>
                
                <Col>
                  <button className="eliminar">Eliminar</button>
                </Col>
            
          </Row>
          </div>
        </body>
      );
    }



export default ShoppingCart