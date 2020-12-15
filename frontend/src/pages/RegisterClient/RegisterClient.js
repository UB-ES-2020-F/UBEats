import React,  { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";

import { register } from "../../actions/auth";
import '../../commons/components/App.css';



const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const type = 'customer' // customer, restaurant, deliveryman
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const enabled =
          email.length > 0 &&
          password.length > 0 && name.length > 0;

  const onChangeName = (e) => {
    const name = e.target.value;
    setname(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(name, email, password, type))
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(() => {
          setSuccessful(false);
          setLoading(false);
        });
    }else{
      setLoading(false);
    };
  };

  if (successful) {
    return <Redirect to="/profileclient" />;
  }


  return (
    <section className="login">
      <link href="//db.onlinewebfonts.com/c/11469c307f0de6481e3a04cc5d54ae93?family=Uber+Move+Text" rel="stylesheet" type="text/css"/> 
      <div className="loginContainer">
      <div className="logo">
          <h1>UB<span>Eats</span></h1>
        </div>
        <p></p><p ></p>
        <p ></p>
        <h2>¡Bienvenido!</h2>
        <p></p><p></p>
        <Form onSubmit={handleRegister} ref={form}>
          <label>Introduce tu nombre</label>
          <Input
          type="text"
          autoFocus
          required
          placeholder="Nombre"
          name='name'
          value={name}
          onChange={onChangeName}
          validations={[required]}
          />
          <p className="errorMsg"></p>

          <label>Introduce tu E-mail</label>
          <Input
          type="text"
          autoFocus
          required
          placeholder="E-mail"
          name='email'
          value={email}
          onChange={onChangeEmail}
          validations={[required, validEmail]}
          />
          <p className="errorMsg"></p>

          <label>Escribe tu contraseña</label>
          <Input
          type="text"
          autoFocus
          required
          placeholder="Contraseña"
          type="password"
          name='password'
          value={password}
          onChange={onChangePassword}
          validations={[required, vpassword]}
          />
          <p className="errorMsg"></p>

          <div className="btnContainer">
            <button disabled={!enabled}> Registrar </button>
            <label>¿Ya tiene una cuenta?    
              <Link to="./login" className="link"> Inicia sesion</Link>
            </label>
            
          </div>   
          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>    
      </div>
    </section>

    

  );
}

export default Register;