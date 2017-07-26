import React from 'react';
import styled from 'styled-components'
import Close_Icon from '../../images/icons/close.svg';
import Button from '../Button.js';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Toggle_NewNote, Insert_Item} from '../../state/actions/index';

//Set global state to prop
function mapStateToProps(state) {
	return {status: state.NewNoteToggle, time: state.CurrentTime}
}
//define actions
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Toggle_NewNote,
		Insert_Item
	}, dispatch)
}
class NewNote extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			display: props.display,
			title: '',
			desc: ''
		}
	}

	//Methods
	handleTitle = (e) => {
		// console.log(e.target.value);
		this.setState({title: e.target.value})
	}
	handleDesc = (e) => {
		// console.log(e.target.value);
		this.setState({desc: e.target.value})
	}
	handleSubmit = (e) => {
		e.preventDefault();

		//Create new object
		let item = {};

		let getMinutes = Math.floor(this.props.time / 60);
		let getSeconds = ('0' + this.props.time % 60).slice(-2);
		let time = getMinutes + ':' + getSeconds;
		item.time = time;
		item.title = this.state.title;
		item.desc = this.state.desc;
		item.image = '';

		//Insert Item
		this.props.Toggle_NewNote('none');
		this.props.Insert_Item(item);

		//reset vlaues
		this.setState({title: ""});
		this.setState({desc: ""});
		time = "";

	

	}
	hide = () => {
		this.props.Toggle_NewNote('none');
	}
	render() {
		//Properties

		//Template
		return (
			<Wrapper onSubmit={this.handleSubmit} display={this.props.status}>

				<Top>
					<CloseIcon onClick={this.hide} src={Close_Icon}/>
					New Comment
				</Top>
				<Title placeholder="Title" type="text" value={this.state.title} onChange={this.handleTitle}/>
				<Comment placeholder="Write comment..." value={this.state.desc} onChange={this.handleDesc}/>
				<ButtonCon>
						<Button type="submit" color="#42EA9C" text="Add"/>
				</ButtonCon>

			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.form `
background: white;
position: fixed;
display: ${props => props.display === 'none'
	? 'none'
	: 'grid'};
grid-template-rows: 30px 50px 1fr 80px;
height: 100%;
width: 100%;
color: #212121;
padding-top: 10px;
top: 0;
left: 0;
		   `;
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
const Title = styled.input `
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
font-weight: bold;
				 `;
const Comment = styled.textarea `
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
				 `;
const ButtonCon = styled.div `
	width: 200px;
	display: block;
	margin: 0 auto;
	padding-top: 10px;
				 `;
export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
