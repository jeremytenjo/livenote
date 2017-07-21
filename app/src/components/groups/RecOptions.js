import React from 'react';
import styled from 'styled-components'
import Note_icon from '../../images/icons/Note.svg';
import Camera_icon from '../../images/icons/Camara.svg';
import Stop_icon from '../../images/icons/Stop.svg';
import Pause_icon from '../../images/icons/Pause.svg';

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

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
		console.log("HERE!");
	}
	render() {
		//Properties

		//Template
		return (
			<Wrapper>
				<Left><Icon onClick={this.showNote} src={Note_icon} alt="Note icon"/></Left>
				<Center>
					<Top>0:00</Top>
					<Bottom>
						<BottomIconCon>
							<CenterIcon src={Stop_icon} alt="Stop icon"/>
							<CenterIcon src={Pause_icon} alt="Pause icon"/>
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
const CenterIcon = styled.img `
width: 40px;
	 `;
const FileInput = styled.input `
display: none;
	  `;

//export default connect(mapStateToProps, mapDispatchToProps)(RecOptions);
export default RecOptions
