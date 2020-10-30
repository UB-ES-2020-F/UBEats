import React from 'react';
import '../../commons/components/App.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function ProfileClient() {
  return (
    <section className="login">
      <div className="loginContainer">
        
        <label>Name</label>
        <p>User's name</p>

       

        <label>E-mail</label>
        <p>User's email</p>
        

        <label>DNI</label>
        <p>User's DNI</p>
        

        <label>Address</label>
        <p>User's address</p>
        

        <label>Tlf number</label>
        <p>User's tlf number</p>

        <div className="btnContainer">
          <button> Edit profile</button>
        </div>
         
      </div>
    </section>

  );
}

export default ProfileClient;