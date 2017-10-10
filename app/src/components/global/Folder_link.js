import React from 'react';
import styled from 'styled-components'
import Folder_img from '../../images/icons/Folder.svg';
import Options_img from '../../images/icons/Options.svg';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux';

import {Toggle_OptinsMenuShow, Set_Delete_Folder_ID, Set_Delete_Folder_Name, Set_Folder_Link_Id, Set_Folder_Link_Name} from '../../state/actions/index';

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Toggle_OptinsMenuShow,
		Set_Delete_Folder_ID,
		Set_Delete_Folder_Name, Set_Folder_Link_Id, Set_Folder_Link_Name
	}, dispatch)
}
class Folder_Link extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			name: props.name,
			id: props.id
		}
	}

	//Methods
	showOptions = () => {
		//set ref id
		this.props.Set_Delete_Folder_ID(this.state.id);
		this.props.Set_Delete_Folder_Name(this.state.name);
		this.props.Toggle_OptinsMenuShow()
	}
	redirect = () => {
		this.props.Set_Folder_Link_Name(this.state.name);
		this.props.Set_Folder_Link_Id(this.state.id);
		this.props.history.push(`/folder`);
	}
	render() {
		//Properties

		//Style
		const Wrapper = styled.div `
display: grid;
grid-template-columns: 1fr  .1fr;
background: white;
height: 40px;
border-radius: 2px;
cursor: pointer;
 `;
		const Sub = styled.div `
		height: 40px;

  `;
		const Img = styled.img `
   width: 18px;
	 padding: 10px;
  `;
		const Title = styled.p `
		margin: 0;
		margin-top: -31px;
		margin-left: 40px;
color: #212121;
	 `;
		//Template
		return (
			<Wrapper >
				<Sub onClick={this.redirect}>
					<Img src={Folder_img} alt="foler icon"/>
					<Title>{this.state.name}</Title>
				</Sub>
				<Img onClick={this.showOptions} src={Options_img} alt="options icon"/>
			</Wrapper>
		);
	}

}

export default connect(null, mapDispatchToProps)(withRouter(Folder_Link));
