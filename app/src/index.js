import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
var config = {
	apiKey: "AIzaSyAyJgNWwD3cJZGNTwPuZXA4cDc2iHqVk3s",
	authDomain: "live-note-ce62c.firebaseapp.com",
	databaseURL: "https://live-note-ce62c.firebaseio.com",
	projectId: "live-note-ce62c",
	storageBucket: "live-note-ce62c.appspot.com",
	messagingSenderId: "1009089907270"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
