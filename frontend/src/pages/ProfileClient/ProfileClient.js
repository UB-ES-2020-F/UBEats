import React, { useState } from 'react';
import '../../commons/components/App.css';
import { Button, Image, Row, Container, Col, Toast } from 'react-bootstrap';
import profilepic from "../../images/profilepicture.jpg"
import Select from 'react-select';
import makeAnimated from 'react-select/animated'

var userInfo = {
  username: "Pepito Gonzalez",
  userpic: profilepic,
  userphone: "+34 667534645",
  ubicacion: 'España',
  idioma: 'English',
  codigoinvitacion: "k4tb6g",
  email: "pepito@pepito.com",
  appsautorizadas: [],
}

const listaIdiomas = [
  { value: 'english', label: 'English'},
  { value: 'spanish', label: 'Spanish'},
  { value: 'italian', label: 'Italian'},
  { value: 'russian', label: 'Russian'},
]

const listaUbicaciones = [
  { value: 'españa', label: 'España'},
  { value: 'uk', label: 'UK'},
  { value: 'italia', label: 'Italia'},
  { value: 'russia', label: 'Russia'},
]


function ProfileClient() {

  const [ubicacion, setUbicacion] = useState(userInfo.ubicacion);
  const [idioma, setIdioma] = useState(userInfo.idioma);
  const [email, setEmail] = useState(userInfo.email);
  const [showToast, setShowToast] = useState(false);

  function SaveChanges () {
    userInfo.idioma = idioma;
    userInfo.ubicacion = ubicacion;
    userInfo.email = email;
    setShowToast(true);
  }
  
  return (
    <section className="profileClient">

      <Container className="profileContainer">

        <Row>
          <Col>
            <Image className="profilePicture" src={profilepic} roundedCircle />
          </Col>

          <Col >
            <p><strong>{userInfo.username}</strong></p>
            <p>{userInfo.userphone}</p>
          </Col>
          
        </Row>

        <Row>
          <Col>
            <p>Location</p>
          </Col>

          <Col>
            <Select
              options={listaUbicaciones}
              defaultInputValue={userInfo.ubicacion}
              isSearchable
              components={makeAnimated()}
              onChange={setUbicacion}
            />
          </Col>
        </Row>

       <Row>
          <Col>
            <p>Language</p>
          </Col>

          <Col>
            <Select
              options={listaIdiomas}
              defaultInputValue={userInfo.idioma}
              isSearchable
              components={makeAnimated()}
              onChange={setIdioma}
            />
            
          </Col>
        </Row>

        <Row>
          <Col>
            <p>Invitation code</p>
          </Col>

          <Col>
            <p>{userInfo.codigoinvitacion}</p> 
          </Col>
        </Row>

        <Row>
          <Col>
            <p>Email</p>
          </Col>

          <Col>
            <input 
              type="email" 
              defaultValue={email}
              onChange={setEmail}
              >
              
            </input>
            
          </Col>
        </Row>

        <Row>
          <Button 
            className="profileButton" 
            variant="primary"
            onClick={SaveChanges}

            >Save changes
          </Button>
        </Row>

        <Row>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
              <p><strong>UB Eats</strong></p>
            </Toast.Header>
            <Toast.Body>Your changes have been saved</Toast.Body>
          </Toast>
        </Row>

        <Row>
          <p><strong>Authorised applications</strong></p>
        </Row>

        <Row>
          <p style={{fontSize: 13}}>There are no authorised apps.</p>
        </Row>

        <Row>
          <Button 
            variant="outline-danger" 
            className="profileButton">
              Log out
          </Button>
        </Row>


      </Container>

    </section>

  );
}

export default ProfileClient;