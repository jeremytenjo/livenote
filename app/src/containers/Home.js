import React from 'react';
import styled from 'styled-components'
// import firebase from 'firebase';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Files from './Files.js';
import Menu_icon from '../images/icons/menu.svg';
import Search_icon from '../images/icons/search.svg';
import FloatingButton from '../components/FloatButton.js';
export default class Home extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods

	render() {
		//Properties

		//Style
		const TopBar = styled.div `
  width: 100%;
	max-width: 600px;
	height: 56px;
	margin: 0;
	display: grid;
	grid-template-columns: 50px 1fr 50px;
 `;
		const TitlePage = styled.p `
font-size: 22px;
font-weight: bold;
outline: none;
margin-top: 15px;
`;
		const Icon = styled.img `
			width: 25px;
			margin-left: 15px;
			margin-top: 15px;
			cursor: pointer;
	`;
		const FloatingButtonCon = styled.span `
position: absolute;
bottom: 20px;
right: 0;
 `;
		//Template
		return (
			<div>
				<TopBar>
					<Icon src={Menu_icon} alt="Menu Icon"/>
					<TitlePage>Notes</TitlePage>
					<Icon src={Search_icon} alt="Search Icon"/>
				</TopBar>
				<FloatingButtonCon>
					<FloatingButton/>
				</FloatingButtonCon>
				<BrowserRouter>
					<div>
						<Switch>
							<Route path='/files' component={Files}/>
						</Switch>
					</div>
				</BrowserRouter>
			</div>
		);
	}

}
