import React from 'react';
import styled from 'styled-components'
import ItemOnlyText from '../Item_OnlyText.js';
import ItemOnlyImage from '../Item_OnlyImage.js';
import ItemTextImage from '../Item_TextImage.js';
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
				<ItemOnlyText/>
				<ItemOnlyImage/>
				<ItemOnlyText/>
				<ItemTextImage/>
				<ItemOnlyImage/>
				<ItemTextImage/>
				<ItemTextImage/>
			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
display: grid;
grid-row-gap: 10px;
`;

//export default connect(mapStateToProps, mapDispatchToProps)(RecItemView);
export default RecItemView
