import React from 'react';
import styled from 'styled-components'
// import Button from '../components/Button.js';
import FolderLink from '../components/Folder_link_menu.js';
// import FolderSubLink from '../components/Folder_Sublink_menu.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderSelection, FolderSelection_Name, FolderSelection_ID} from '../state/actions/index';

//define what information to get from store and listen to changes, eg sets status as a component prop
function mapStateToProps(state) {
	return {status: state.FolderSelection, folders: state.FolderList}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		folderSelection,
		FolderSelection_Name,
		FolderSelection_ID
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

	hideFolderSelection = (e) => {
		// console.log(e);
		this.props.FolderSelection_Name(e.name);
		this.props.FolderSelection_ID(e.id);
		this.props.folderSelection(false);
	}
	loadFolders = () => {

		let list = this.props.folders.map((folder, i) => {
			// console.log(folder);
			return <span data-id={folder.id} data-name={folder.name} key={i} onClick={(e) => {
				// console.log(e.currentTarget);
				let data = {
					id: e.currentTarget.dataset.id,
					name: e.currentTarget.dataset.name
				}
				this.hideFolderSelection(data)
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
	overflow-y: scroll;
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
						let data = {
							id: 'Root',
							name: 'Root'
						}
						this.hideFolderSelection(data)
					}}>
						<FolderLink name="Root"/>
					</span>
					{this.loadFolders()}
				</Content>

			</Wrapper>
		);
	}

}

//set store data in components state
export default connect(mapStateToProps, mapDispatchToProps)(FolderMenu);
