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
import ViewAll from './pages/ViewAll/ViewAll.js'

import Footer from './commons/components/Footer.js';

import NavCustom from './pages/Navbar/NavCustom.js';



import GeneralSidebar from './pages/Sidebar/GeneralSidebar.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import defaultImage from './images/banner.jpg';

//This is the main component of the app. It acts as the router.
//It gets user and isLogged state here and pass it down to its children components.
//It manages intercomponent communication between navbar and sidebar using useState sidebarOpen and setSidebarOpen.
const App = () => {

  const { user: currentUser, isLoggedIn:  isLogged} = useSelector((state) => state.auth); //We get the user value and isLogged from store state.
  const [sidebarOpen, setSidebarOpen] = useState(false); //We set a state hook to sidebarOpen to manage the state of the sidebar.
  const dispatch = useDispatch();

  const [restSelected, setRestSelected] = useState('r2@gmail.com');
  const [restPhoto, setRestPhoto] = useState(defaultImage);

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  
  return (
    <Router history={history}>
      {console.log(currentUser)}
      {sidebarOpen ? (<GeneralSidebar isOpen={sidebarOpen} onOpen={setSidebarOpen} isLogged={isLogged} user={currentUser} key='sidebar'/>):(<div/>)}
      <NavCustom  isLogged={isLogged} openSidebar={() => setSidebarOpen(!sidebarOpen)}/>

      <Switch>
        <Route exact path="/" render={(props) => (<Home {...props} setRestaurantId={setRestSelected} setPicture={setRestPhoto} isLogged={isLogged} user={currentUser}/>)} key='home'/>
        <Route path='/login' component={Login} key='login'/>
        <Route path='/registerclient' component={RegisterClient} key='register client'/>
        <Route path='/registerrestaurant' component={RegisterRestaurant} key='register restaurant'/>
        <Route path='/registerdeliveryman' component={RegisterDeliveryman} key='register deliveryman'/>
        <Route path='/profileclient' component={ProfileClient} key='profile client'/>
        <Route path='/viewall' component={ViewAll} key='viewall'/>
        <Route path='/profilerestaurant' render={(props) => (<ProfileRestaurant {...props} rest_id={restSelected} restaurantPhoto={restPhoto}/>)} key='profile restaurant'/>
      </Switch>
      
      <Footer/>
    </Router>
  );
}

export default App;