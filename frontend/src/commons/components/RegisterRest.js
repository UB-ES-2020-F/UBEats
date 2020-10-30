import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function RegisterRest() {
  return (
    <section className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input
        type="text"
        autoFocus
        required
        ></input>
        <p className="errorMsg"></p>

        <label>E-mail</label>
        <input
        type="text"
        autoFocus
        required
        ></input>
        <p className="errorMsg"></p>

        <label>Password</label>
        <input
        type="text"
        autoFocus
        required
        ></input>
        <p className="errorMsg"></p>

        <label>Address</label>
        <input
        type="text"
        autoFocus
        required
        ></input>
        <p className="errorMsg"></p>

        <label>Tlf number</label>
        <input
        type="text"
        autoFocus
        required
        ></input>
        <p className="errorMsg"></p>

        <div className="btnContainer">
          <button> Sign up</button>
          <p>Do you have an account ?   
          <a href="../Login.js">Sign in</a></p>
          <p>Do you want to register as a client ?  
          <a href="../RegisterClient.js">Sign up</a></p>
        </div>       
      </div>
    </section>

    

  );
}

export default RegisterRest;