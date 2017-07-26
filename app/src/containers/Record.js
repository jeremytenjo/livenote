import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import FolderMenu from '../components/Folder_Menu.js';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {folderSelection, Change_TopBar_Title, Note_Name, Reset_Timer,
Toggle_NewNote} from '../state/actions/index';

function mapStateToProps(state) {
	return {name: state.FolderSelection_Name, noteName: state.Note_Name}
}

//define actions to use
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		folderSelection,
		Change_TopBar_Title,
		Note_Name,
		Reset_Timer,
		Toggle_NewNote
	}, dispatch)
}

class Record extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			noteName: ''
		}
	}

	//Methods
	componentWillMount() {
		this.props.Change_TopBar_Title('Notes');
	}
	showMenu = () => {
		this.props.folderSelection(true);
	}

	initRecording = () => {
		// console.log(this.state.noteName);
		this.props.Note_Name(this.state.noteName);
		this.props.Change_TopBar_Title(this.state.noteName);

		this.props.Toggle_NewNote('none');


		//Redirect
		this.props.history.push(`/recording`);
	}
	handleNameInput = (e) => {
		this.setState({noteName: e.target.value})

	}

	render() {
		//Properties

		//Template
		return (
			<div>
				<InitWrapper>

					<Input type="text" placeholder="NAME" value={this.state.name} onChange={this.handleNameInput} name="email"/>
					<Selection onClick={this.showMenu}>{this.props.name}</Selection>
					<InitBtn width="100" height="100" onClick={this.initRecording}>
						<Circle cx="50" cy="50" r="35" stroke="rgba(247, 23, 53, .5)" strokeWidth="20" fill="#F71735"/>
					</InitBtn>
				</InitWrapper>
				<FolderMenu/>
			</div>
		);
	}

}

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

::-webkit-input-placeholder {
	/* Chrome/Opera/Safari */
	color: #9E9E9E;
	text-align: center;
}

::-moz-placeholder {
	/* Firefox 19+ */
	color: #9E9E9E;
	text-align: center;
}

:-ms-input-placeholder {
	/* IE 10+ */
	color: #9E9E9E;
	text-align: center;
}

:-moz-placeholder {
	/* Firefox 18- */
	color: #9E9E9E;
	text-align: center;
}
`;
const Selection = styled.p `
text-align: center;
cursor: pointer;
outline: none;
&:focus {
outline: none;
}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Record));
