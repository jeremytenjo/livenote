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
import {Toggle_NewNote, Stop_Toggle, Play_Toggle, Pause_Toggle} from '../../state/actions/index';

//Set global state to prop
function mapStateToProps(state) {
	return {stopStatus: state.Stop_Toggle, playStatus: state.Play_Toggle, pauseStatus: state.Pause_Toggle}
}
//define actions
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		Toggle_NewNote,
		Stop_Toggle,
		Play_Toggle,
		Pause_Toggle
	}, dispatch)
}

class RecOptions extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods
	showNote = () => {
		this.props.Toggle_NewNote('show');
	}
	stop = () => {
		this.props.Stop_Toggle(true);
		this.props.Play_Toggle(true);
		this.props.Pause_Toggle(false);
	}
	play = () => {
		this.props.Stop_Toggle(false);
		this.props.Play_Toggle(false);
		this.props.Pause_Toggle(false);
	}
	pause = () => {
		this.props.Play_Toggle(true);
		this.props.Pause_Toggle(true);
		this.props.Stop_Toggle(false);
	}
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
					<Top>0:00</Top>
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
					<FileInput id="file-input" type="file" accept="image/*"/>
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