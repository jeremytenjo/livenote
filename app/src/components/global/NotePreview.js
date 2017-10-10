import React from 'react';
import styled from 'styled-components'
import Close_Icon from '../../images/icons/close.svg';
// import Button from '../Button.js';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotePreview_Hide} from '../../state/actions/index';

// Set global state to prop
function mapStateToProps(state) {
	return {status: state.NotePreview_Toggle, data: state.NotePreview}
}
//define actions
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		NotePreview_Hide
	}, dispatch)
}
class NotePreview extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods

	hide = () => {
		this.props.NotePreview_Hide();
	}
	render() {
		//Properties

		//Reactive Styles
		const Wrapper = styled.form `
		z-index: 3;
			
		background: white;
		position: fixed;
		overflow-y: scroll;
		display: ${props => this.props.status === false
			? 'none'
			: 'block'};
		height: 100%;
		width: 100%;
		color: #212121;
		padding-top: 10px;
		top: 0;
		left: 0;
				   `;

		//Template
		return (
			<Wrapper>

				<Top>
					<CloseIcon onClick={this.hide} src={Close_Icon}/>
					Preview ({this.props.data.time})
				</Top>
				<Title>{this.props.data.title}</Title>
				<ImgPreview id="PreviewImage" src={this.props.data.image} alt=""/>
				<Comment>{this.props.data.desc}</Comment>
				{/* <ButtonCon>
					<Button type="submit" color="#42EA9C" text="Add"/>
				</ButtonCon> */}

			</Wrapper>
		);
	}

}

//Style

const CloseIcon = styled.img `
width: 17px;
position: fixed;
top: 15px;
right: 15px;
cursor: pointer;

			  `;
const Top = styled.div `
text-align: center;
font-size: 20px;
			  `;
const ImgPreview = styled.img `
	max-width: 100%;
	display: block;
	margin: 0 auto;

				 `;
const Title = styled.p `
&:focus {
outline: none;
}
border:none
textDecoration: none;
border-color: transparent;
border-width:0px;
padding-left: 10px;
font-size: 17px;
padding-right: 10px;
margin-bottom: 10px;
font-weight: bold;
				 `;
const Comment = styled.p `
&:focus {
outline: none;
}
border:none
textDecoration: none;
border-color: transparent;
border-width:0px;
font-size: 15px;
padding-left: 10px;
padding-right: 10px;
margin-top: 10px;
				 `;
// const ButtonCon = styled.div `
// 	width: 200px;
// 	display: block;
// 	margin: 0 auto;
// 	padding-top: 10px;
// 				 `;
export default connect(mapStateToProps, mapDispatchToProps)(NotePreview);
