import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './utils/history';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RegisterClient from './pages/RegisterClient/RegisterClient';
import RegisterRestaurant from './pages/RegisterRestaurant/RegisterRestaurant';
import RegisterDeliveryman from './pages/RegisterDeliveryman/RegisterDeliveryman';


import MainNav from './commons/components/MainNav.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProfileClient from './pages/ProfileClient/ProfileClient';
import HomepageRestaurant from './pages/HomepageRestaurant/HomepageRestaurant';


const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log({user: currentUser})

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

// eslint-disable-next-line
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <MainNav/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/registerclient' component={RegisterClient}/>
          <Route path='/registerrestaurant' component={RegisterRestaurant}/>
          <Route path='/registerdeliveryman' component={RegisterDeliveryman}/>
          <Route path='/profileclient' component={ProfileClient}/>
          <Route path='/homepagerestaurant' component={HomepageRestaurant}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;