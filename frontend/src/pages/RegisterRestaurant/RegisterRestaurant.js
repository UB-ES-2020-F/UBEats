import React,  { useState, useEffect } from 'react';
import '../../commons/components/App.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterDataService from '../../api/RegisterService.js';


function RegisterRestaurant() {
  const initialRegisterState = {
    name: '',
    email: '',
    password: '',
    address: '',
    tlf: ''
  };

  const [registerData, setRegisterData] = useState(initialRegisterState);
  // eslint-disable-next-line
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRegisterData({...registerData, [name]:value});
    console.log(registerData);
  };

// eslint-disable-next-line
  const sendRegister = () => {
    var data = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      dni: registerData.dni,
      address: registerData.address,
      tlf: registerData.tlf
    };

    RegisterDataService.create(data)
      .then(response => {
        setRegisterData({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
          address: response.data.address,
          tlf: response.data.tlf
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <section className="login">
      { submitted ? (
        <div className="loginContainer">
          <p>Register successful! Welcome <strong>{registerData.name}</strong></p>
          <Link to='/'> Go to main page</Link>
        </div>
      ):(
        <div className="loginContainer">
          <label>Restaurant name</label>
          <input
          type="text"
          autoFocus
          required
          name='name'
          onChange={handleInputChange}
          ></input>
          <p className="errorMsg"></p>

          <label>E-mail</label>
          <input
          type="text"
          autoFocus
          required
          name='email'
          onChange={handleInputChange}
          ></input>
          <p className="errorMsg"></p>

          <label>Password</label>
          <input
          type="text"
          autoFocus
          required
          name='password'
          onChange={handleInputChange}
          ></input>
          <p className="errorMsg"></p>

          <label>Address</label>
          <input
          type="text"
          autoFocus
          required
          name='address'
          onChange={handleInputChange}
          ></input>
          <p className="errorMsg"></p>

          <label>Tlf number</label>
          <input
          type="text"
          autoFocus
          required
          name='tlf'
          onChange={handleInputChange}
          ></input>
          <p className="errorMsg"></p>

          <div className="btnContainer">
            <button> Sign up</button>
            <p>Do you have an account ?   
            <Link to='/login'> Sign in</Link></p>
            <p>Do you want to register as a client ?  
            <Link to="/registerclient"> Sign up</Link></p>
          </div>       
        </div>
      )}
    </section>
  );
}

export default RegisterRestaurant;