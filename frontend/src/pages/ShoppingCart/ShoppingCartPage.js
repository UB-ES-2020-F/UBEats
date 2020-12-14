import '../../commons/components/ShoppingCart.css';
import React, {useEffect, useState} from 'react';
import { Button, Container, Row, Card, Col, Modal, Nav } from 'react-bootstrap';
import ShoppingCart from'../../commons/components/ShoppingCart.js'

const listaprops = [{
  titulo:"Pollo con Patatas",
  precio:"5.50"
},
{
  titulo:"Durum mixto solo carne",
  precio:"3.50"
},
{
  titulo:"Pizza Kebab",
  precio:"5"
},
{
  titulo:"PPlato mixto con patatas",
  precio:"5"
},
{
  titulo:"Menú Kebab y patatas",
  precio:"6"
},
]



class ShoppingCartPage extends React.Component {
    render() {  
      return (
        <body>{listaprops.map( (restaurante) =><ShoppingCart titulo={restaurante.titulo} precio={restaurante.precio}/>)}
        
        </body>
      );
    }
  }
  
  export default ShoppingCartPage;