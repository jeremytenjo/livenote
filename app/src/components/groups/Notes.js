import React from 'react';
import styled from 'styled-components'
import File from '../File_link.js';
import firebase from 'firebase';

export default class Notes extends React.Component {

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
		let list = this.state.list.map((item, i) => <File key={item.id} width="auto"/>);

		//Style
		const Wrapper = styled.div `
		margin-top: 15px;
padding-bottom: 90px;
	  `;
		const Title = styled.p `
	 margin-top: 5px;
	  `;
		const Container = styled.div `
	 display: grid;
	 grid-template-columns: 1fr 1fr 1fr;
	 grid-column-gap: 10px;
	 grid-row-gap: 10px;
	 `;
		//Template
		return (
			<Wrapper>
				<Title>Notes</Title>
				<Container>
					{list}
				</Container>
			</Wrapper>
		);
	}

}
