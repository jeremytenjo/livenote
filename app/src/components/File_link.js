import React from 'react';
import styled from 'styled-components'

export default class File extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			width: this.props.width

		}
	}

	//Methods

	render() {
		//Properties

   //Style
	 const Wrapper = styled.div `
	 height: 100px;
	 width: ${props => this.state.width};
	 background: #F5F5F5;
	 border-radius: 2px 0 2px 2px;
	 cursor: pointer;
	 `;
		//Template
		return (
			<Wrapper>


			</Wrapper>

		);
	}

}
