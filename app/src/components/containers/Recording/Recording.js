import React from 'react';
import styled from 'styled-components'
import RecItemView from './RecItemView.js';
// import RecTimteBar from './RecTimteBar.js';
import RecOptions from './RecOptions.js';
import NewNote from './NewNote.js';
import NewNoteImage from './NewNote_Image.js';
import NotePreview from '../../global/NotePreview.js';
import LoadingScreen from '../../global/LoadingScreen.js';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {title: state.TopBar_Title}
}
class Recording extends React.Component {

  //Methods
  componentWillMount() {
    if (this.props.title === 'Directory') {
      this.props.history.push(`/`);
    }
  }

  componentWillUnmount() {

    //remove refresh listner
    window.onbeforeunload = function() {}
  }
  render() {

    //add refresh listner
    window.onbeforeunload = function() {
      return "Refreshing will remove your active note";
    };

    //Template
    return (
      <Wrapper>

        <ItemViewContainer>
          <RecItemView/>
        </ItemViewContainer>

        <OptionsContainer>
          <RecOptions/>
        </OptionsContainer>

        <NewNote/>
        <NewNoteImage/>
        <NotePreview/>
        <LoadingScreen title="Uploading Note..."/>

      </Wrapper>
    );
  }

}

//Styles
const Wrapper = styled.div `
	max-width: 600px;
	margin: auto;
	padding: 10px;

 `;
const ItemViewContainer = styled.div `
margin-bottom: 105px;
overflow-x: hidden;
 `;
// const TimeBarContainer = styled.div `
// `;
const OptionsContainer = styled.div `
 background: #0F2331;
position: fixed;
bottom: 0;
height: 104px;
max-width: 600px;
width: 100%;
left: 0;
right: 0;
margin: auto;
	 `;

export default connect(mapStateToProps)(withRouter(Recording))
