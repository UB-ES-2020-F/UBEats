import React,  { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";

import { login } from "../../actions/auth";



const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          //props.history.push("/profileclient");
          //window.location.reload();   
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profileclient" />;
  }
  
return (
    <section className="login">
      <link href="//db.onlinewebfonts.com/c/11469c307f0de6481e3a04cc5d54ae93?family=Uber+Move+Text" rel="stylesheet" type="text/css"/> 
      <div className="loginContainer">
      <div class="logo">
          <h1>UB<span>Eats</span></h1>
        </div>
        <p></p><p ></p><p ></p>
        <p ></p>
        <h2>¡Hola de nuevo!</h2>
        <p></p><p></p>
        <Form onSubmit={handleLogin} ref={form}>
          <label>Inicia sesión con tu dirección de email</label>
          <Input
            type="text"
            autoFocus
            required
            placeholder="E-mail"
            name='email'
            value={email}
            onChange={onChangeEmail}
            validations={[required,validEmail]}
          />
          <p className="errorMsg"></p>

          <label>Introduce tu contraseña para iniciar sesión.</label>
          <Input
            type="password"
            autoFocus
            required
            name='password'
            placeholder="Contraseña"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
          />
          <p className="errorMsg"></p>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

          <div className="btnContainer">
            <button disabled={loading}> 
              {loading ? (
                <span> Loading...</span>
                
              ) : (<span>Sign up</span>)
            }
            </button>
            <label>¿Es tu primera vez en Uber?      
            <span><Link to="/registerclient" className="link">Crea una cuenta</Link></span></label>
          </div>       
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      <footer>
        <h3>© 2020 Universitat de Barcelona.</h3>
      </footer>
    </section>
  );
}

export default Login;
