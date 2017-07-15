import React from 'react';
import styled from 'styled-components'
// import firebase from 'firebase';
import Menu_icon from '../images/icons/menu.svg';
import Search_icon from '../images/icons/search.svg';
import FloatingButton from '../components/FloatButton.js';
import Recent from '../components/Recent.js';
import Folders from '../components/Folders.js';
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
		const HomeContainer = styled.div `
		  display: grid;
			grid-template-rows: 56px 1fr;
			height: 100vh;
		 `;
		const TopBar = styled.div `
  width: 100%;
	max-width: 600px;
	height: 56px;
	margin: 0;
	display: grid;
	grid-template-columns: 50px 1fr 50px;
 `;
		const Content = styled.div `
	overflow-x: hidden;
	overflow-y: scroll;
	padding-left: 15px;
	padding-right: 15px;
  `;
		const TitlePage = styled.p `
font-size: 22px;
font-weight: bold;
outline: none;
margin-top: 13px;
`;
		const Icon = styled.img `
			width: 20px;
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
				<HomeContainer>
					<TopBar>
						<Icon src={Menu_icon} alt="Menu Icon"/>
						<TitlePage>Notes</TitlePage>
						<Icon src={Search_icon} alt="Search Icon"/>
					</TopBar>
					<Content>
						<Recent/>
						<Folders/>
					</Content>
				</HomeContainer>
				<FloatingButtonCon>
					<FloatingButton/>
				</FloatingButtonCon>

			</div>
		);
	}

}
