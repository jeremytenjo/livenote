import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import FolderMenu from '../components/Folder_Menu.js';
import firebase from 'firebase';
//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
	folderSelection,
	Change_TopBar_Title,
	Note_Name,
	Reset_Timer,
	Toggle_NewNote,
	Reset_Items,
	Folders_Set,
	Set_MasterNote_id,
	Hide_Snackbar
} from '../state/actions/index';

function mapStateToProps(state) {
	return {name: state.FolderSelection_Name, noteName: state.Note_Name, FolderSelectionName: state.FolderSelection_Name}
}

//define actions to use
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		folderSelection,
		Change_TopBar_Title,
		Note_Name,
		Reset_Timer,
		Toggle_NewNote,
		Reset_Items,
		Folders_Set,
		Set_MasterNote_id,
		Hide_Snackbar
	}, dispatch)
}

class Record extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			noteNameee: ''
		}
	}

	//Methods
	componentWillMount() {
		this.props.Change_TopBar_Title('Record');
		this.props.Hide_Snackbar();

	}

	showMenu = () => {

		//get folders from database
		let array = [];

		let userId = firebase.auth().currentUser.uid;
		firebase.database().ref('/users/' + userId + '/folders').once('value').then((snap) => {
			// console.log(snapshot.val());
			let list = {},
				snapValue = snap.val();


 		for (var prop in snapValue) {
			// console.log(snapValue[prop]);
					list.id = prop;
					list.name = snapValue[prop].name;
					array.push(list);
					list = {};
				}

			this.props.Folders_Set(array);
		});

		//show menu
		this.props.folderSelection(true);
	}

	initRecording = () => {
		// console.log(this.state.noteNameee);
		// let note_name;
		if (this.state.noteNameee === '') {
			this.props.Note_Name('Title');
			this.props.Change_TopBar_Title('Title');

		} else {
			this.props.Note_Name(this.state.noteNameee);
			this.props.Change_TopBar_Title(this.state.noteNameee);

		}

		//hide note
		this.props.Toggle_NewNote('none');

		//reset notes
		this.props.Reset_Items();

		//Redirect
		this.props.history.push(`/recording`);

	}
	handleNameInput = (e) => {
		// console.log(e.target.value);
		this.setState({noteNameee: e.target.value})
	}

	render() {
		//Properties

		//Template
		return (
			<div>
				<InitWrapper>

					<Input autoFocus type="text" placeholder="NAME" value={this.state.name} onChange={this.handleNameInput} autoComplete="off"/>
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
