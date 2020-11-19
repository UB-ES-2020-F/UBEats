import React,  { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";

import { register } from "../../actions/auth";



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

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const user_type = 'restaurant' // customer, restaurant, deliveryman
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

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
    setLoading(true);

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(name, email, password, user_type))
        .then(() => {
          //props.history.push("/profileclient");
          //window.location.reload();
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
    console.log('yes');
    return <Redirect to="/profileclient" />;
  }

  return (
    <section className="login">
      <link href="//db.onlinewebfonts.com/c/11469c307f0de6481e3a04cc5d54ae93?family=Uber+Move+Text" rel="stylesheet" type="text/css"/> 
      <div className="loginContainer">
      <div class="logo">
          <h1>UB<span>Eats</span></h1>
        </div>
        <p></p><p ></p>
        <p ></p>
        <h2>¡Añada su restaurante!</h2>
        <p></p><p></p>
        <Form onSubmit={handleRegister} ref={form}>
          <label>Introduzca el nombre de su restaurante</label>
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

          <label>Introduzca su E-mail</label>
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

          <label>Escriba su contraseña</label>
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

          <label>Escriba la calle</label>
          <Input
          type="text"
          autoFocus
          required
          placeholder="Calle"
          //name='password'
          //value={password}
          //onChange={onChangePassword}
          //validations={[required, vpassword]}
          />
          <p className="errorMsg"></p>

          <label>Introduzca su telefono</label>
          <Input
          type="text"
          autoFocus
          required
          placeholder="Telefono"
          //name='password'
          //value={password}
          //onChange={onChangePassword}
          //validations={[required, vpassword]}
          />
          <p className="errorMsg"></p>

          <label>Introduzca su IBAN</label>
          <Input
          type="text"
          autoFocus
          required
          placeholder="IBAN"
          //name='password'
          //value={password}
          //onChange={onChangePassword}
          //validations={[required, vpassword]}
          />
          <p className="errorMsg"></p>

          <div className="btnContainer">
          <button> {loading ? ('Loading') : ('Resgistrar')} </button>
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