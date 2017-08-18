import React from 'react';
import styled from 'styled-components'
import File from '../File_link.js';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {Set_Playback_Id} from '../../state/actions/index';

// import CircularProgress from 'material-ui/CircularProgress';
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Set_Playback_Id
	}, dispatch)
}
function mapStateToProps(state) {
	return {notes: state.RecentNotes}
}
class Recent extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
	}

	//Methods
	componentWillMount() {
		let userId = firebase.auth().currentUser.uid;
		let array = [];

		return firebase.database().ref('/users/' + userId + '/masterNotes').orderByChild('dateAddedSort').limitToLast(6).once('value').then((snap) => {
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
				array.reverse();
				list = {};
			}
			// console.log(array);
			this.setState({list: array});
		});

	}

	openPlayback = (e) => {
		// console.log(e);
		this.props.Set_Playback_Id(e);
		this.props.history.push(`/playback`);
	}

	render() {
		//Properties
		let list = this.state.list.map((item, i) => <span key={item.id} onClick={() => this.openPlayback(item.id)}><File width="140px" title={item.name}/></span>);

		//Style
		const Title = styled.p `
margin-top: 5px;
		 `;
		const Container = styled.div `
overflow-x: scroll;
overflow-y: hidden;
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-column-gap: 10px;
white-space: nowrap;
height: 120px;
 `;

		//Template
		return (
			<div>
				<Title>Recent</Title>
				<Container>
					{list}
				</Container>
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recent));
