import React, { useState } from 'react';
import '../../commons/components/App.css';

import { Button, Image, Row, Container, Col, Toast } from 'react-bootstrap';
import profilepic from "../../images/profilepicture.jpg"
import Select from 'react-select';
import makeAnimated from 'react-select/animated'

var userDefaultInfo = {
  name: "Username",
  userpic: profilepic,
  userphone: "+34 666666666",
  codigoinvitacion: "k4tb6g",
  email: "default@ubereats.com",
  appsautorizadas: [],
}

function ProfileClient({user}) {
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
  const [photo, setPhoto] = useState(user.user.url);
  const [phone, setPhone] = useState(user.user.phone);
  const [address, setAddress] = useState(user.user.street);
  const [invitationCode, setInvitationCode] = useState(userDefaultInfo.codigoinvitacion);
  const [showToast, setShowToast] = useState(false);
  const [showToastFail, setShowToastFail] = useState(false);

  /**
   * Checks if an input email is correctly formatted or not.
   */
  function validateEmail(validate_email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(validate_email);
  }
  
  /**
   * Function triggered by the "Save Changes" button.
   * Overwrites the user's info with the changed values.
   * Also handles an incorrect email input.
   */
  function SaveChanges () {
    if (validateEmail(email)) {
      userInfo.email = email;
      setShowToast(true);
    }
    else {
      setShowToastFail(true);
    }
  }

  return (
    <section className="profileClient">
      {console.log(user)}
      <Container className="profileContainer">

        {/** First row:
         * Profile picture and user's name and phone
         */}
        <Row>
          <Col>
            <Image className='profilePicture' src={profilepic} roundedCircle />
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
          <Col >
            <p><strong> Name: </strong>{name}</p>
            <p><strong> Phone: </strong>{phone}</p>
          </Col>
        </Row>
        {/** Fourth row:
         * Display of the invitation code.
         * It's not editable (and it shouldn't be)
         */}
        <Row>
          <Col>
            <p><strong>Invitation code</strong></p>
          </Col>
          <Col>
            <p>{invitationCode}</p> 
          </Col>
        </Row>
        {/** Fifth row:
         * Input field for email changes.
         * Default value: current email.
         */}
        <Row>
          <Col>
            <p><strong>Email</strong></p>
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
            <Toast.Body>Enter a valid email</Toast.Body>
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