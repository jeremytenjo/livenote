import React from 'react';
import styled, {keyframes} from 'styled-components'
import Plus_img from '../../images/icons/plus.svg';
import Rename_img from '../../images/icons/rename.svg';
import Remove_img from '../../images/icons/rubbish-bin.svg';
import FolderLink from '../Folder_link.js';
import firebase from 'firebase';
import Button from '../Button.js';
import Close_Icon from '../../images/icons/close.svg';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Toggle_OptinsMenuHide} from '../../state/actions/index';

function mapStateToProps(state) {
	return {options: state.OtionsMenu_Toggle}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Toggle_OptinsMenuHide
	}, dispatch)
}
class Folder extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			open: false,
			title: ''
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

	}
	submit = (e) => {
		// console.log(this.input.value);
		e.preventDefault();
		this.setState({open: false});
		firebase.database().ref(`users/${firebase.auth().currentUser.uid}/folders`).push({name: this.input.value});
		// this.setState({title: ''});
		this.fetchData();

	}
	handleClose = (e) => {
		this.setState({open: false});
		// this.setState({title: ''});
		e.preventDefault();

	};
	hideOptions = () => {
		this.props.Toggle_OptinsMenuHide();
	}
	render() {
		//Properties
		let list = this.state.list.map((item, i) => <FolderLink name={item.name} key={item.id} width="140px"/>);

		const Dialog = styled.form `
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
		let inputStyle = {
			width: '80%',
			display: 'block',
			margin: 'auto',
			height: '30px',
			fontSize: '16px',
			borderColor: 'transparent',
			borderWidth: '0px'
		}
		const OptionsMenuWrapper = styled.form `
		display: ${props => this.props.options
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

		const rotate360 = keyframes `
			 from {
				 bottom: -150px;
			 }

			 to {
				 bottom: 0;
			 }
			`;
		const OptionsMenuInner = styled.div `
		position: fixed;
		background: white;
		height: 150px;
		width: 100%;
		max-width: 600px;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 0;
			animation: ${rotate360} .1s linear;
      display: grid;
      grid-template-rows: 50px 250px;

		 `;
		const OptionsMenuTop = styled.div `
     position: fixed;
     background: rgba(0, 0, 0, 0.73);
      bottom: 150px;
      height: 100%;
      width: 100%;
      max-width: 600px;
			left: 0;
			right: 0;
			margin: auto;
     `;
		const OtopnsWrapper = styled.div `
margin-top: 40px;
		  `;
		const OptionsItemCon = styled.div `
display: grid;
grid-template-columns: 50px 1fr;
color: #0F2331;
		  `;
		const OptionsItem = styled.img `
width: 20px;
padding: 15px;
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

				<Dialog onSubmit={this.submit}>
					<InnerDialog>
						<SubTitle>Name folder</SubTitle>
						<input autoFocus style={inputStyle} type="text" placeholder="Type here..." ref={(input) => this.input = input}/>

						<ButtonCon>
							<span onClick={this.handleClose}>
								<Button text="Cancel" color="#9E9E9E"/>
							</span>
							<span >
								<Button type="submit" text="Create" color="#44F6A3"/>
							</span>
						</ButtonCon>
					</InnerDialog>
				</Dialog>
				<OptionsMenuWrapper>
					<OptionsMenuTop onClick={this.hideOptions}/>
					<OptionsMenuInner>
						<CloseIcon onClick={this.hideOptions} src={Close_Icon} alt="close Icon"/>
						<OtopnsWrapper>

							<OptionsItemCon onClick={this.hideOptions}>
								<OptionsItem  src={Rename_img} alt="rename Icon"/>
								<p>Rename</p>
							</OptionsItemCon>
							<OptionsItemCon onClick={this.hideOptions}>
								<OptionsItem  src={Remove_img} alt="rename Icon"/>
								<p>Remove</p>
							</OptionsItemCon>

						</OtopnsWrapper>

					</OptionsMenuInner>
				</OptionsMenuWrapper>

			</Wrapper>
		);
	}

}

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

const SubTitle = styled.h2 `
	color: #0F2331;
	margin: 0px;
padding: 24px 32px;
font-size: 20px;
line-height: 32px;
font-weight: 400;
 `;

const ButtonCon = styled.div `
	display: grid;
	grid-template-columns: 1fr 1fr;
	`;
const CloseIcon = styled.img `
width: 20px;
position: absolute;
right: 10px;
top: 10px;
 `;

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
