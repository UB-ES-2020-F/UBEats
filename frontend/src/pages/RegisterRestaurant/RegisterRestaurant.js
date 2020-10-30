import React from 'react';
import '../../commons/components/App.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function RegisterRestaurant() {
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
          <Link to='/login'>Sign in</Link></p>
          <p>Do you want to register as a client ?  
          <Link to="/registerclient">Sign up</Link></p>
        </div>       
      </div>
    </section>
  );
}

export default RegisterRestaurant;