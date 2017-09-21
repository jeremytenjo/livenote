import React from 'react';
import styled from 'styled-components'
import Piece from '../images/icons/NotePiece.svg';
export default class File extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			width: this.props.width,
			title: this.props.title

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
	 position: relative;
	 z-index: -1;
	 `;
		const Image = styled.img `
		width: 20px;
		position: absolute;
		right: 0;
    bottom: 0;
    transform: rotate(810deg);
	  `;
		const Title = styled.p `
	margin-left: 5px;
color: black;
		 `;
		//Template
		return (
			<Wrapper>
				<Image src={Piece} alt="piece"/>
				<Title>{this.state.title}</Title>
			</Wrapper>

		);
	}

}
