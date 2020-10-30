import React from 'react';
import Helloworld from './pages/Helloworld/Helloworld';
import Login from './pages/Login/Login.js';
import RegisterClient from './pages/RegisterClient/RegisterClient.js';
import RegisterRestaurant from './pages/RegisterRestaurant/RegisterRestaurant.js';
import Nav from './commons/components/Nav.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Helloworld}/>
          <Route path='/login' component={Login}/>
          <Route path='/registerclient' component={RegisterClient}/>
          <Route path='/registerrestaurant' component={RegisterRestaurant}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;