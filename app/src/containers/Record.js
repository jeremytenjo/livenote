import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

class Record extends React.Component {

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
		const InitWrapper = styled.div `
		border: 3px solid black;
			position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
margin:auto;
width: 200px;
height: 200px;
 `;
		const Input = styled.input `
	margin: 0 auto;
	text-align: center;
	display: block;
	margin-bottom: 10px;
	background: transparent;
	color: white;
	outline: none;
	font-size: 20px;
	textDecoration: none;
border-color: transparent;
border-width:0px;
border:none;
&:focus {
	 outline: none;
}
  `;
		const Selection = styled.p `
text-align: center;
cursor: pointer;
	 `;
		const InitBtn = styled.svg `
display: block;
margin: 0 auto;
	 `;
		//Template
		return (
			<div>
				<InitWrapper>
					<Input type="text" placeholder="NAME"/>
					<Selection>SELECT FOLDER</Selection>
					<InitBtn width="100" height="100">
						<circle cx="50" cy="50" r="35" stroke="rgba(234, 67, 78, .5)" strokeWidth="20" fill="#EA424D"/>
					</InitBtn>
				</InitWrapper>
			</div>
		);
	}

}
export default withRouter(Record)
