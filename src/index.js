import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCsryjKuiqd5domjsukaUWYKo-CGMsFW10",
  authDomain: "react-a79e1.firebaseapp.com",
  databaseURL: "https://react-a79e1.firebaseio.com",
  storageBucket: "react-a79e1.appspot.com",
};
firebase.initializeApp(config);


// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
