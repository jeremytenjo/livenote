import React from 'react';
import styled from 'styled-components'
import Pause_icon from '../../images/icons/Pause.svg';
import Play_icon from '../../images/icons/Play.svg';
import firebase from 'firebase';

//State
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
// Set global state to prop
function mapStateToProps(state) {
	return {noteID: state.PlaybackSelection_ID}
}
class PlaybackOptions extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			pauseToggle: true,
			playToggle: false,
			audioControl: ''
		}
		this.initPlayback = this.initPlayback.bind(this);
	}

	//Methods
	componentWillMount() {
		// this.initPlayback(this.props.noteID);
	}

	async initPlayback(id) {
		const audio = await firebase.storage().ref(`audio/${id}`).getDownloadURL();

		let audioControl = new Audio([audio]);
		this.setState({audioControl: audioControl});

		audioControl.play()

	}

	resume = () => {
		this.setState({playToggle: false, pauseToggle: true});
		let audioControl = this.state.audioControl;
		audioControl.play()

	}

	pause = () => {
		this.setState({playToggle: true, pauseToggle: false});
		let audioControl = this.state.audioControl;
		audioControl.pause()
	}
	render() {
		//Properties

		//Reactive Styles
		const PauseIcon = styled.img `
		width: 40px;
		display: ${props => this.state.pauseToggle
			? 'block'
			: 'none'};
			cursor: pointer;
			margin: 0 auto;

		`;
		const PlayIcon = styled.img `
		width: 40px;
		display: ${props => this.state.playToggle
			? 'block'
			: 'none'};
			cursor: pointer;
			margin: 0 auto;

		`;

		//Template
		return (
			<Wrapper>
				<TimeBar>

					<StartTime>0:00</StartTime>
					<EndTime>3:00</EndTime>
				</TimeBar>
				<OptionsCon>
					<PauseIcon onClick={this.pause} src={Pause_icon}/>
					<PlayIcon onClick={this.resume} src={Play_icon}/>
				</OptionsCon>
			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
	display: grid;
	grid-template-rows: 50px 50px;
`;
const TimeBar = styled.div `
position: relative;
 `;
const OptionsCon = styled.div `

 `;
const StartTime = styled.p `
position: absolute;
left: 0;
bottom: 0;
font-size: 16px;
margin: 0;
 `;
const EndTime = styled.p `
position: absolute;
right: 0;
bottom: 0;
font-size: 16px;
margin: 0;
 `;
export default connect(mapStateToProps)(PlaybackOptions);
