import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row } from 'react-bootstrap';

import { clearMessage } from "./actions/message";

import { history } from './utils/history';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login.js';
import RegisterClient from './pages/RegisterClient/RegisterClient.js';
import RegisterRestaurant from './pages/RegisterRestaurant/RegisterRestaurant.js';
import RegisterDeliveryman from './pages/RegisterDeliveryman/RegisterDeliveryman.js';
import ProfileClient from './pages/ProfileClient/ProfileClient.js'
import ProfileRestaurant from './pages/ProfileRestaurant/ProfileRestaurantNEW.js'
import ViewAll from './pages/ViewAll/ViewAll.js'
import Error from './pages/Error/Error.js'

import Footer from './commons/components/Footer.js';

import NavCustom from './pages/Navbar/NavCustom.js';

import ShoppingCartPage from './pages/ShoppingCart/ShoppingCartPage.js';

import GeneralSidebar from './pages/Sidebar/GeneralSidebar.js';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import defaultImage from './images/banner.jpg';
import Wiki from "./pages/Wiki/Wiki";

//This is the main component of the app. It acts as the router.
//It gets user and isLogged state here and pass it down to its children components.
//It manages intercomponent communication between navbar and sidebar using useState sidebarOpen and setSidebarOpen.
const App = () => {
  const {user: currentUser, isLoggedIn:  isLogged} = useSelector((state) => state.auth); //We get the user value and isLogged from store state.
  const [sidebarOpen, setSidebarOpen] = useState(false); //We set a state hook to sidebarOpen to manage the state of the sidebar.
  const dispatch = useDispatch();

  const [restSelected, setRestSelected] = useState('rrr@gmail.com');
  const [restPhoto, setRestPhoto] = useState(defaultImage);

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  
  return (
    <Router history={history}>
      <div>

        {sidebarOpen ? (<GeneralSidebar isOpen={sidebarOpen} onOpen={setSidebarOpen} key='sidebar'/>):(<div/>)}
        <NavCustom  isLogged={isLogged} openSidebar={() => setSidebarOpen(!sidebarOpen)}/>
        <div style={{heigth:'100vh'}}>
          <Switch>
            <Route exact path="/" render={(props) => (<Home {...props} isLogged={isLogged} user={currentUser}/>)} key='home'/>        
            <Route path='/login' component={Login} key='login'/>
            <Route path='/registerclient' component={RegisterClient} key='register client'/>
            <Route path='/registerrestaurant' component={RegisterRestaurant} key='register restaurant'/>
            <Route path='/registerdeliveryman' component={RegisterDeliveryman} key='register deliveryman'/>
            <Route path='/viewall/:category' component={ViewAll} key='viewall'/>
            <Route path='/wiki' component={Wiki} key='wiki'/>
            <Route path='/shopping' component={ShoppingCartPage} key='shopping'/>      
            <Route path='/error' component={Error} key='error'/>
            <Route path='/profilerestaurant' render={(props) => (<ProfileRestaurant {...props} rest_id={restSelected}/>)} key='profile restaurant'/>
            {isLogged && <Route path='/profileclient' render={(props) => (<ProfileClient {...props} user={currentUser}/>)} key='profile client'/>}
            <Redirect from='*' to='/error'/>
          </Switch>
        </div>

        <Footer/>
      </div>

    </Router>
  );
}

export default App;
