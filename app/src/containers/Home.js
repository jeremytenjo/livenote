import React from 'react';
import styled from 'styled-components'
// import firebase from 'firebase';
import Menu_icon from '../images/icons/menu.svg';
import Search_icon from '../images/icons/search.svg';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Loadable from 'react-loadable';

const Record = Loadable({
  loader: () => import('./Record.js'),
	loading: () => null,

});
const Directory = Loadable({
  loader: () => import('./Directory.js'),
	loading: () => null,

});
export default class Home extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods
new  = () => {
	this.props.history.push(`/record`);
}
	render() {
		//Properties

		//Style
		const HomeContainer = styled.div `
		  display: grid;
			grid-template-rows: 45px 1fr;
			height: 100vh;
      padding-left: 10px;
    	padding-right: 10px;
		 `;
		const TopBar = styled.div `
  width: 100%;
	max-width: 600px;
	height: auto;
	margin: 0;
	display: grid;
	grid-template-columns: 20px 1fr 20px;
  margin-top: 10px;

 `;
		const Content = styled.div `
	overflow-x: hidden;
	overflow-y: scroll;

	padding-bottom: 90px;
  `;
		const TitlePage = styled.p `
font-size: 20px;
font-weight: bold;
outline: none;
margin: 0;
margin-left: 10px;
`;
		const Icon = styled.img `
			width: 20px;
			cursor: pointer;
      margin-top: 2px;
	`;

		//Template
		return (
			<div>
				<HomeContainer>
					<TopBar>
						<Icon src={Menu_icon} alt="Menu Icon"/>
						<TitlePage>Notes</TitlePage>
						<Icon src={Search_icon} alt="Search Icon"/>
					</TopBar>
					<BrowserRouter>
						<Content>
									<Switch>
										<Route exact path='/' component={Directory}/>
										<Route exact path='/record' component={Record}/>
									</Switch>
						</Content>
					</BrowserRouter>
				</HomeContainer>


			</div>
		);
	}

}
