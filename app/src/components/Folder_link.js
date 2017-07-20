import React from 'react';
import styled from 'styled-components'
import Folder_img from '../images/icons/Folder.svg';
import Options_img from '../images/icons/Options.svg';

export default class Folder_Link extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			name: props.name
		}
	}

	//Methods

	render() {
		//Properties

		//Style
		const Wrapper = styled.div `
display: grid;
grid-template-columns: 40px 2fr .1fr;
background: white;
height: 40px;
border-radius: 2px;
cursor: pointer;
 `;
		const Img = styled.img `
   width: 18px;
	 padding: 10px;
  `;
		const Title = styled.p `
		margin: 0;
		margin-top: 11px;

color: #212121;
	 `;
		//Template
		return (
			<Wrapper>
				<Img src={Folder_img} alt="foler icon"/>
				<Title>{this.state.name}</Title>
				<Img src={Options_img} alt="options icon"/>

			</Wrapper>
		);
	}

}
