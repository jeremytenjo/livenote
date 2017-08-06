import React from 'react';
import styled from 'styled-components'
// import File from '../File_link.js';
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
			listOfPositions: []
		}
	}

	//Methods
	componentWillMount() {
		let userId = firebase.auth().currentUser.uid;
		let array = [];

		return firebase.database().ref('/users/' + userId + '/masterNotes').limitToFirst(6).on('child_added', (snap) => {
			let list = {};
			list.key = snap.val().id;
			list.name = snap.val().name;
			array.push(list);
			console.log(array);
			this.setState({listOfPositions: array});

		});
	}

	render() {
		//Properties
		const listOfPositions = this.state.listOfPositions.map(position => <div>
			<h1 key={position.id}>{position.name}</h1>
		</div>);
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
					{listOfPositions}
				</Container>
			</div>
		);
	}

}

export default connect(mapStateToProps)(Recent);
