import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import AudioControls from './AudioControls';
import ItemView from './ItemView';
import NewNoteImage from './NewNote_Image';
import NewNote from './NewNote';
import NotePreview from '../../global/NotePreview.js';
import LoadingScreen from '../../global/LoadingScreen.js';
import firebase from 'firebase';
import ImageCompressor from '@xkeshi/image-compressor';
import dataURLtoBlob from 'dataurl-to-blob';
import {TweenMax} from 'gsap';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Toggle_Loading_Scrren,
  Change_TopBar_Title,
  Reset_Items,
  Set_Snackbar_Name,
  Hide_Snackbar,
  Show_Snackbar,
  Fetch_Recent_Flag,
  Fetch_Folders_Flag,
  Fetch_Notes_Flag
} from '../../../state/actions/index';

//define actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Toggle_Loading_Scrren,
    Change_TopBar_Title,
    Reset_Items,
    Set_Snackbar_Name,
    Hide_Snackbar,
    Show_Snackbar,
    Fetch_Recent_Flag,
    Fetch_Folders_Flag,
    Fetch_Notes_Flag
  }, dispatch)
}
//Set global state to prop
function mapStateToProps(state) {
  return {TopBar_Title: state.TopBar_Title, audioSrc: state.AudioSrc, noteItems: state.NewNote_Items}
}
class Edit extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      s: ''
    }
  }

  //Methods
  componentWillMount() {
    //redirect if nothing added
    if (this.props.audioSrc === '') {
      this.props.history.push(`/`);
    }
    // console.log(this.props.audioSrc);
  }
  componentWillUnmount() {
    this.props.Toggle_Loading_Scrren('false');
    this.props.Reset_Items();

  }

  saveNote = async() => {
    // console.log(this.props.noteItems);
    this.props.Toggle_Loading_Scrren('true');
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
    let folderName = 'Root',
      folderID = 'Root'

    //upload master note
    // alert(this.state.transcript);
    let MasterNote = await firebase.database().ref(`users/${firebase.auth().currentUser.uid}/masterNotes`).push({
      name: this.props.TopBar_Title,
      folderName: folderName,
      folderID: folderID,
      dateAddedSort: currentDateSort,
      dateAdded: currentDateString,
      backImg: 'none'
    })

    // console.log(MasterNote.key);
    this.setState({newMasterNoteKey: MasterNote.key})

    //upload audio file to firease
    // console.log(this.props.audioSrc);
    let storageRef = firebase.storage().ref()
    let ref = storageRef.child('audio/' + MasterNote.key)
    ref.putString(this.props.audioSrc, 'data_url')
    // console.log(audioRef);

    //upload sub notes
    let flag = true;

    this.props.noteItems.map((d) => {
      //upload image
      let storageRef = firebase.storage().ref();
      let mountainsRef = storageRef.child('images/' + MasterNote.key + d.title);

      if (d.image !== '') {
        // console.log(d.image);

        //compress image file

        //comvert data utl tpo blob
        let newBlob = dataURLtoBlob(d.image)
        // console.log(newBlob);

        //compress blob
        new ImageCompressor(newBlob, {
          quality: .6,
          success(compressedImage) {
            uploadCompressed(compressedImage)
          }
        });

        //upload compressed image
        let uploadCompressed = (compressedImage) => {
          // console.log(compressedImage);
          mountainsRef.put(compressedImage).then((snapshot) => {
            // console.log(snapshot.metadata.downloadURLs[0]);

            //upload backround image if true
            if (flag === true) {
              firebase.database().ref(`users/${firebase.auth().currentUser.uid}/masterNotes/${this.state.newMasterNoteKey}`).update({backImg: snapshot.metadata.downloadURLs[0]});
              flag = false
            }

            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/notes`).push({
              masterNote_id: MasterNote.key,
              name: this.props.TopBar_Title,
              title: d.title,
              comment: d.desc,
              imageUrl: snapshot.metadata.downloadURLs[0],
              time: d.time,
              timeSeconds: d.timeSeconds
            });
          });
        }
      } else {

        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/notes`).push({
          masterNote_id: MasterNote.key,
          name: this.props.TopBar_Title,
          title: d.title,
          comment: d.desc,
          imageUrl: 'none',
          time: d.time,
          timeSeconds: d.timeSeconds

        });
      }
      return ''
    })

    //Wait until note finihes uploading
    //reset notes
    this.props.Reset_Items();

    //set to load fetch online
    this.props.Fetch_Recent_Flag(false)
    this.props.Fetch_Folders_Flag(false)
    this.props.Fetch_Notes_Flag(false)

    //Remove loading screen
    this.props.Toggle_Loading_Scrren('false');

    //confimration aniamtion
    this.props.Set_Snackbar_Name(this.props.TopBar_Title + ' Uploaded');
    let SnackBar = document.querySelector('#MySnackBar')
    TweenMax.to(SnackBar, .5, {
      delay: .5,
      bottom: "50px"
    });
    TweenMax.to(SnackBar, .5, {
      delay: 2,
      bottom: "-50px"
    });

    //Reset Top Bar Title
    this.props.Change_TopBar_Title('Directory');

    //redirect to Directory
    this.props.history.push(`/`);

  }

  render() {
    //Properties

    //Template
    return (
      <Wrapper>

        <ItemViewContainer>
          <ItemView/>
        </ItemViewContainer>

        <Save onClick={this.saveNote}>Save</Save>
        <OptionsContainer>
          <AudioControls audioSrc={this.props.audioSrc}/>
        </OptionsContainer>

        <NewNote/>
        <NewNoteImage/>
        <NotePreview/>
        <LoadingScreen title={`Uploading ${this.props.TopBar_Title}`}/>
      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `

        `;
const Save = styled.p `
color: lightgrey;
position: fixed;
top: 15px;
right: 10px;
z-index: 10;
margin: 0;
cursor: pointer;
&:active  {
  color: #69f0ae;
}
 `;
const OptionsContainer = styled.div `
        max-width: 600px;
         margin: 0 auto;
         padding: 0;
         position: fixed;
         bottom: 0;
         left: 0;
         right: 0;
         width: 100%;
         height: 130px;
         z-index: 3;
         box-shadow: 0px -7px 15px -5px rgba(0,0,0,0.42);

        	 `;
const ItemViewContainer = styled.div `
           margin-bottom: 105px;
           overflow-x: hidden;
            `;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit));
