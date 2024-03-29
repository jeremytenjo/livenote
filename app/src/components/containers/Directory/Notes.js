import React from 'react';
// import File from '../File_link.js';
import File from '../../global/File_link_2.js';
import firebase from 'firebase';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Set_Playback_Id,
  Toggle_OptinsMenuHideFile,
  Show_Snackbar,
  Set_Snackbar_Name,
  Hide_Snackbar,
  Fetch_Notes_Flag,
  Set_RecentNotes
} from '../../../state/actions/index';
import styled, {keyframes} from 'styled-components'
import Rename_img from '../../../images/icons/rename.svg';
import Remove_img from '../../../images/icons/rubbish-bin.svg';
import Close_Icon from '../../../images/icons/close.svg';
import Button from '../../global/Button.js';
import {TweenMax} from 'gsap';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Set_Playback_Id,
    Toggle_OptinsMenuHideFile,
    Show_Snackbar,
    Hide_Snackbar,
    Set_Snackbar_Name,
    Fetch_Notes_Flag,
    Set_RecentNotes
  }, dispatch)
}

function mapStateToProps(state) {
  return {options: state.OtionsMenu_ToggleFile, fileID: state.File_Delete_ID, folderName: state.FileSelection_Rename, flag: state.FetchNotesFlag}
}
class Notes extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      renameInput: false,
      open: false,
      loading: true,
      loadingMessage: 'Loading notes...',
      messageColor: '',
      marginTop: '0px'
    }
  }

  //Methods
  componentWillMount() {

    if (this.props.flag === false) {
      this.getDataOnline()
    } else {
      this.getDataLocal()
    }

  }

  getDataLocal = () => {
    var recent = JSON.parse(localStorage.getItem("notes"))
    this.setState({list: recent});
    this.setState({loading: false});
  }

  getDataOnline = () => {
    let userId = firebase.auth().currentUser.uid;
    let array = [];

    return firebase.database().ref('/users/' + userId + '/masterNotes').orderByChild('folderID').equalTo('Root').once('value').then((snap) => {
      let list = {},
        snapValue = snap.val();
      // console.log(snapValue);

      for (var prop in snapValue) {
        // console.log(snapValue[prop]);
        list.id = prop;
        list.dateAdded = snapValue[prop].dateAdded;
        list.dateAddedSort = snapValue[prop].dateAddedSort;
        list.folderID = snapValue[prop].folderID;
        list.folderName = snapValue[prop].folderName;
        list.name = snapValue[prop].name;

        // console.log(list);
        array.push(list);
        list = {};
      }
      localStorage.setItem('notes', JSON.stringify(array));

      this.setState({list: array});
      this.setState({loading: false});

      this.props.Fetch_Notes_Flag(true);

    });
  }

  handleCloseRename = (e) => {
    this.setState({renameInput: false});
    // this.setState({title: ''});
    e.preventDefault();

  };
  hideOptions = () => {
    this.props.Toggle_OptinsMenuHideFile();
  }

  removeFile = () => {
    //remove images from notes
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/notes').orderByChild('masterNote_id').equalTo(this.props.fileID).once('value').then((snap) => {
      let snapValue = snap.val();
      // console.log(snapValue);
      for (var prop in snapValue) {
        if (snapValue.hasOwnProperty(prop)) {
          firebase.storage().ref('images/' + this.props.fileID + snapValue[prop].title).delete();
        }
      }
    });

    //remove notes in mastern notes
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/notes').orderByChild('masterNote_id').equalTo(this.props.fileID).once('value').then((snap) => {
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
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/masterNotes/${this.props.fileID}`).remove();

    //remove master note recording
    // console.log(this.props.fileID);
    firebase.storage().ref(`audio/${this.props.fileID}`).delete();
    this.props.Set_Snackbar_Name('Note Removed');

    this.getDataOnline();
    this.props.Toggle_OptinsMenuHideFile();
    let SnackBar = document.querySelector('#MySnackBar')
    TweenMax.to(SnackBar, .5, {
      delay: .5,
      bottom: "50px"
    });
    TweenMax.to(SnackBar, .5, {
      delay: 2,
      bottom: "-50px"
    });
    // this.props.Hide_Snackbar();
    // this.props.Show_Snackbar();

    //refresh Recent List
    let userId = firebase.auth().currentUser.uid;
    let array = [];

    return firebase.database().ref('/users/' + userId + '/masterNotes').orderByChild('dateAddedSort').limitToLast(5).once('value').then((snap) => {
      let list = {},
        snapValue = snap.val();
      // console.log(snapValue);

      for (var prop in snapValue) {
        // console.log(snapValue[prop]);
        list.id = prop;
        list.backImg = snapValue[prop].backImg;
        list.dateAdded = snapValue[prop].dateAdded;
        list.dateAddedSort = snapValue[prop].dateAddedSort;
        list.folderID = snapValue[prop].folderID;
        list.folderName = snapValue[prop].folderName;
        list.name = snapValue[prop].name;

        // console.log(list);
        array.push(list);
        array.reverse();
        list = {};
      }
      // console.log(array);
      localStorage.setItem('recent', JSON.stringify(array));
      this.props.Set_RecentNotes(array)
      this.setState({loading: false});

    });
  }

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

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/masterNotes/${this.props.fileID}`).update({name: this.inputRename.value});
    // this.setState({title: ''});
    this.props.Set_Snackbar_Name('Note Renamed');
    let SnackBar = document.querySelector('#MySnackBar')
    TweenMax.to(SnackBar, .5, {
      delay: .5,
      bottom: "50px"
    });
    TweenMax.to(SnackBar, .5, {
      delay: 2,
      bottom: "-50px"
    });
    // this.props.Hide_Snackbar();
    // this.props.Show_Snackbar();

    this.getDataOnline();

  }
  render() {
    //Properties
    let list = this.state.list.map((item, i) => <span key={item.id}><File key={item.id} id={item.id} width="auto" name={item.name}/></span>);

    //Style
    const Wrapper = styled.div `
			position: relative;
		margin-top: 15px;
padding-bottom: 90px;
min-height: 150px;
	  `;
    const Title = styled.p `
	 margin-top: 5px;
	  `;
    const Container = styled.div `
	 display: grid;
	 grid-template-columns: 1fr 1fr;
	 grid-column-gap: 5px;
	 grid-row-gap: 5px;
	 `;
    const Dialog = styled.form `
	 	display: ${props => this.state.open
      ? 'block'
      : 'none'};
	 position: fixed;
	 background: rgba(0, 0, 0, 0.73);
	 height: 100%;
	 width: 100%;
	 top: 0;
	 left: 0;
	 z-index: 20;
	 `;
    const DialogRename = styled.form `
	 	display: ${props => this.state.renameInput
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
    let inputStyle = {
      width: '100%',
      margin: 'auto',
      height: '30px',
      fontSize: '16px',
      borderColor: 'transparent',
      borderWidth: '0px',
      overflow: 'hidden'
    }
    const OptionsMenuWrapper = styled.form `
	 display: ${props => this.props.options
      ? 'block'
      : 'none'};
	 position: fixed;
	 background: rgba(0, 0, 0, 0.73);
	 height: 100%;
	 width: 100%;
	 top: 0;
	 left: 0;
	 z-index: 20;
	 `;

    const rotate360 = keyframes `
			from {
				bottom: -150px;
			}

			to {
				bottom: 0;
			}
		 `;
    const OptionsMenuInner = styled.div `
	 position: fixed;
	 background: white;
	 height: 150px;
	 width: 100%;
	 max-width: 600px;
	 left: 0;
	 right: 0;
	 margin: auto;
	 bottom: 0;
		 animation: ${rotate360} .1s linear;
		 display: grid;
		 grid-template-rows: 50px 250px;

		`;
    const OptionsMenuTop = styled.div `
		position: fixed;
		background: rgba(0, 0, 0, 0.73);
		 bottom: 150px;
		 height: 100%;
		 width: 100%;
		 max-width: 600px;
		 left: 0;
		 right: 0;
		 margin: auto;
		`;
    const OtopnsWrapper = styled.div `
margin-top: 40px;
		 `;
    const OptionsItemCon = styled.div `
display: grid;
grid-template-columns: 50px 1fr;
color: #0F2331;
		 `;
    const OptionsItem = styled.img `
width: 20px;
padding: 15px;
			`;

    const CloseIcon = styled.img `
			width: 20px;
			position: absolute;
			right: 10px;
			top: 10px;
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
			 grid-row-gap: 10px;
       padding:20px;
       box-sizing: border-box;

			  `;

    const SubTitle = styled.h2 `
			 	color: #0F2331;
			 width: 100%;
			 display: block;
			 margin: auto;
			 margin-top: 20px;
			 font-size: 20px;
			 line-height: 32px;
			 font-weight: 400;
			  `;

    const ButtonCon = styled.div `
			 	display: grid;
			 	grid-template-columns: 1fr 1fr;
			 	`;

    const LoadingCon = styled.div `
			 	display: ${props => this.state.loading
      ? 'block'
      : 'none'};
			 	 position: absolute;
			 	 left: 0;
			 	 right: 0;
			 	 top: 0;
			 	 margin: auto;
			 	 width: 100%;
			 	 height: 110px;
			 	 `;
    const Text = styled.p `
			 text-align: center;
			color:  ${props => this.state.messageColor};
			margin-top: ${props => this.state.marginTop};
			 	`;

    //Template
    return (<Wrapper>
      <Title>Notes</Title>
      <Container>
        {list}
      </Container>
      <Dialog onSubmit={this.submit}>
        <InnerDialog>
          <SubTitle>Name file</SubTitle>
          <input autoFocus="autoFocus" maxLength="11" style={inputStyle} type="text" placeholder="Type here..." ref={(input) => this.input = input}/>

          <ButtonCon>
            <span onClick={this.handleClose}>
              <Button text="Cancel" color="#9E9E9E"/>
            </span>
            <span >
              <Button type="submit" text="Create" color="#44F6A3"/>
            </span>
          </ButtonCon>
        </InnerDialog>
      </Dialog>
      <OptionsMenuWrapper>
        <OptionsMenuTop onClick={this.hideOptions}/>
        <OptionsMenuInner>
          <CloseIcon onClick={this.hideOptions} src={Close_Icon} alt="close Icon"/>
          <OtopnsWrapper>

            <OptionsItemCon onClick={this.renameFile}>
              <OptionsItem src={Rename_img} alt="rename Icon"/>
              <p>Rename</p>
            </OptionsItemCon>
            <OptionsItemCon onClick={this.removeFile}>
              <OptionsItem src={Remove_img} alt="rename Icon"/>
              <p>Remove</p>
            </OptionsItemCon>

          </OtopnsWrapper>

        </OptionsMenuInner>
      </OptionsMenuWrapper>
      <DialogRename onSubmit={this.submitnewName}>
        <InnerDialog>
          <SubTitle>Rename file</SubTitle>
          <input autoFocus="autoFocus" maxLength="11" style={inputStyle} type="text" defaultValue={this.props.folderName} placeholder="Type here..." ref={(input) => this.inputRename = input}/>

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
      <LoadingCon>
        <Text>{this.state.loadingMessage}</Text>
      </LoadingCon>
    </Wrapper>);
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Notes));
