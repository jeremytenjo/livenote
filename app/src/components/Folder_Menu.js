import React from 'react';
import styled from 'styled-components'
import Button from '../components/Button.js';
export default class FolderMenu extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			showMenu: this.props.showMenu
		}
	}

	//Methods
	//update compnent state from parent
	componentWillUpdate(nextProps, nextState) {
		nextState.showMenu = nextProps.showMenu;
	}

	render() {
		//Properties

		//Style
		const Wrapper = styled.div `
	background: white;
	position: fixed;
	display: ${props => this.state.showMenu === false
			? 'none'
			: 'block'};
	bottom: 0;
	${ ''/* top: 100%; */}
	top: 0;
	right: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows:  1fr 80px;
 `;
		const Content = styled.div `
${'' /* background: green; */}
overflow-y: scroll;
  `;
		const ButtonContainer = styled.div `
	 ${'' /* background: blue; */}
display: grid;
grid-template-columns:  1fr 1fr;
	 `;
		//Template
		return (
			<Wrapper >
				<Content></Content>
				<ButtonContainer>
					<Button text="Cancel" color=" #95989A"/>
					<Button text="Select" color=" #42EA9C"/>
				</ButtonContainer>
			</Wrapper>
		);
	}

}
