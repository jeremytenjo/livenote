import React from 'react';
import styled from 'styled-components'
// import {ReactMic} from 'react-mic';

//State
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
function mapStateToProps(state) {
  return {record: state.RecordingState}
 }
//define actions

class RecTimeBar extends React.Component {

	//initial state

	//Methods

	onStop(recordedBlob) {
		console.log('recordedBlob is: ', recordedBlob);
	}
	render() {
		//Properties

		//Template
		return (
			<Wrapper>


			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `

		             `;
export default connect(mapStateToProps)(RecTimeBar);
