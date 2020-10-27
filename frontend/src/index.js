import React from 'react';
import ReactDOM from 'react-dom';
import App from './commons/containers/App';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './utils/serviceWorker';

require('dotenv').config()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
