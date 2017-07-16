import React from 'react';
import styled from 'styled-components'

export default class Button extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			text: this.props.text,
			color: this.props.color
		}
	}

	//Methods

	render() {
		//Properties

   //Style
 const Button = styled.button `
 background-color: ${props => props.color};
 border-radius: 40px;
border: none;
width: 80%;
max-width: 250px;
height: 50px;
text-align: center;
color: white;
margin: 0 auto;
outline: none;
margin-top: 15px;
font-weight: bold;
 `;
		//Template
		return (
			<Button color={this.state.color}>
				{this.state.text}
			</Button>
		);
	}

}
