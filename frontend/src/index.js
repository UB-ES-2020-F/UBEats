import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import App from './App';
import * as serviceWorker from './utils/serviceWorker';
import Store from './store'

import './commons/components/App.css';
//import 'bootstrap/dist/css/bootstrap.min.css'; //commented, we found a bug if using bootstrap.

require('dotenv').config()

const store = Store; //Initialize the store.

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
