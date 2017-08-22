import React from 'react';
import styled from 'styled-components'
import Pause_icon from '../../images/icons/Pause.svg';
import Play_icon from '../../images/icons/PlayWhite.svg';
import firebase from 'firebase';
import Slider from 'material-ui/Slider';
import {withRouter} from 'react-router-dom'

//State
import {connect} from 'react-redux';

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
			pauseToggle: false,
			playToggle: true,
			audioControl: '',
			sliderPos: 0,
			min: 0,
			minValue: 0,
			max: 10000
		}
		this.initPlayback = this.initPlayback.bind(this);
	}

	//Methods
	componentWillMount() {
		this.initPlayback(this.props.noteID);
	}
	componentWillUnmount() {
		if (this.props.noteID !== '') {
			let audioControl = this.state.audioControl;
			audioControl.pause();
		}

	}

	async initPlayback(id) {
		if (id === '') {
			this.props.history.push(`/`);
		} else {
			const audioUrl = await firebase.storage().ref(`audio/${id}`).getDownloadURL();
				let audioControl = new Audio([audioUrl]);
				this.setState({audioControl: audioControl});

				audioControl.onended = (e) => {
					this.setState({playToggle: true, pauseToggle: false});
					audioControl.currentTime = 0;
				}

				audioControl.onloadedmetadata = (e) => {
					if (audioControl.duration === Infinity) {
						let self = this;

						audioControl.currentTime = 1e101;
						audioControl.ontimeupdate = function() {
							this.ontimeupdate = () => {
								self.setState({sliderPos: audioControl.currentTime, minValue: audioControl.currentTime});
								return;
							}
							audioControl.currentTime = 1;
							// alert(audioControl.duration)
							self.setState({max: audioControl.duration});

						}
					}
				}

		}

	}
	handleSlider = (event, value) => {
		this.setState({sliderPos: value});
		let audioControl = this.state.audioControl;
		audioControl.currentTime = value;
	};

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
	getMinutes = () => Math.floor(this.state.sliderPos / 60);

	getSeconds = () => ('0' + Math.floor(this.state.sliderPos) % 60).slice(-2);

	getMinutesFinal = () => Math.floor(this.state.max / 60);

	getSecondsFinal = () => ('0' + Math.floor(this.state.max) % 60).slice(-2);

	render() {
		//Properties

		//Reactive Styles
		const PauseIcon = styled.img `
		width: 35px;
		display: ${props => this.state.pauseToggle
			? 'block'
			: 'none'};
			cursor: pointer;
			margin: 0 auto;
			margin-top: 15px;

		`;
		const PlayIcon = styled.img `
		width: 35px;
		display: ${props => this.state.playToggle
			? 'block'
			: 'none'};
			cursor: pointer;
			margin: 0 auto;
			margin-top: 15px;

		`;

		//Template
		return (
			<Wrapper>
				<TimeBar>
					<SliderCon>
						<Slider style={{
							paddingLeft: '10px',
							paddingRight: '10px'
						}} value={this.state.sliderPos} onChange={this.handleSlider} min={this.state.min} max={this.state.max} step={1}/>
					</SliderCon>
					<StartTime>{this.getMinutes()}:{this.getSeconds()}</StartTime>
					<EndTime>{this.getMinutesFinal()}:{this.getSecondsFinal()}</EndTime>
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
	grid-template-rows: 50px 70px;
	background: #0F2331;
`;
const TimeBar = styled.div `
position: relative;

 `;
const SliderCon = styled.div `
   ${ ''/* background: green; */}
  `;
const OptionsCon = styled.div `

 `;
const StartTime = styled.p `
position: absolute;
left: 0;
top: 50px;
bottom: 0;
font-size: 16px;
margin: 0;
left: 10px;
 `;
const EndTime = styled.p `
position: absolute;
right: 0;
top: 50px;
bottom: 0;
font-size: 16px;
margin: 0;
right: 10px
 `;
export default connect(mapStateToProps)(withRouter(PlaybackOptions));
