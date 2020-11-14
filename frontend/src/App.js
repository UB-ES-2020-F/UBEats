import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearMessage } from "./actions/message";

import { history } from './utils/history';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login.js';
import RegisterClient from './pages/RegisterClient/RegisterClient.js';
import RegisterRestaurant from './pages/RegisterRestaurant/RegisterRestaurant.js';
import RegisterDeliveryman from './pages/RegisterDeliveryman/RegisterDeliveryman.js';
import ProfileClient from './pages/ProfileClient/ProfileClient.js'
import ProfileRestaurant from './pages/ProfileRestaurant/ProfileRestaurant.js'


import GeneralNav from './pages/Navbar/GeneralNav.js';

import GeneralSidebar from './pages/Sidebar/GeneralSidebar.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const App = () => {

  const { user: currentUser, isLoggedIn:  isLogged} = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  console.log({user: currentUser});
  console.log({isLoggedIn:  isLogged});


  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
    <Router history={history}>

      {sidebarOpen ? (<GeneralSidebar isOpen={sidebarOpen} onOpen={setSidebarOpen} isLogged={isLogged} key='sidebar'/>):(<div/>)}
      <GeneralNav isLogged={isLogged} openSidebar={() => setSidebarOpen(!sidebarOpen)} key='navbar'/>

      <Switch>
        <Route exact path="/" component={Home} key='home'/>
        <Route path='/login' component={Login} key='login'/>
        <Route path='/registerclient' component={RegisterClient} key='register client'/>
        <Route path='/registerrestaurant' component={RegisterRestaurant} key='register restaurant'/>
        <Route path='/registerdeliveryman' component={RegisterDeliveryman} key='register deliveryman'/>
        <Route path='/profileclient' component={ProfileClient} key='profile client'/>
        <Route path='/ProfileRestaurant' component={ProfileRestaurant} key='profile restaurant'/>
      </Switch>

    </Router>
    
  );
}

export default App;