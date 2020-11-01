import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './utils/history';

import Helloworld from './pages/Helloworld/Helloworld';
import Login from './pages/Login/Login.js';
import RegisterClient from './pages/RegisterClient/RegisterClient.js';
import RegisterRestaurant from './pages/RegisterRestaurant/RegisterRestaurant.js';
import RegisterDeliveryman from './pages/RegisterDeliveryman/RegisterDeliveryman.js';


import Nav from './commons/components/Nav.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log({user: currentUser})

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Helloworld}/>
          <Route path='/login' component={Login}/>
          <Route path='/registerclient' component={RegisterClient}/>
          <Route path='/registerrestaurant' component={RegisterRestaurant}/>
          <Route path='/registerdeliveryman' component={RegisterDeliveryman}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;