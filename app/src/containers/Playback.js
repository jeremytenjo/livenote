import React from 'react';
import styled from 'styled-components'
import RecItemView from '../components/groups/Playback_RecItemView.js';

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

class Playback extends React.Component {

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
		//Reactive Styles

		//Template
		return (
			<Wrapper>
				<ItemViewContainer>
					<RecItemView />
				</ItemViewContainer>

				<TimeBarContainer>
					jhasdhfpshdgfpshdfhg
				</TimeBarContainer>

				<OptionsContainer>
					jhasdhfpshdgfpshdfhg
				</OptionsContainer></Wrapper>
		);
	}

}

//Styles
const Wrapper = styled.div `
	display: grid;
	height: 100%;
	position: fixed;
	max-width: 600px;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	grid-template-rows: 1fr 70px 100px;
	overflow: hidden;
	padding: 10px;

 `;
const ItemViewContainer = styled.div `
${ ''/* background: red; */}
margin-top: 50px;
margin-bottom: 10px;
overflow: scroll;
overflow-x: hidden;
 `;
const TimeBarContainer = styled.div `
${ ''/* background: blue; */}
`;
const OptionsContainer = styled.div `
${ ''/* background: green; */}
	 `;

//export default connect(mapStateToProps, mapDispatchToProps)(Playback);
export default Playback
