import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Login() {
  return (
    <section className="login">
      <div className="loginContainer">
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

        <div className="btnContainer">
          <button> Sign up</button>
          <p>Do you have an account ?   
          <a href="../RegisterClient.js"> Sign in</a></p>

        </div>       
      </div>
    </section>

    

  );
}

export default Login;