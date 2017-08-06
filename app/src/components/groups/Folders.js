import React from 'react';
import styled from 'styled-components'
import Plus_img from '../../images/icons/plus.svg';
import FolderLink from '../Folder_link.js';
import firebase from 'firebase';
import Button from '../Button.js';

export default class Folder extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			open: true,
			name: ''
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

		this.setState({open: true});

		this.fetchData();

	}
	submit = () => {
		this.setState({open: false});
		firebase.database().ref(`users/${firebase.auth().currentUser.uid}/folders`).push({name: this.state.name});
	}
	handleClose = () => {
		this.setState({open: false});
		this.setState({name: ''})

	};

	handleName = (e) => {
		console.log(e.target.value);
		this.setState({name: e.target.value})
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
		const Dialog = styled.div `
			display: ${props => this.state.open
			? 'block'
			: 'none'};
		position: fixed;
		background: rgba(0, 0, 0, 0.73);
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 20;
	  `;
		const InnerDialog = styled.div `
			border-radius: 2px;
position: absolute;
background: white;
height: 220px;
max-width: 600px;
width: 75%;
left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
display: grid;
grid-template-rows: 50px 50px 50px;
grid-row-gap: 24px;
		 `;
		const Input = styled.input `
		&:focus {
		outline: none;
		}
		width: 80%;
		display: block;
		margin: auto;
		height: 30px;
		font-size: 16px;
		border-color: transparent;
    border-width: 0px;
	  `;
		const SubTitle = styled.h2 `
		  color: #0F2331;
			margin: 0px;
padding: 24px 36px 20px;
font-size: 20px;
line-height: 32px;
font-weight: 400;
		 `;

		const ButtonCon = styled.div `
			display: grid;
			grid-template-columns: 1fr 1fr;
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
				<Dialog>
					<InnerDialog>
						<SubTitle>Name folder</SubTitle>
						<Input autoFocus type="text" placeholder="Type here..." value={this.state.name} onChange={this.handleName}/>
						<ButtonCon>
							<span onClick={this.handleClose}>
								<Button text="Cancel" color="#9E9E9E"/>
							</span>
							<span onClick={this.submit}>
								<Button text="Create" color="#44F6A3"/>
							</span>
						</ButtonCon>
					</InnerDialog>
				</Dialog>
			</Wrapper>
		);
	}

}
