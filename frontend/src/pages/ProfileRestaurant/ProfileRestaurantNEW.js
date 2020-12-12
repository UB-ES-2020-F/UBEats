import React, { useState, useEffect} from 'react';
import { Button, Container, Row, Card, Modal, Nav, Col } from 'react-bootstrap';

import restaurantService from "../../api/restaurant.service.js";

//import 'bootstrap/dist/css/bootstrap.min.css';

function ProfileRestaurantF({rest_id}) {
  const [listaInfo, setListaInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [menuList, setMenuList] = useState([{
    item_id: 0,
    title: 'Loading',
    desc: 'Loading',
    price: 10.95,
    types: [ 'vegetariano prueba1', 'vegetariano prueba2' ]
  }]);

  const [restaurantInfo, setRestaurantInfo] = useState({
    "email": " ",
    "name": " ",
    "CIF": " ",
    "street": " ",
    "pass": " ",
    "phone": " ",
    "tipo": " ",
    "url": " ",
    "avaliability": " ",
    "visible": " ",
    "iban": " ",
    "allergens": " ",
  })

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  const getCategories = (items) => {
    const listaSecciones_dyn = [];

    for (let cat in items){
      listaSecciones_dyn.push({
        Header: cat,
        ListaPlatos: items[cat]
      })
    };
    console.log({'listsec':listaSecciones_dyn});
    setListaInfo(listaSecciones_dyn);
  };

  const fetchMenu = async () => {
    const items = await restaurantService.getRestaurantMenu(rest_id);
    setMenuList(items);
    getCategories(items);
  };


  const fetchRestaurantInfo = async () => {
    const restInfo = await restaurantService.getRestaurant(rest_id);
    console.log(restInfo['restaurant']);    
    setRestaurantInfo(restInfo['restaurant']);
  };

  useEffect(() => {
    fetchRestaurantInfo();
    fetchMenu();
  }, []);

    /**
    * Generates a product's card
    * props: Product's name, description, image and price.
    */

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

  /**
    * Generates an array of product's cards
    * props: Array of product's data
    */
  function FilaPlatos (props) {
    var plato;
    var listaPlatos = []
    for (plato of props.listaPlatos) {
      
      var cardPlato = <CardPlato 
        Name={plato.title}
        Description={plato.desc}
        Price={plato.price}
        Image={plato.url}
      >
      </CardPlato>

      listaPlatos.push(cardPlato);
    }
    return (listaPlatos);
  }

  /**
    * Generates a product's row
    * props: Dictionary with the row's header and the product's info array
    */

  function SeccionPlatos (props) {
    var seccionesReturn = [];
    
    for (var seccion in props.listaSecciones) {
      
      var seccionX = 
        <Row className="restaurantContainer">
          <Container>
            <Row>
              <h5 
                className="sectionHeader"
                id={props.listaSecciones[seccion].Header}
              >{props.listaSecciones[seccion].Header}</h5>
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

  /**
    * Generates a categories navigation bar
    * props: Dictionary with the row's header and the product's info array
    * (only the headers are used)
    */

  function ListaCategorias(props) {
    var listaCategorias = []
    var columnas = 0;
    console.log({'props':props})
    for (var categoria in props.listaSecciones) {
      var hrefitem = "#" + props.listaSecciones[categoria].Header;
      var categoriaX =
      <Nav.Item as="li">
        <Nav.Link href={hrefitem} className="navbar-link">{props.listaSecciones[categoria].Header}</Nav.Link>
      </Nav.Item>
      
      listaCategorias.push(categoriaX)
    }

    return(listaCategorias);
  }

  return (
    <section className="restaurantProfile">

      <Container>
        <Row>
          <Container fluid>
            {/* Banner */}
            <Row className="restaurantBanner"
            style={{backgroundImage: 'url(' +restaurantInfo['url']+ ')'}}>
              <Col>
              <Container className="restaurantTitleContainer">
                <Row style={{height: '55%'}}>
                </Row>
                <Row className="restaurantTitle">
                  <h1 className="textFont"><strong>{restaurantInfo['name']}</strong></h1>
                </Row>
                <Row className="restaurantTitle">
                  <p>Delivery: 2$ • 15/20 min • 4.8/5(300+)</p>
                </Row>
                <Row className="restaurantTitle">
                  <p>$ • Chicken • American • <a onClick={handleShow} href="#">More info</a></p> 
                </Row>
                <Row className="restaurantTitle">
                  <p>{restaurantInfo['street']}</p>
                </Row>
              </Container>
              </Col>
              <Col>
              </Col>

            </Row>
          </Container>
        </Row>
          
        <Row style={{height: '1%'}}>

        </Row>
        

        {/**
         * This next component is the Modal, shown only when
         * More Info is clicked.
         */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{restaurantInfo['name']}</Modal.Title>
          </Modal.Header>
          <Modal.Body>This is a Modal with the restaurant's info.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/**
         * This next part generates the categories' navbar.
         */}
        <Container className="">
          <Nav as="ul" className="categories-navbar">
            <ListaCategorias listaSecciones={listaInfo}></ListaCategorias>
          </Nav>
        </Container>
        {/**
         * And this one generates the product rows.
         */}
        {console.log({'dyn':listaInfo})}
        <SeccionPlatos listaSecciones={listaInfo}>
        </SeccionPlatos>
      </Container>
    </section>
  );
}

class ProfileRestaurant extends React.Component {
    render () {
      return (
        <ProfileRestaurantF rest_id={this.props.location.rest_id}/>
      );
    };
  };
export default ProfileRestaurant;

