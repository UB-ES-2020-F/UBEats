import React,  { useState, useEffect }  from 'react';
import Form from 'react-bootstrap/Form';
import RegisterDataService from '../../api/UserSignService.js';


//TODO
function Register() {
/*
const initialLoginState = {
    username: '',
    email: '',
    name: '',
    age: 'DD/MM/YYYY',
    password: ''
  };

  const [loginData, setLoginData] = useState(initialLoginState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLoginData({...loginData, [name]:value})
    console.log(loginData)
  };

  
*/
  return (
    <div>
        <p>This is dummy login with not so dummy form</p>
        <Form>
          <Form.Group>
              <Form.Control id="formLocationNavBar" placeholder="Enter delivery adress" type="text" value = {username} onChange={(event) => setUsername(username.append(event.target.value))}/>
          </Form.Group>
        </Form>
        <p>{username}</p>
    </div>
  );
}

export default Register;