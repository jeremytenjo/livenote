import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import Note_icon from '../../images/icons/Note.svg';
import Camera_icon from '../../images/icons/Camara.svg';
import Stop_icon from '../../images/icons/Stop.svg';
import Pause_icon from '../../images/icons/Pause.svg';
import Play_icon from '../../images/icons/Play.svg';
import firebase from 'firebase';

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
	Reset_Items,
	FolderSelection_Name,
	Change_TopBar_Title
} from '../../state/actions/index';

//Set global state to prop
function mapStateToProps(state) {
	return {
		data: state.NewNote_Items,
		recTime: state.RecTime,
		stopStatus: state.Stop_Toggle,
		playStatus: state.Play_Toggle,
		pauseStatus: state.Pause_Toggle,
		noteName: state.Note_Name,
		FolderSelectionName: state.FolderSelection_Name
	}
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
		Reset_Items,
		FolderSelection_Name,
		Change_TopBar_Title

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

		//get date
		let d = new Date();
		let months = [
			'Jan',
			'Feb',
			'March',
			'Apr',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let currentDateSort = "" + d.getFullYear() + d.getMonth() + d.getDate();
		let currentDateString = '' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();

		//upload items
		// console.log(firebase.auth());
		this.props.data.map((d) => {
			//upload image
			// console.log(this.props.noteName);
			// Create a root reference
			let storageRef = firebase.storage().ref();
			let mountainsRef = storageRef.child(d.title + 'Title');

			if (d.image !== '') {
				mountainsRef.putString(d.image, 'data_url').then((snapshot) => {
					// console.log(snapshot.metadata.downloadURLs[0]);
					//write to database
					firebase.database().ref(`users/${firebase.auth().currentUser.uid}/notes`).push({
						name: this.props.noteName,
						title: d.title,
						comment: d.desc,
						folderName: this.props.FolderSelectionName,
						imageUrl: snapshot.metadata.downloadURLs[0],
						dateAddedSort: currentDateSort,
						dateAdded: currentDateString
					});
				});
			} else {
				firebase.database().ref(`users/${firebase.auth().currentUser.uid}/notes`).push({
					name: this.props.noteName,
					title: d.title,
					comment: d.desc,
					folderName: this.props.FolderSelectionName,
					imageUrl: 'none',
					dateAddedSort: currentDateSort,
					dateAdded: currentDateString
				});
			}

			return ''
		});

		//Reset Top Bar Title
		this.props.Change_TopBar_Title('Notes');

		//Reset Folder Selected
		this.props.FolderSelection_Name('SELECT FOLDER');

		//confimration aniamtion

		//redirect to Directory
		this.props.history.push(`/`);
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
			//set current time
			this.props.Set_Current_Time(this.props.recTime);
			this.props.Toggle_NewNote_Image('show');

			var preview = document.querySelector('#PreviewImage');
			var file = event.target.files[0]
			var reader = new FileReader();

			reader.addEventListener("load", () => {
				preview.src = reader.result;
			}, false);

			if (file) {
				reader.readAsDataURL(file);
			}

		}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecOptions));
