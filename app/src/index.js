import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducers from './state/reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import registerServiceWorker from './registerServiceWorker';

//Firebase Configuration
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

//State
const store = createStore(Reducers);

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: '#69f0ae',
    handleFillColor: '#69f0ae'
  }
});
ReactDOM.render(
	<Provider store={store}>
	<MuiThemeProvider muiTheme={muiTheme}>
		<App/>
	</MuiThemeProvider>
</Provider>, document.getElementById('root'));
// registerServiceWorker();
