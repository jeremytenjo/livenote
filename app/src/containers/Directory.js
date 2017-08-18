import React from 'react';
import styled from 'styled-components'
import Recent from '../components/groups/Recent.js';
import Folders from '../components/groups/Folders.js';
import Notes from '../components/groups/Notes.js';
import FloatingButton from '../components/FloatButton.js';
import {withRouter} from 'react-router-dom'
// import firebase from 'firebase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Set_RecentNotes, Change_TopBar_Title, Hide_Snackbar} from '../state/actions/index';

function mapStateToProps(state) {
	return {status: state.RecentNotes}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Set_RecentNotes, Change_TopBar_Title, Hide_Snackbar
	}, dispatch)
}
class Directory extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods
componentWillMount(){
	this.props.Change_TopBar_Title('Directory');
	this.props.Hide_Snackbar();

}
	openRecord = () => {
		this.props.history.push(`/record`);
	}
	render() {
		//Properties

		//Style
		const FloatingButtonCon = styled.span `
position: fixed;
bottom: 20px;
right: 0;
`;
		//Template
		return (
			<div>
				<Recent/>
				<Folders/>
				<Notes/>
				<FloatingButtonCon onClick={this.openRecord}>
					<FloatingButton/>
				</FloatingButtonCon>
			</div>
		);
	}

}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Directory));
