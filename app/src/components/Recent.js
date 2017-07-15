import React from 'react';
import styled from 'styled-components'
import File from '../components/File.js';
export default class Recent extends React.Component {

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
		const Title = styled.p `
margin-top: 5px;
		 `;
		const Container = styled.div `
overflow-x: scroll;
overflow-y: hidden;
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-column-gap: 10px;
white-space: nowrap;
height: 100px;
 `;

		//Template
		return (
			<div>
				<Title>Recent</Title>
				<Container>
					<File/>
					<File/>
					<File/>
					<File/>
					<File/>
					<File/>
					<File/>
				</Container>
			</div>
		);
	}

}
