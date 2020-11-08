import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Row, Card } from 'react-bootstrap';
import pollo from '../../images/pollo.jpg';

const listaPlatos = [
  {
    Name: "Pollo frito",
    Price: "3$",
    Image: 'url(' + require('../../images/pollo.jpg') + ')',
    Description: "Delicioso pollo frito, 100% mortal."
  },
  {
    Name: "Alitas picantes",
    Price: "6$",
    Image: {pollo},
    Description: "Deliciosas alitas de rata criada en las mejores cloacas de la ciudad."
  },
  {
    Name: "Pikachu al horno",
    Price: "4$",
    Image: {pollo},
    Description: "Simplemente electrico."
  },
  {
    Name: "Chicken bucket",
    Price: "11$",
    Image: {pollo},
    Description: "Satisfacera todos tus deseos"
  },
  {
    Name: "Pollo a l'ast",
    Price: "5$",
    Image: {pollo},
    Description: "Clasico de los domingos"
  },
];

const listaSecciones = [
  {
    Header: "Elegido para ti",
    ListaPlatos: listaPlatos
  },
  {
    Header: "Clasicos indiscutibles",
    ListaPlatos: listaPlatos
  },
  {
    Header: "Pedidos recientemente",
    ListaPlatos: listaPlatos
  },
  {
    Header: "Ultimas novedades",
    ListaPlatos: listaPlatos
  },
]



function CardPlato(props) {
  return (
    <Card style={{ width: '14rem' }}>
      <Card.Img variant="top" src={props.Image} />
      <Card.Body>
        <Card.Title>{props.Name}</Card.Title>
        <Card.Text>
          {props.Description}
        </Card.Text>
        <Button variant="success">Añadir al carrito</Button>
      </Card.Body>
    </Card>
  );
}

function FilaPlatos (props) {
  var plato;
  var listaPlatos = []
  for (plato of props.listaPlatos) {
    
    var cardPlato = <CardPlato 
      Name={plato.Name}
      Description={plato.Description}
      Price={plato.Price}
      Image={plato.Image}
    >
    </CardPlato>

    listaPlatos.push(cardPlato);
  }
  return (listaPlatos);
}

function SeccionPlatos (props) {
  var seccionesReturn = [];
  {/** Para cada seccion,
  coger el header y ponerlo
  coger la lista de platos y hacer la fila
  
  - FALTA QUE COJA LOS DATOS DE LISTASECCIONES,
  DE MOMENTO ES UN DUMMY*/}
  for (var seccion in props.listaSecciones) {
    var seccionX = 
      <Row className="restaurantContainer">
        <Container>
          <Row>
            <h5>{seccion.Header}</h5> {/** por que no accede? :( */}
          </Row>
          <Row class="restauranteCardContainer">
            {/*Cards de platos*/}
            
            <FilaPlatos listaPlatos={listaPlatos}> {/** Aun es un dummy */}
            </FilaPlatos>

          </Row>
        </Container>
      </Row>
    
    seccionesReturn.push(seccionX)
  }

  return (seccionesReturn);
}

function ProfileRestaurant() {
  return (
    <section className="restaurantProfile">

      <Container>
        <Row>
          <Container fluid>
            {/* Banner */}
            <Row className="restaurantBanner"
            style={{backgroundImage: 'url(' + require('../../images/banner.jpg') + ')'}}>
              <Container >
                <Row style={{height: '55%'}}>
                </Row>
                <Row className="restaurantTitle">
                  <h1><strong>KFC</strong></h1>
                </Row>
                <Row className="restaurantTitle">
                  <h7><strong>Precio de envio: 2$ • 15/20 min • Valoracion: 4.8/5</strong></h7>
                </Row>
              </Container>
            </Row>
            </Container>
        </Row>
          
        {/* Info, direccion */}

        <Row style={{height: '4%'}}>

        </Row>
        
        <Row className="restaurantContainer">
          <Container>
            <Row>
              <p>$ • Chicken • American</p>
            </Row>
            <Row>
              <p>Rambla de Catalunya 58, 08001, Barcelona</p>
            </Row>
          </Container>
        </Row>
        
        {/* Elegido para ti, coleccion de items "plato" */}

        {/** 
         * CODIGO ANTIGUO
          <Row className="restaurantContainer">
          <Container>
            <Row>
              <h5>Elegido para ti</h5>
            </Row>
            <Row class="restauranteCardContainer">
             
              <FilaPlatos listaPlatos={listaPlatos}>
              </FilaPlatos>

            </Row>
          </Container>
        </Row> */}

        <SeccionPlatos listaSecciones={listaSecciones}>

        </SeccionPlatos>
        
      </Container>
      
    </section>

  );
}



export default ProfileRestaurant;