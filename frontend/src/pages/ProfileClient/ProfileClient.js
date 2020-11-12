import React from 'react';
import '../../commons/components/App.css';
import { Button, Image, Row, Container, Col } from 'react-bootstrap';
import profilepic from "../../images/profilepicture.jpg"

var userInfo = {
  username: "Pepito Gonzalez",
  userpic: profilepic,
  userphone: "+34 667534645",
  ubicacion: null,
  idioma: null,
  codigoinvitacion: "k4tb6g",
  email: "pepito@pepito.com",
  appsautorizadas: [],
}

function ProfileClient() {
  return (
    <section className="profileClient">

      <Container className="profileContainer">

        <Row>
          <Col >
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
          {/** Desplegable */}
          </Col>
        </Row>

       <Row>
          <Col>
            <p>Language</p>
          </Col>

          <Col>
          {/** Desplegable */}
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
            <p>{userInfo.email}</p>
          </Col>
        </Row>

        <Row>
          <Button variant="primary">Save changes</Button>
        </Row>

        <Row>
          <p>Authorised applications</p>
        </Row>

        <Row>
          <p>{userInfo.appsautorizadas}</p>
        </Row>

      {/** Boton cerrar sesion */}

      </Container>


      
    </section>

  );
}

export default ProfileClient;