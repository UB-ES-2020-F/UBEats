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
  const [showToastFail, setShowToastFail] = useState(false);

  {/**
   * Checks if an input email is correctly formatted or not.
   */}
   
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  {/**
   * Function triggered by the "Save Changes" button.
   * Overwrites the user's info with the changed values.
   * Also handles an incorrect email input.
   */}

  function SaveChanges () {
    userInfo.idioma = idioma;
    userInfo.ubicacion = ubicacion;
    
    if (validateEmail(email)) {
      userInfo.email = email;
      setShowToastFail(true);
    }

    else {
      setShowToastFail(true);
    }
    
  }

  
  
  return (
    <section className="profileClient">

      <Container className="profileContainer">

        {/** First row:
         * Profile picture and user's name and phone
         */}

        <Row>
          <Col>
            <Image className="profilePicture" src={profilepic} roundedCircle />
          </Col>

          <Col >
            <p><strong>{userInfo.username}</strong></p>
            <p>{userInfo.userphone}</p>
          </Col>
          
        </Row>

        {/** Second row:
         * Location selector, updates the component's state
         */}

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

        {/** Third row:
         * Language selector, updates the component's state
         */}

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

        {/** Fourth row:
         * Display of the invitation code.
         * It's not editable (and it shouldn't be)
         */}

        <Row>
          <Col>
            <p>Invitation code</p>
          </Col>

          <Col>
            <p>{userInfo.codigoinvitacion}</p> 
          </Col>
        </Row>

        {/** Fifth row:
         * Input field for email changes.
         * Default value: current email.
         */}

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

        {/** Save changes button
         * Saves the current state into the user's data.
         */}

        <Row>
          <Button 
            className="profileButton" 
            variant="primary"
            onClick={SaveChanges}

            >Save changes
          </Button>
        </Row>

        {/** Toast triggered by the "Save changes" button.
         * For user feedback purposes, correct input case.
         */}

        <Row>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Body>Your changes have been saved</Toast.Body>
          </Toast>
        </Row>

        {/** Toast triggered by the "Save changes" button.
         * For user feedback purposes, incorrect input case.
         */}

        <Row>
          <Toast onClose={() => setShowToastFail(false)} show={showToastFail} delay={3000} autohide>
            <Toast.Body>Enter a valid email, you goddamn cunt!</Toast.Body>
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