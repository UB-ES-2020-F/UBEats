import React from 'react';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';
import pollo from "../../images/banner.jpg";
import pikachu from "../../images/pikachu.jpg";
import bucket from "../../images/bucket.jpg";

const listaPlatos = [
  {
    Name: "Pollo frito",
    Price: "3$",
    Image: pollo,
    Description: "Delicious fried chicken, 100% deadly."
  },
  {
    Name: "Hot wings",
    Price: "6$",
    Image: pollo,
    Description: "Chicken wings, of course! *wink wink*"
  },
  {
    Name: "Fried Pikachu",
    Price: "4$",
    Image: pikachu,
    Description: "Simply electric."
  },
  {
    Name: "Chicken bucket",
    Price: "11$",
    Image: bucket,
    Description: "Will satisfy all your needs."
  }
];

const listaSecciones = [
  {
    Header: "Picked for you",
    ListaPlatos: listaPlatos
  },
  {
    Header: "Classics",
    ListaPlatos: listaPlatos
  },
  {
    Header: "Recently ordered",
    ListaPlatos: listaPlatos
  },
  {
    Header: "New items",
    ListaPlatos: listaPlatos
  },
]



function CardPlato(props) {
  return (
    <Card style={{ width: '14rem' }}>
      <Card.Img className="card-img-top" variant="top" src={props.Image} fluid/>
      <Card.Body>
        <Card.Title className="textFont">{props.Name}</Card.Title>
        <Card.Text className="textFont">
          {props.Description}
        </Card.Text>
        {/** <Button variant="success">Añadir al carrito</Button> */}
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
  
  for (var seccion in props.listaSecciones) {
    
    var seccionX = 
      <Row className="restaurantContainer">
        <Container>
          <Row>
            <h5 className="sectionHeader">{props.listaSecciones[seccion].Header}</h5>
          </Row>
          <Row className="productRow">
            
            <FilaPlatos listaPlatos={props.listaSecciones[seccion].ListaPlatos}>
            </FilaPlatos>

          </Row>
        </Container>
      </Row>
    
    seccionesReturn.push(seccionX)
  }

  return (seccionesReturn);
}

function ListaCategorias(props) {
  var listaCategorias = []
  var columnas = 0;

  for (var categoria in props.listaSecciones) {
    var categoriaX =
    <div class="p-2">
      <p className="textFont">{props.listaSecciones[categoria].Header}</p>
    </div>
    
    columnas++;
  
    listaCategorias.push(categoriaX)
  }

  while (columnas < 6) {
    var columnaVacia = 
    <div class="p-2">
      <p></p>
    </div>
    

    columnas++;
    listaCategorias.push(columnaVacia)
  }

  {/**  
  var desplegable = 
  <div class="p-2">
      <p className="textFont">More</p>
  </div>

  listaCategorias.push(desplegable);

  */}

  return(listaCategorias);
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
                  <h1 className="textFont"><strong>KFC</strong></h1>
                </Row>
                <Row className="restaurantTitle">
                  <h8><strong>Precio de envio: 2$ • 15/20 min • Valoracion: 4.8/5</strong></h8>
                </Row>
              </Container>
            </Row>
            </Container>
        </Row>
          
        <Row style={{height: '1%'}}>

        </Row>
        
        <Row className="restaurantContainer">
          <Container>
            <Row>
              <p>$ • Chicken • American • <a href="https://weirdorconfusing.com/">More info</a></p> 
            </Row>
            <Row>
              <p>Rambla de Catalunya 58, 08001, Barcelona</p>
            </Row>
          </Container>
        </Row>

        <Container className="restaurantContainer">
          <div className="d-flex flex-row">
            <ListaCategorias listaSecciones={listaSecciones}></ListaCategorias>
          </div>
        </Container>
        

        <SeccionPlatos listaSecciones={listaSecciones}>

        </SeccionPlatos>
        
      </Container>
      
    </section>

  );
}



export default ProfileRestaurant;