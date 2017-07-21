import React, {Component} from 'react'
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom'
import './index.css';
import firebase from 'firebase';
import Loadable from 'react-loadable';
import styled from 'styled-components'

const Login = Loadable({
  loader: () => import('./containers/Login.js'),
	loading: () => null
});
const Register = Loadable({
  loader: () => import('./containers/Register.js'),
	loading: () => null
});
const Home = Loadable({
  loader: () => import('./containers/Home.js'),
	loading: () => null
});

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
    //Style
     const MasterWrapper = styled.div `
     position: absolute;
     height: 100%;
     max-width: 600px;
     left: 0;
     right: 0;
     margin: auto;
     overflow-x: hidden;
     `;
		return this.state.loading === true
			? <h1>Loading</h1>
			: (
				<BrowserRouter>
					<MasterWrapper>
								<Switch>
									<PrivateRoute authed={this.state.authed} exact path='/' component={Home}/>
									<PrivateRoute authed={this.state.authed} exact path='/record' component={Home}/>
									<PrivateRoute authed={this.state.authed} exact path='/recording' component={Home}/>
									<PrivateRoute authed={this.state.authed} exact path='/files' component={Home}/>
									<PublicRoute authed={this.state.authed} path='/login' component={Login}/>
									<PublicRoute authed={this.state.authed} path='/register' component={Register}/>
									<Route render={() => <h3>No Match 404</h3>}/>
								</Switch>
					</MasterWrapper>
				</BrowserRouter>
			);
	}
}
