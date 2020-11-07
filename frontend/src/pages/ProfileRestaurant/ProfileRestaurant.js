import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Row, Card } from 'react-bootstrap';
import pollo from '../../images/pollo.jpg';

const infoPlatos = [
  {
    Name: "Pollo frito",
    Price: "3$",
    Image: {pollo},
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
  }
];

function GenerarCardPlato(props) {
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

function GenerarPlatos (props) {
  /**return (
    for (const plato in props) {
      GenerarCardPlato(plato);
    }
  );*/
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

        <Row className="restaurantContainer">
          <Container>
            <Row>
              <h5>Elegido para ti</h5>
            </Row>
            <Row class="restauranteCardContainer">
              {/*Cards de platos*/}

            
              

            </Row>
          </Container>
        </Row>
        
      </Container>
      
      
    </section>

  );
}



export default ProfileRestaurant;