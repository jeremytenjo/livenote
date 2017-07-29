import React from 'react';
import styled from 'styled-components'
// import Button from '../components/Button.js';
import FolderLink from '../components/Folder_link_menu.js';
// import FolderSubLink from '../components/Folder_Sublink_menu.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderSelection} from '../state/actions/index';
import {FolderSelection_Name} from '../state/actions/index';

//define what information to get from store and listen to changes, eg sets status as a component prop
function mapStateToProps(state) {
	return {status: state.FolderSelection, folders: state.FolderList}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		folderSelection,
		FolderSelection_Name
	}, dispatch)
}

class FolderMenu extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			// showMenu: this.props.showMenu
			showMenu: this.props.status
		}
	}

	//Methods

	hideFolderSelection = (name) => {
		this.props.FolderSelection_Name(name);
		this.props.folderSelection(false);

	}
	loadFolders = () => {
		// console.log(this.props.folders);
		let list = this.props.folders.map((folder, i) => {
			// return statement goes here:
			console.log(folder);
			return <span  key={i} onClick={() => {
				this.hideFolderSelection('Name')
			}}>
				<FolderLink name={folder.name}/>
			</span>
		});
		return list;

	}
	render() {
		//Properties

		//Style
		const Wrapper = styled.div `
	background: white;
	position: fixed;
	display: ${props => this.props.status === false
			? 'none !important'
			: 'block !important'};
	bottom: 0;
	${ ''/* top: 100%; */}
	top: 0;
	right: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows:  1fr 80px;
 `;
		const Content = styled.div `
${ ''/* background: green; */}
overflow-y: scroll;
padding: 20px;
  `;
		// 		const ButtonContainer = styled.div `
		// 	 ${'' /* background: blue; */}
		// display: grid;
		// grid-template-columns:  1fr 1fr;
		// 	 `;
		//Template
		return (
			<Wrapper >
				<Content>
					<span onClick={() => {
						this.hideFolderSelection('Root')
					}}>
						<FolderLink name="Root"/>
					</span>

					{this.loadFolders()}
				</Content>
				{/* <ButtonContainer>
					<Button text="Cancel" color=" #95989A"/>
					<Button text="Select" color=" #42EA9C"/>
				</ButtonContainer> */}
			</Wrapper>
		);
	}

}

//set store data in components state
export default connect(mapStateToProps, mapDispatchToProps)(FolderMenu);
