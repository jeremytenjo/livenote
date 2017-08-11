import React from 'react';
import styled from 'styled-components'
import RecItemView from '../components/groups/RecItemView.js';
// import RecTimteBar from '../components/groups/RecTimteBar.js';
import RecOptions from '../components/groups/RecOptions.js';
import NewNote from '../components/groups/NewNote.js';
import NewNoteImage from '../components/groups/NewNote_Image.js';
import NotePreview from '../components/groups/NotePreview.js';
import ReactVoiceInput from 'react-voice-input'


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
			inputText: ''

		}
	}

	//Methods
	componentWillMount = () => {
		this.startRecording();
	}
	startRecording = () => {



	}
	stop = () => {}

	  onInputChange = (event) => {
	    this.setState({
	      inputText: event.target.value
	    })
	  }

	  onResult = (result)  =>{
	    this.setState({
	      inputText: result
	    })
	  }
	render() {
		//Properties
		const onEnd = () => {
		      console.log('on end')
		    }

		//Style

		//Template
		return (
			<Wrapper>
				<button  onClick={this.stop}>Stop</button>
				<ReactVoiceInput
			           onResult={this.onResult}
			           onEnd={onEnd}
			         >
			           <input type='text' value={this.state.inputText} onChange={this.onInputChange} />
			         </ReactVoiceInput>
				<ItemViewContainer>
					<RecItemView/>
				</ItemViewContainer>

				<OptionsContainer>
					<RecOptions/>
				</OptionsContainer>

				<NewNote/>
				<NewNoteImage/>
				<NotePreview/>

			</Wrapper>
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
	grid-template-rows: 1fr 100px;
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
// const TimeBarContainer = styled.div `
// ${ ''/* background: blue; */}
// `;
const OptionsContainer = styled.div `
${ ''/* background: green; */}
	 `;

//export default connect(mapStateToProps, mapDispatchToProps)(Recording);
export default Recording
