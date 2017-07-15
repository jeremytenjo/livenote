import React from 'react';
import styled from 'styled-components'

export default class File extends React.Component {

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
	 const Wrapper = styled.div `
	 height: 100px;
	 width: 150px;
	 background: #F5F5F5;
	 `;
		//Template
		return (
			<Wrapper>


			</Wrapper>

		);
	}

}
