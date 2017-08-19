import React from 'react';
import styled from 'styled-components'
import Pause_icon from '../../images/icons/Pause.svg';
import Play_icon from '../../images/icons/PlayWhite.svg';
import firebase from 'firebase';
import Slider from 'material-ui/Slider';

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
			audioControl: '',
			sliderPos: 20,
			min: 0,
			max: 100
		}
		this.initPlayback = this.initPlayback.bind(this);
	}

	//Methods
	componentWillMount() {
		this.initPlayback(this.props.noteID);
	}

	async initPlayback(id) {

		id = '-KrrzP5bU_jGvuv5OLFc';
		const audioUrl = await firebase.storage().ref(`audio/${id}`).getDownloadURL();

		let audioControl = new Audio([audioUrl]);
		this.setState({audioControl: audioControl});

		audioControl.play()


		console.log(audioControl.currentTime);

	}
	handleSlider = (event, value) => {
		this.setState({sliderPos: value});
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
	grid-template-rows: 50px 70px;
`;
const TimeBar = styled.div `
position: relative;
bottom: 23px;
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
export default connect(mapStateToProps)(PlaybackOptions);
