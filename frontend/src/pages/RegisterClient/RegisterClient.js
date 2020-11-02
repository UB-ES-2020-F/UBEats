import React,  { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

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
  const user_type = 'customer' // customer, restaurant, deliveryman
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

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(name, email, password, user_type))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <Form onSubmit={handleRegister} ref={form}>
          <label>Client Name</label>
          <Input
          type="text"
          autoFocus
          required
          name='name'
          value={name}
          onChange={onChangeName}
          validations={[required]}
          />
          <p className="errorMsg"></p>

          <label>E-mail</label>
          <Input
          type="text"
          autoFocus
          required
          name='email'
          value={email}
          onChange={onChangeEmail}
          validations={[required, validEmail]}
          />
          <p className="errorMsg"></p>

          <label>Password</label>
          <Input
          type="text"
          autoFocus
          required
          name='password'
          value={password}
          onChange={onChangePassword}
          validations={[required, vpassword]}
          />
          <p className="errorMsg"></p>

          <div className="btnContainer">
            <button className="btn btn-primary btn-block"> Sign up </button>
            <p>Do you have an account?
              <Link to="./login"> Sign in</Link>
            </p>
            <p>Do you want to register as a restaurant?
              <Link to="/registerrestaurant"> Sign up</Link>
            </p>
            <p>Do you want to register as a deliveryman?
              <Link to="/registerdeliveryman"> Sign up</Link>
            </p>
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