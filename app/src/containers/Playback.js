import React from 'react';
import styled from 'styled-components'
import RecItemView from '../components/groups/Playback_ItemView.js';
import OptionsWhite from '../images/icons/OptionsWhite.svg';
import PlaybackOptions from '../components/groups/Playback_Options.js';
import NotePreview from '../components/groups/NotePreview.js';
import {withRouter} from 'react-router-dom'
import Button from '../components/Button.js';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Hide_Snackbar, Show_Snackbar, Set_Snackbar_Name, Change_TopBar_Title, Toggle_OptinsMenuHideFile} from '../state/actions/index';
import firebase from 'firebase';

//define actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Hide_Snackbar,
    Show_Snackbar,
    Set_Snackbar_Name,
    Change_TopBar_Title,
    Toggle_OptinsMenuHideFile
  }, dispatch)
}

function mapStateToProps(state) {
  return {projectId: state.PlaybackSelection_ID, TopBar_Title: state.TopBar_Title}
}
class Playback extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      data: 'initial',
      open: false,
      renameInput: false

    }
  }

  //Methods
  componentWillMount() {

    if (this.props.TopBar_Title === 'Directory') {
      this.props.history.push(`/`)

    }

    this.props.Hide_Snackbar();
  }

  handleTouchTap = (event) => {
    if (this.state.open === false) {
      this.setState({open: true});

    } else {
      this.setState({open: false});

    }
  };

  //Rename
  handleCloseRename = (e) => {
    this.setState({renameInput: false});
    // this.setState({title: ''});
    e.preventDefault();

  };

  renameFile = () => {
    //show rename input
    this.props.Toggle_OptinsMenuHideFile();
    this.setState({renameInput: true});

  }

  submitnewName = (e) => {
    // console.log(this.inputRename.value);
    e.preventDefault();
    // console.log(this.props.folderID);
    this.setState({renameInput: false});
    this.props.Toggle_OptinsMenuHideFile();

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/masterNotes/${this.props.projectId}`).update({name: this.inputRename.value});

    this.props.Change_TopBar_Title(this.inputRename.value);
    this.props.Set_Snackbar_Name('Note Renamed');
    this.props.Show_Snackbar();
    this.props.Hide_Snackbar();

  }

  rename = () => {
    this.setState({open: false});

    //show rename input
    this.props.Toggle_OptinsMenuHideFile();
    this.setState({renameInput: true});
  };

  //Delete
  delete = () => {
    // console.log(this.props.projectId);
    //remove images from notes
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/notes').orderByChild('masterNote_id').equalTo(this.props.projectId).once('value').then((snap) => {
      let snapValue = snap.val();
      // console.log(snapValue);
      for (var prop in snapValue) {
        if (snapValue.hasOwnProperty(prop)) {
          firebase.storage().ref('images/' + this.props.projectId + snapValue[prop].title).delete();
        }
      }
    });

    //remove notes in mastern notes
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/notes').orderByChild('masterNote_id').equalTo(this.props.projectId).once('value').then((snap) => {
      let res = snap.val();
      for (var prop in res) {
        if (res.hasOwnProperty(prop)) {
          // console.log(prop);
          firebase.database().ref(`users/${firebase.auth().currentUser.uid}/notes/${prop}`).remove();
        }
      }
    });

    //remove note
    // console.log(this.props.folderID);
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/masterNotes/${this.props.projectId}`).remove();

    //remove master note recording
    firebase.storage().ref(`audio/${this.props.projectId}`).delete();
    this.setState({open: false})

    this.props.Set_Snackbar_Name('Note Removed')
    this.props.Hide_Snackbar();
    this.props.Show_Snackbar()
    this.props.history.push(`/`)

  };
  render() {
    //Properties
    //Reactive Styles

    //Template
    return (
      <Wrapper>

        <span onClick={this.handleTouchTap}>
          <OptionsIcon src={OptionsWhite}/>
        </span>

        <PopupCon state={this.state.open}>
          <li onClick={this.rename}>Rename</li>
          <li onClick={this.delete}>Remove</li>
        </PopupCon>

        <DialogRename onSubmit={this.submitnewName} state={this.state.renameInput}>
          <InnerDialog>
            <SubTitle>Rename file</SubTitle>
            <input autoFocus maxLength="11" style={inputStyle} type="text" defaultValue={this.props.TopBar_Title} placeholder="Type here..." ref={(input) => this.inputRename = input}/>

            <ButtonCon>
              <span onClick={this.handleCloseRename}>
                <Button text="Cancel" color="#9E9E9E"/>
              </span>
              <span >
                <Button type="submit" text="Rename" color="#44F6A3"/>
              </span>
            </ButtonCon>
          </InnerDialog>
        </DialogRename>

        <ItemViewContainer>
          <RecItemView/>
        </ItemViewContainer>

        <OptionsContainer>
          <PlaybackOptions/>
        </OptionsContainer>

        <NotePreview/>
        <TransIcon>t</TransIcon>
      </Wrapper>
    );
  }

}

//Styles
const TransIcon = styled.p `
 font-style: oblique;
     font-weight: bold;
    font-size: 33px;
    position: fixed;
  top: -33px;
    z-index: 2;
    cursor: pointer;
    right: 40px;
 `;
const PopupCon = styled.ul `
	display: ${props => props.state === true
  ? 'block'
  : 'none'};
background: white;
color: black;
position: fixed;
top:30px;
right: 13px;
z-index: 2;
padding: 0;
border-radius: 2px;
 box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

li {
  padding: 15px;
	text-decoration: none;
	list-style: none;
cursor: pointer;
&:hover {
background-color: #E0E0E0;
}
}
 `;
const OptionsIcon = styled.img `
width: 20px;
position: fixed;
z-index: 2;
right: 5px;
top: 11px;
cursor: pointer;

 `;
const Wrapper = styled.div `
	max-width: 600px;
	margin: 0 auto;
	${ ''/* padding: 10px; */}

 `;
const ItemViewContainer = styled.div `
${ ''/* margin-top: 50px; */}
margin-bottom: 110px;
${ ''/* overflow-x: hidden; */}
 `;

const OptionsContainer = styled.div `
max-width: 600px;
${ ''/* border: 3px solid red; */}
 margin: 0 auto;
 padding: 0;
 position: fixed;
 bottom: 0;
 left: 0;
 right: 0;
 width: 100%;
 height: 120px;
	 `;
const DialogRename = styled.form `
 	display: ${props => props.state
  ? 'block'
  : 'none'};
  position: fixed;
  background: rgba(0, 0, 0, 0.73);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 40;
  `;

const InnerDialog = styled.div `
			border-radius: 2px;
		 position: absolute;
		 background: white;
		 height: 220px;
		 max-width: 600px;
		 width: 75%;
		 left: 0;
		 right: 0;
		 top: 0;
		 bottom: 0;
		 margin: auto;
		 display: grid;
		 grid-template-rows: 50px 50px 50px;
		 grid-row-gap: 24px;
			`;

const SubTitle = styled.h2 `
			color: #0F2331;
		 width: 80%;
		 display: block;
		 margin: auto;
		 margin-top: 20px;
		 font-size: 20px;
		 line-height: 32px;
		 font-weight: 400;
			`;

let inputStyle = {
  width: '80%',
  display: 'block',
  margin: 'auto',
  height: '30px',
  fontSize: '16px',
  borderColor: 'transparent',
  borderWidth: '0px'
}

const ButtonCon = styled.div `
		display: grid;
		grid-template-columns: 1fr 1fr;
		`;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Playback));
