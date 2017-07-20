import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import FolderMenu from '../components/Folder_Menu.js';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {triggerAction} from '../state/actions/index';

class Record extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			showMenu: 'false'
		}
	}

	//Methods
showMenu = () => {
	return this.props.triggerAction(true);
}
	render() {
		//Properties

		//Style
		const InitWrapper = styled.div `
		position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
margin:auto;
width: 100%;
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
border:none
width: 243px;

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

		const Circle = styled.circle `
&:active {
	stroke-width: 30;
}
	  `;
		//Template
		return (
			<div>
				<InitWrapper>
					<Input type="text" placeholder="NAME"/>
					<Selection onClick={this.showMenu}>SELECT FOLDER</Selection>
					<InitBtn width="100" height="100">
						<Circle cx="50" cy="50" r="35" stroke="rgba(247, 23, 53, .5)" strokeWidth="20" fill="#F71735"/>
					</InitBtn>
				</InitWrapper>
				{/* <FolderMenu showMenu={this.state.showMenu}/> */}
				<FolderMenu showMenu={this.state.showMenu}/>
			</div>
		);
	}

}

//define actions to use
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		triggerAction
	}, dispatch)
}
export default connect(null, mapDispatchToProps)(withRouter(Record));
