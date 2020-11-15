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
      <div className="loginContainer">
        <Form onSubmit={handleLogin} ref={form}>
          <label>E-mail</label>
          <Input
            type="text"
            autoFocus
            required
            name='email'
            value={email}
            onChange={onChangeEmail}
            validations={[required,validEmail]}
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
            <button className="btn btn-primary btn-block" disabled={loading}> 
              {loading ? (
                <span> Loading...</span>
                
              ) : (<span>Sign up</span>)
            }
            </button>
            <p>Do you have an account ?   
            <Link to="/registerclient"> Sign in</Link></p>
          </div>       
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </section>
  );
}

export default Login;