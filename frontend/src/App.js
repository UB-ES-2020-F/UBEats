import React from 'react';
import Helloworld from './pages/Helloworld/Helloworld';
import Login from './pages/LoginDummy/Login';
import Nav from './commons/components/Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Helloworld}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;