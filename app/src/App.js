import React, {Component} from 'react'
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom'
import './index.css';
import Login from './containers/Login.js';
import Register from './containers/Register.js';
import Home from './containers/Home.js';
import firebase from 'firebase';


function PrivateRoute({
	component: Component,
	authed,
	...rest
}) {
	return (
		<Route {...rest} render={(props) => authed === true
			? <Component {...props}/>
			: <Redirect to={{
				pathname: '/login',
				state: {
					from: props.location
				}
			}}/>
		}/>
	)
}

function PublicRoute({
	component: Component,
	authed,
	...rest
}) {
	return (
		<Route {...rest} render={(props) => authed === false
			? <Component {...props}/>
			: <Redirect to='/'/>}/>
	)
}

export default class App extends Component {
	state = {
		authed: false,
		loading: true
	}
	componentDidMount() {
		this.removeListener = firebase.auth().onAuthStateChanged((user) => {
			// console.log(user);
			if (user) {
				this.setState({authed: true, loading: false})
			} else {
				this.setState({authed: false, loading: false})
			}
		})
	}
	componentWillUnmount() {
		this.removeListener()
	}
	render() {
		return this.state.loading === true
			? <h1>Loading</h1>
			: (
				<BrowserRouter>
					<div>
								<Switch>
									<PrivateRoute authed={this.state.authed} exact path='/' component={Home}/>
									<PrivateRoute authed={this.state.authed} exact path='/files' component={Home}/>
									<PublicRoute authed={this.state.authed} path='/login' component={Login}/>
									<PublicRoute authed={this.state.authed} path='/register' component={Register}/>
									<Route render={() => <h3>No Match 404</h3>}/>
								</Switch>
					</div>
				</BrowserRouter>
			);
	}
}
