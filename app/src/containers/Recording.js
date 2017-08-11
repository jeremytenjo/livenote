import React from 'react';
import styled from 'styled-components'
import RecItemView from '../components/groups/RecItemView.js';
import RecTimteBar from '../components/groups/RecTimteBar.js';
import RecOptions from '../components/groups/RecOptions.js';
import NewNote from '../components/groups/NewNote.js';
import NewNoteImage from '../components/groups/NewNote_Image.js';
import NotePreview from '../components/groups/NotePreview.js';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Start_Reording, Stop_Reording} from '../state/actions/index';

//Set global state to prop
function mapStateToProps(state) {
	return {record: state.RecordingState}
}
//define actions
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Start_Reording,
		Stop_Reording
	}, dispatch)
}
class Recording extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			recData: [],
			data: 's'
		}
	}
	//Methods
	componentWillMount() {
		this.initRecording();

	}
	initRecording = () => {

		navigator.mediaDevices.getUserMedia({audio: true, video: false}).then((stream) => {
			const options = {
				mimeType: 'video/webm;codecs=vp9'
			};
			const recordedChunks = [];
			const mediaRecorder = new MediaRecorder(stream, options);
			console.log(this.props.record);

			mediaRecorder.dataavailable = (e) => {
				this.setState({data: 'l'});
				if (e.data.size > 0) {
					recordedChunks.push(e.data);
				}

				console.log(this.props.record);
				if (this.props.record === true) {
					mediaRecorder.stop();

				}
			};

			mediaRecorder.addEventListener('stop', function() {
				let downloadLink = URL.createObjectURL(new Blob(recordedChunks));
				console.log("Stopped");
				console.log(downloadLink);
			});

			mediaRecorder.start();

		})
	}
	render() {
		//Properties
		//Style

		//Template
		return (
			<Wrapper>

				{this.state.data}

				<ItemViewContainer>
					<RecItemView/>
				</ItemViewContainer>

				<TimeBarContainer>
					<RecTimteBar/>
				</TimeBarContainer>

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

export default connect(mapStateToProps, mapDispatchToProps)(Recording);
