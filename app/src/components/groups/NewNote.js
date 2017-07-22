import React from 'react';
import styled from 'styled-components'
import Close_Icon from '../../images/icons/close.svg';
import Button from '../Button.js';
//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Toggle_NewNote} from '../../state/actions/index';

//Set global state to prop
function mapStateToProps(state) {
	return {status: state.NewNoteToggle}
}
//define actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Toggle_NewNote
      }, dispatch)
 }
class NewNote extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			display: props.display
		}
	}

	//Methods
	handleSubmit = (e) => {
		e.preventDefault();

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
				<Title placeholder="Title" type="text"/>
				<Comment placeholder="Write comment..."/>
				<ButtonCon><Button type="submit" color="#42EA9C" text="Add"/></ButtonCon>

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