import React from 'react';
import styled from 'styled-components'
import Plus_img from '../../images/icons/plus.svg';
import FolderLink from '../Folder_link.js';
import firebase from 'firebase';

export default class Folder extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
	}

	//Methods
	componentWillMount() {
this.fetchData();
	}
	  fetchData = () => {
			let userId = firebase.auth().currentUser.uid;
	 		let array = [];

	 		return firebase.database().ref('/users/' + userId + '/folders').once('value').then((snap) => {
	 			let list = {},
	 				snapValue = snap.val();
	 			// console.log(snapValue);

	 			for (var prop in snapValue) {
	 				// console.log(snapValue[prop]);
	 				list.id = prop;
	 				list.name = snapValue[prop].name;

	 				// console.log(list);
	 				array.push(list);
	 				list = {};
	 			}

	 			// console.log(array);
	 			this.setState({list: array});
	 		});
	  }
	addFolder = () => {

firebase.database().ref(`users/${firebase.auth().currentUser.uid}/folders`).push({name: 'United'});




		this.fetchData();

	}
	render() {
		//Properties
		let list = this.state.list.map((item, i) => <FolderLink name={item.name} key={item.id} width="140px"/>);

		//Style
		const Wrapper = styled.div `

	  `;
		const TitleWrappper = styled.div `
display: grid;
grid-template-columns: 1fr 15px;
		 `;
		const Title = styled.div `
 margin-top: 15px;
 `;
		const Img = styled.img `
		margin-top: 15px;
cursor: pointer;
width: 15px;
right: 15px;
  `;
		const FolderWrapper = styled.div `
		margin-top: 15px;

display: grid;
grid-template-columns: 1fr 1fr;
grid-column-gap: 5px;
grid-row-gap: 5px;
	 `;
		//Template
		return (
			<Wrapper>
				<TitleWrappper>
					<Title>Folders</Title>
					<Img onClick={this.addFolder} src={Plus_img} alt="add icon"/>
				</TitleWrappper>
				<FolderWrapper>
					{list}
				</FolderWrapper>
			</Wrapper>
		);
	}

}
