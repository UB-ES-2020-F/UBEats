import React,  { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import LoginDataService from '../../api/UserLoginService.js';



function Login() {
  const initialLoginState = {
    username: '',
    email: '',
    name: '',
    age: 'DD/MM/YYYY',
    password: ''
  };

  const [loginData, setLoginData] = useState(initialLoginState);
  // eslint-disable-next-line
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(event.target);
    setLoginData({...loginData, [name]:value});
    console.log(loginData);
  };

// eslint-disable-next-line
  const saveLogin = () => {
    var data = {
      username: loginData.username,
      email: loginData.email,
      name: loginData.name,
      age: loginData.age,
      password: loginData.password
    };

    LoginDataService.create(data)
      .then(response => {
        setLoginData({
          username: response.data.username,
          email: response.data.email,
          name: response.data.name,
          age: response.data.age,
          password: response.data.password
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
// eslint-disable-next-line
  const newLogin = () => {
    setLoginData(initialLoginState);
    setSubmitted(false);
  };

  return (
    <div>
        <p>This is dummy login with not so dummy form</p>
        <Form>
          <Form.Group>
              <Form.Control id="formLocationNavBar" placeholder="Enter delivery adress" type="text" name = "username" value={loginData.username} onChange={handleInputChange} />
          </Form.Group>
        </Form>
        <p>{loginData.username}</p>
    </div>
  );
}

export default Login;