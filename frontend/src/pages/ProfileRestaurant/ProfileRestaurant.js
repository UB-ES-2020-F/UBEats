import React from 'react';
import { Button, Container, Row, Card } from 'react-bootstrap';
import pollo from '../../images/pollo.jpg';

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
              <Card style={{ width: '14rem' }}>
                <Card.Img variant="top" src={pollo} />
                <Card.Body>
                  <Card.Title>Pollo frito</Card.Title>
                  <Card.Text>
                    Descripcion del plato
                  </Card.Text>
                  <Button variant="success">Añadir al carrito</Button>
                </Card.Body>
              </Card>

              <Card style={{ width: '14rem' }}>
                <Card.Img variant="top" src={pollo} />
                <Card.Body>
                  <Card.Title>Pollo frito</Card.Title>
                  <Card.Text>
                    Descripcion del plato
                  </Card.Text>
                  <Button variant="success">Añadir al carrito</Button>
                </Card.Body>
              </Card>

              <Card style={{ width: '14rem' }}>
                <Card.Img variant="top" src={pollo} />
                <Card.Body>
                  <Card.Title>Pollo frito</Card.Title>
                  <Card.Text>
                    Descripcion del plato
                  </Card.Text>
                  <Button variant="success">Añadir al carrito</Button>
                </Card.Body>
              </Card>

              <Card style={{ width: '14rem' }}>
                <Card.Img variant="top" src={pollo} />
                <Card.Body>
                  <Card.Title>Pollo frito</Card.Title>
                  <Card.Text>
                    Descripcion del plato
                  </Card.Text>
                  <Button variant="success">Añadir al carrito</Button>
                </Card.Body>
              </Card>

            </Row>
          </Container>
        </Row>
        
      </Container>
      
      
    </section>

  );
}

export default ProfileRestaurant;