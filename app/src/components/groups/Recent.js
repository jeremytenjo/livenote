import React from 'react';
import styled from 'styled-components'
import File from '../File_link.js';
import {connect} from 'react-redux';
import firebase from 'firebase';
// import CircularProgress from 'material-ui/CircularProgress';

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

		return firebase.database().ref('/users/' + userId + '/masterNotes').limitToFirst(6).once('value').then((snap) => {
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
		let list = this.state.list.map((item, i) =>
			<File key={item.id}/>
		);

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
height: 100px;
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

export default connect(mapStateToProps)(Recent);
