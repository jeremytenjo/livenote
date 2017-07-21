import React from 'react';
import styled from 'styled-components'

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

class Recording extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods

	render() {
		//Properties

		//Style

		//Template
		return (
			<Wrapper>
				<ItemViewContainer></ItemViewContainer>
				<TimeBarContainer></TimeBarContainer>
				<OptionsContainer></OptionsContainer>
			</Wrapper>
		);
	}

}

//Styles
const Wrapper = styled.div `
	display: grid;
	height: 100%;
	grid-template-rows: 1fr 200px 200px;
 `;
const ItemViewContainer = styled.div `
background: red;
 `;
const TimeBarContainer = styled.div `
background: blue;
  `;
const OptionsContainer = styled.div `
background: green;
	 `;

//export default connect(mapStateToProps, mapDispatchToProps)(Recording);
export default Recording
