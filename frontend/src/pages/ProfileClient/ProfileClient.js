import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import '../../commons/components/App.css';

import { Button, Image, Row, Container, Col, Toast } from 'react-bootstrap';
import profilepic from "../../images/profilepicture.jpg"

import { logout } from "../../actions/auth";

import userService from '../../api/user.service.js';

var userDefaultInfo = {
  name: "Username",
  userpic: profilepic,
  userphone: "+34 666666666",
  codigoinvitacion: "k4tb6g",
  email: "default@ubereats.com",
  appsautorizadas: [],
}

function ProfileClient() {
  const {user: currentUser, isLoggedIn:  isLogged} = useSelector((state) => state.auth); //We get the user value and isLogged from store state.

  const dispatch = useDispatch();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [databaseEmail, setDatabaseEmail] = useState(currentUser.email);
  const [photo, setPhoto] = useState(currentUser.url);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.street);
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

  {/**
    Sends the user info to the database. Called by SaveChanges().
   */}

  const sendInfoToDataBase = async (databaseEmail, address, tipo, email) => {
    const updatedUserInfo =  await userService.setUserInfo(
      databaseEmail, 
      address,
      tipo,
      email
      );
  };

  /**
   * Function triggered by the "Save Changes" button.
   * Overwrites the user's info with the changed values.
   * Also handles an incorrect email input.
   */
  function SaveChanges () {
    if (validateEmail(email) && (address.length > 0)) {
      setShowToast(true);
      console.log(address);
      console.log(currentUser.tipo);
      sendInfoToDataBase(
        databaseEmail,
        address,
        currentUser.tipo,
        email
      );
    }
    else {
      setShowToastFail(true);
    }
  }

  //This function dispatches redux action logout, to log out the user.
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <section className="profileClient">
      <Container className="profileContainer">

        {/** 
         * Profile picture and user's name and phone
         */}
        <Row>
          <Col>
            <Image 
              className="profilePicture" 
              src={photo} 
              roundedCircle 
              height='100px'
              width='100px'
            />
          </Col>
          <Col >
            <p><strong> Name: </strong>{name}</p>
            <p><strong> Phone: </strong>{phone}</p>
          </Col>
        </Row>
        {/** 
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

        <Row>
          <Col>
            <p><strong>Address</strong></p>
          </Col>
          <Col>
          <input 
              defaultValue={address}
              onChange={event => setAddress(event.target.value)}
              >
            </input>
          </Col>
        </Row>

        {/** 
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
              onChange={event => setEmail(event.target.value)}
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
            <Toast.Body>Please enter a valid address and email</Toast.Body>
          </Toast>
        </Row>
        
        <Row>
          <Button 
            variant="outline-danger" 
            className="profileButton"
            onClick={logOut}>
              Log out
          </Button>
        </Row>
      </Container>
    </section>
  );
}
export default ProfileClient;