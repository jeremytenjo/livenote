import React from 'react';
import styled from 'styled-components'
import Plus_img from '../../images/icons/plus.svg';
import FolderLink from '../Folder_link.js';
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
		const TitleWrappper = styled.div `
display: grid;
grid-template-columns: 1fr 15px;
		 `;
		const Title = styled.div `
 margin-top: 15px;
 `;
		const Img = styled.img `
		margin-top: 15px;
cursor: pointer;
width: 15px;
right: 15px;
  `;
		const FolderWrapper = styled.div `
		margin-top: 15px;

display: grid;
grid-template-columns: 1fr 1fr;
grid-column-gap: 5px;
grid-row-gap: 5px;
	 `;
		//Template
		return (
			<Wrapper>
				<TitleWrappper>
					<Title>Folders</Title>
					<Img src={Plus_img} alt="add icon"/>
				</TitleWrappper>
				<FolderWrapper>
					<FolderLink name="Name"/>
					<FolderLink name="Name"/>
					<FolderLink name="Name"/>
					<FolderLink name="Name"/>
				</FolderWrapper>
			</Wrapper>
		);
	}

}
