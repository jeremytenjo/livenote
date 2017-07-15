import React from 'react';
import styled from 'styled-components'

export default class Folder extends React.Component {

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

	  `;
 const Title = styled.div `
 margin-top: 5px;

 `;
		//Template
		return (
			<Wrapper>
				<Title>Folders</Title>

			</Wrapper>
		);
	}

}
