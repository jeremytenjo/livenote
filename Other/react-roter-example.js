import React from 'react';
import './index.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import firebase from 'firebase';
import createBrowserHistory from 'history/createBrowserHistory'


//Containers
// import Login from './containers/Login.js';
import Register from './containers/Register.js';
import Login from './containers/Login.js';
import Home from './containers/Home.js';
const customHistory = createBrowserHistory()

export default class App extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			auth: false
		}
	}

	//Methods

	render() {

		const PrivateRoute = ({
			component: Component,
			...rest
		}) => {
			//check if user is signed in
			let user = firebase.auth().currentUser;

			return (
				<Route {...rest} render={props => (user
					? (<Component {...props}/>)
					: (<Redirect to={{
						pathname: '/login',
						state: {
							from: props.location
						}
					}}/>))}/>
			)
		}
		//Style

		//Template
		return (
			<Router history={customHistory}>
				<div>
					<Switch>
						<PrivateRoute exact path="/" component={Home}/>
						<Route path="/register"  component={Register}/>
						<Route path="/login" component={Login}/>
						<Route render={() => <h3>No Match</h3>}/>
					</Switch>
				</div>
			</Router>
		);
	}

}
