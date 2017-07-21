import React from 'react';
import styled from 'styled-components'
import File from '../components/File_link.js';

export default class Notes extends React.Component {

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
		margin-top: 15px;

	  `;
		const Title = styled.p `
	 margin-top: 5px;
	  `;
		const Container = styled.div `
	 display: grid;
	 grid-template-columns: 1fr 1fr 1fr;
	 grid-column-gap: 10px;
	 grid-row-gap: 10px;
	 `;
		//Template
		return (
			<Wrapper>
				<Title>Notes</Title>
				<Container>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
					<File width="auto"/>
				</Container>
			</Wrapper>
		);
	}

}
