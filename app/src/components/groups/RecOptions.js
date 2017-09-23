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
  Change_TopBar_Title,
  Show_Snackbar,
  Hide_Snackbar,
  Set_Snackbar_Name,
  Set_MasterNote_id,
  FolderSelection_ID,
  Toggle_Loading_Scrren,
  Set_Playback_Id
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
    FolderSelectionName: state.FolderSelection_Name,
    MasterNote_ID: state.MasterNote_ID,
    FolderSelection_ID_Name: state.FolderSelection_ID
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
    Hide_Snackbar,
    FolderSelection_Name,
    Change_TopBar_Title,
    Show_Snackbar,
    Set_Snackbar_Name,
    Set_MasterNote_id,
    FolderSelection_ID,
    Toggle_Loading_Scrren,
    Set_Playback_Id
  }, dispatch)
}

class RecOptions extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      theRecorder: '',
      theRecognition: '',
      recordedChunks: [],
      transcript: '',
      newMasterNoteKey: '',
      data: ''
    }
  }

  //Methods
  componentWillMount() {
    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then((stream) => this.recControl(stream)).catch((err) => {
      alert('Please enable your microphone to continue - error code: ' + err.name)
      this.props.history.push(`/`);
    });

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
  recControl = (stream) => {

    var recorder = new MediaRecorder(stream);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;

    if (SpeechRecognition === null) {
      alert('Speech Recognition not Supported, Please try Chrome.');
    }

    let recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.start();

    //hadnle transcript
    recognition.onresult = (event) => {
      // console.log(event.results);
      this.setState({transcript: event.results})
    }

    this.setState({theRecorder: recorder});
    this.setState({theRecognition: recognition});

    //start recording
    recorder.start()

    recorder.ondataavailable = (e) => {
      let newData = this.state.recordedChunks.slice();
      newData.push(e.data);
      this.setState({recordedChunks: newData})

    }

    recorder.onstop = (e) => {
      this.props.Toggle_Loading_Scrren('true');

      this.setState({data: this.props.data});
      //stop recognition
      this.state.theRecognition.stop();

      //handle transcript
      let transcript = this.state.transcript;
      let partialTranscript = [];
      if (transcript) {
        for (var prop in transcript) {
          if (transcript.hasOwnProperty(prop)) {
            partialTranscript.push(transcript[prop][0].transcript);
          }
        }
      }
      let finalTranscript = partialTranscript.join(" ");
      this.setState({transcript: finalTranscript});
      // console.log(this.state.transcript);

      //Handle display
      // this.props.Stop_Toggle(true);
      // this.props.Play_Toggle(true);
      // this.props.Pause_Toggle(false);

      //Stop Timer
      clearInterval(this.incrementer);

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
      let currentDateSort = "" + d.getFullYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getMilliseconds();
      let currentDateString = '' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();

      //default folder name
      let folderName,
        folderID;

      if (this.props.FolderSelectionName === "SELECT FOLDER" && this.props.FolderSelection_ID_Name === '') {
        folderName = 'Root';
        folderID = 'Root';
      } else {
        folderName = this.props.FolderSelectionName;
        folderID = this.props.FolderSelection_ID_Name;
      }

      //upload master note
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}/masterNotes`).push({
        name: this.props.noteName,
        folderName: folderName,
        folderID: folderID,
        dateAddedSort: currentDateSort,
        dateAdded: currentDateString,
        transcript: this.state.transcript,
        backImg: 'none'
      }).then((snap) => {
        const key = snap.key
        this.setState({newMasterNoteKey: key})

        //upload audio file to firease
        let blob = new Blob(this.state.recordedChunks, {'type': 'audio/ogg; codecs=opus'});
        this.setState({recordedChunks: []})
        let storageRef = firebase.storage().ref();
        let ref = storageRef.child('audio/' + key);
        ref.put(blob).then((snapshot) => {

          //upload sub notes
          let flag = true;
          this.state.data.map((d) => {
            //upload image
            let storageRef = firebase.storage().ref();
            let mountainsRef = storageRef.child('images/' + key + d.title);

            if (d.image !== '') {

              mountainsRef.putString(d.image, 'data_url').then((snapshot) => {
                // console.log(snapshot.metadata.downloadURLs[0]);

                //upload backround image if true
                if (flag === true) {
                  firebase.database().ref(`users/${firebase.auth().currentUser.uid}/masterNotes/${this.state.newMasterNoteKey}`).update({backImg: snapshot.metadata.downloadURLs[0]});
                  flag = false
                }

                firebase.database().ref(`users/${firebase.auth().currentUser.uid}/notes`).push({
                  masterNote_id: key,
                  name: this.props.noteName,
                  title: d.title,
                  comment: d.desc,
                  imageUrl: snapshot.metadata.downloadURLs[0],
                  time: d.time,
                  timeSeconds: d.timeSeconds
                });
              });

            } else {

              firebase.database().ref(`users/${firebase.auth().currentUser.uid}/notes`).push({
                masterNote_id: key,
                name: this.props.noteName,
                title: d.title,
                comment: d.desc,
                imageUrl: 'none',
                time: d.time,
                timeSeconds: d.timeSeconds

              });
            }

            return ''
          });

        }).then(() => {
	        //Wait until note finihes uploading

	        //Reset Top Bar Title
	        this.props.Change_TopBar_Title('Notes');

	        //Reset Folder Selected
	        this.props.FolderSelection_Name('SELECT FOLDER');

	        //Reset Folder ID
	        this.props.FolderSelection_ID('');

	        //Reset Timer
	        this.props.Start_Time(0);

	        //reset notes
	        this.props.Reset_Items();

	        //Remove loading screen
	        this.props.Toggle_Loading_Scrren('false');

	        //confimration aniamtion
	        this.props.Set_Snackbar_Name('Note Added');
	        this.props.Hide_Snackbar();
	        this.props.Show_Snackbar();

	        //redirect to Playback
          this.props.history.push(`/`);

	      });
      })
    }

  }
  showNote = () => {
    //set current time
    this.props.Set_Current_Time(this.props.recTime);
    this.props.Toggle_NewNote('show');
  }
  stop = () => this.state.theRecorder.stop();

  play = () => {
    //Handle display
    this.props.Stop_Toggle(false);
    this.props.Play_Toggle(false);
    this.props.Pause_Toggle(false);

    //resume audio Recording
    this.state.theRecorder.resume();

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

    //pause audio Recording
    this.state.theRecorder.pause();

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
