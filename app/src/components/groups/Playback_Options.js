import React from 'react';
import styled from 'styled-components'
import Pause_icon from '../../images/icons/Pause.svg';
import Play_icon from '../../images/icons/Play.svg';

//State
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
// Set global state to prop
function mapStateToProps(state) {
  return {status: state.reducerName}
 }
class PlaybackOptions extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			pauseToggle: true,
			playToggle: false
		}
	}

	//Methods
	componentWillMount() {

	}

	resume = () => {
		this.setState({playToggle: false, pauseToggle: true});
	}

	pause = () => {
		this.setState({playToggle: true, pauseToggle: false});
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
		`;
		const PlayIcon = styled.img `
		width: 40px;
		display: ${props => this.state.playToggle
			? 'block'
			: 'none'};
			cursor: pointer;
		`;
		//Template
		return (
			<Wrapper>
				<PauseIcon onClick={this.pause} src={Pause_icon}/>
				<PlayIcon onClick={this.resume} src={Play_icon}/>
			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
 width: 40px;
 display: block;
 margin: 0 auto;
        `;

export default connect(mapStateToProps)(PlaybackOptions);
