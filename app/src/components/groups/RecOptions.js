import React from 'react';
import styled from 'styled-components'
import Note_icon from '../../images/icons/Note.svg';
import Camera_icon from '../../images/icons/Camara.svg';
import Stop_icon from '../../images/icons/Stop.svg';
import Pause_icon from '../../images/icons/Pause.svg';
import Play_icon from '../../images/icons/Play.svg';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
	Toggle_NewNote,
	Toggle_NewNote_Image,
	Stop_Toggle,
	Play_Toggle,
	Pause_Toggle,
	Start_Time,
	Set_Current_Time,
	Reset_Items
} from '../../state/actions/index';

//Set global state to prop
function mapStateToProps(state) {
	return {recTime: state.RecTime, stopStatus: state.Stop_Toggle, playStatus: state.Play_Toggle, pauseStatus: state.Pause_Toggle}
}
//define actions
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Toggle_NewNote,
		Toggle_NewNote_Image,
		Stop_Toggle,
		Play_Toggle,
		Pause_Toggle,
		Start_Time,
		Set_Current_Time,
		Reset_Items

	}, dispatch)
}

class RecOptions extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			sd: '0'
		}
	}

	//Methods
	componentWillMount() {
		//Start Timer
		let number = 0;
		this.incrementer = setInterval(() => {
			number++;
			this.props.Start_Time(number);
		}, 1000)
	}
	componentWillUnmount() {
		//Stop Timer
		clearInterval(this.incrementer);
		this.props.Stop_Toggle(false);
		this.props.Play_Toggle(false);
		this.props.Pause_Toggle(false);

		//Reset Timer
		this.props.Start_Time(0);

	}
	showNote = () => {
		//set current time
		this.props.Set_Current_Time(this.props.recTime);
		this.props.Toggle_NewNote('show');
	}
	stop = () => {
		//Handle display
		this.props.Stop_Toggle(true);
		this.props.Play_Toggle(true);
		this.props.Pause_Toggle(false);

		//Stop Timer
		clearInterval(this.incrementer);

		//Reset Timer
		this.props.Start_Time(0);

		//reset notes
		this.props.Reset_Items();
	}
	play = () => {
		//Handle display
		this.props.Stop_Toggle(false);
		this.props.Play_Toggle(false);
		this.props.Pause_Toggle(false);

		//Resume Timer
		let number = this.props.recTime;
		this.incrementer = setInterval(() => {
			number++;
			this.props.Start_Time(number);
		}, 1000)
	}
	pause = () => {
		//Handle display
		this.props.Play_Toggle(true);
		this.props.Pause_Toggle(true);
		this.props.Stop_Toggle(false);

		//Pause Timer
		clearInterval(this.incrementer);

	}
	imageSelected = (event) => {
		//Preview image
		if (event.target.value !== '') {
			this.props.Toggle_NewNote_Image('show');

			var preview = document.querySelector('#PreviewImage');
			var file = event.target.files[0]
			var reader = new FileReader();

			reader.addEventListener("load", function() {
				preview.src = reader.result;
			}, false);

			if (file) {
				reader.readAsDataURL(file);
			}

			//Upload to fireabse temporarily
		}
		event.target.value = '';
	}

	getMinutes = () => Math.floor(this.props.recTime / 60);

	getSeconds = () => ('0' + this.props.recTime % 60).slice(-2);

	render() {
		//Properties

		//Reactive Styles
		const StopIcon = styled.img `
		display: ${props => this.props.stopStatus === false
			? 'block'
			: 'none'};
		 width: 40px;
		 cursor: pointer;
		 	 `;
		const PlayIcon = styled.img `
		display: ${props => this.props.playStatus === false
			? 'none'
			: 'block'};
			  width: 40px;
			  cursor: pointer;
			  `;
		const PauseIcon = styled.img `
		display: ${props => this.props.pauseStatus === false
			? 'block'
			: 'none'};
				 width: 40px;
				 cursor: pointer;
				 `;
		//Template
		return (
			<Wrapper>
				<Left><Icon onClick={this.showNote} src={Note_icon} alt="Note icon"/></Left>
				<Center>
					<Top>{this.getMinutes()}:{this.getSeconds()}</Top>
					<Bottom>
						<BottomIconCon>
							<StopIcon onClick={this.stop} src={Stop_icon} alt="Stop icon"/>
							<PlayIcon onClick={this.play} src={Play_icon} alt="Play icon"/>
							<PauseIcon onClick={this.pause} src={Pause_icon} alt="Pause icon"/>

						</BottomIconCon>
					</Bottom>
				</Center>
				<Right>
					{/* <Icon src={Camera_icon} alt="Camara Icon"/> */}
					<label htmlFor="file-input">
						<Icon src={Camera_icon}/>
					</label>
					<FileInput id="file-input" type="file" accept="image/*" onChange={this.imageSelected}/>
				</Right>

			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
display: grid;
height: 100%;
grid-template-columns: 100px 1fr 100px;
 `;
const Left = styled.div `
  `;
const Center = styled.div `
display: grid;
grid-template-rows:  .8fr 1fr;
  `;
const Right = styled.div `
  `;
const Top = styled.div `
text-align: center;
padding: 10px;
font-size: 20px;
	 `;
const Bottom = styled.div `
${ ''/* background: white; */}

	 `;
const Icon = styled.img `
	margin: 15px;

 `;
const BottomIconCon = styled.div `
	max-width: 100px;
	margin:  0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 20px;
  `;

const FileInput = styled.input `
display: none;
	  `;

export default connect(mapStateToProps, mapDispatchToProps)(RecOptions);
