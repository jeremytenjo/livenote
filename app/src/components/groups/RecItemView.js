import React from 'react';
import styled from 'styled-components'

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

class RecItemView extends React.Component {

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

		//Template
		return (
			<Wrapper>
				<NothingTitle>Nothing Added</NothingTitle>
			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
	
`;
const NothingTitle = styled.p `
margin-top: 100px;
text-align: center;
	color: #9E9E9E;
	font-size: 20px;
`;
//export default connect(mapStateToProps, mapDispatchToProps)(RecItemView);
export default RecItemView
