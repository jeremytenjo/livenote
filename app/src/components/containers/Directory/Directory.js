import React from 'react';
import styled from 'styled-components'
import Recent from './Recent.js';
import Folders from './Folders.js';
import Notes from './Notes.js';
import FloatingButton from '../../global/FloatButton.js';
import uploadIcon from '../../../images/icons/upload.svg';
import {withRouter} from 'react-router-dom'
// import firebase from 'firebase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Set_RecentNotes, Change_TopBar_Title, Hide_Snackbar, folderSelection} from '../../../state/actions/index';

function mapStateToProps(state) {
  return {status: state.RecentNotes}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Set_RecentNotes,
    Change_TopBar_Title,
    Hide_Snackbar,
    folderSelection
  }, dispatch)
}
class Directory extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      data: 'initial'
    }
  }

  //Methods
  componentWillMount() {

    //check if features are available
    if (window.MediaRecorder === null) {
      alert('Sorry, Audio recording and Voice recognition are not supported in your device')
    }

    this.props.Change_TopBar_Title('Directory');
    this.props.folderSelection(false);
  }
  openRecord = () => {
    this.props.history.push(`/record`);
  }

  render() {
    //Properties

    //Style
    const FloatingButtonCon = styled.span `
position: fixed;
bottom: 20px;
right: 0;
`;
    //Template
    return (
      <div>
        <ImgCon>
          <label htmlFor="file-input">
            <UploadIcon src={uploadIcon} alt="upload icon"/>
          </label>
          <input id="file-input" type="file"/>
        </ImgCon>
        <Recent/>
        <Folders/>
        <Notes/>
        <FloatingButtonCon onClick={this.openRecord}>
          <FloatingButton/>
        </FloatingButtonCon>
      </div>
    );
  }

}

const ImgCon = styled.div `
 width: 20px;
     position: fixed;
     z-index: 3;
     right: 15px;
     top: 11px;
     cursor: pointer;
     > input {
       display: none;
     }
 `;
const UploadIcon = styled.img `
 width: 20px;
 `;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Directory));
