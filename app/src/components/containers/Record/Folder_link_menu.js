import React from 'react';
import styled from 'styled-components'
import Folder_icon from '../../../images/icons/Folder.svg';
// import Arrow_icon from '../images/icons/down-arrow.svg';
export default class FolderMenu extends React.Component {

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
${'' /* grid-template-columns: 20px 1fr 20px; */}
grid-template-columns: 20px 1fr;
border-radius: 2px;
padding: 10px;
cursor: pointer;

&:active {
	background-color: #42EA9C;
}
&:focus {
	background-color: #42EA9C;
}

 `;
		const Img = styled.img `
width: 20px;
  `;
		const Title = styled.p `
color: #212121;
margin: 0;
margin-left: 5px;
	 `;
		//Template
		return (
			<Wrapper>
				<Img src={Folder_icon} alt="Folder Icon"/>
				<Title>{this.state.name}</Title>
				{/* <Img src={Arrow_icon} alt="Arrow Icon"/> */}
			</Wrapper>
		);
	}

}
