import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import File from '../components/File_link.js';
import firebase from 'firebase';
import {bindActionCreators} from 'redux';
import {Change_TopBar_Title, Hide_Snackbar} from '../state/actions/index';

//define actions to use
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Change_TopBar_Title,
		Hide_Snackbar
	}, dispatch)
}
function mapStateToProps(state) {
	return {id: state.FolderLink_ID, name: state.FolderLink_Name}
}
class Folder extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			alert: ''
		}
	}

	//Methods
	componentWillMount() {
		this.props.Change_TopBar_Title(this.props.name);
		this.props.Hide_Snackbar();

		if (this.props.id === '') {
			this.setState({alert: 'No Notes in this folder'});

		}
		let userId = firebase.auth().currentUser.uid;
		let array = [];

		return firebase.database().ref('/users/' + userId + '/masterNotes').orderByChild('folderID').equalTo(this.props.id).once('value').then((snap) => {
			let list = {},
				snapValue = snap.val();
			// console.log(snapValue);

			for (var prop in snapValue) {
				// console.log(snapValue[prop]);
				list.id = prop;
				list.dateAdded = snapValue[prop].dateAdded;
				list.dateAddedSort = snapValue[prop].dateAddedSort;
				list.folderID = snapValue[prop].folderID;
				list.folderName = snapValue[prop].folderName;
				list.name = snapValue[prop].name;

				// console.log(list);
				array.push(list);
				list = {};
			}
			// console.log(array);
			this.setState({list: array});
		});

	}
	render() {
		//Properties
		let list = this.state.list.map((item, i) => <span key={item.id} onClick={this.openPlayback}><File key={item.id} width="auto" title={item.name}/></span>);

		//Template
		return (
			<Wrapper>
				{list}
			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-column-gap: 10px;
grid-row-gap: 10px;
padding-bottom: 90px;

`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Folder));
