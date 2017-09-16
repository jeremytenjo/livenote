import React from 'react';
import styled from 'styled-components'
import RecItemView from '../components/groups/RecItemView.js';
// import RecTimteBar from '../components/groups/RecTimteBar.js';
import RecOptions from '../components/groups/RecOptions.js';
import NewNote from '../components/groups/NewNote.js';
import NewNoteImage from '../components/groups/NewNote_Image.js';
import NotePreview from '../components/groups/NotePreview.js';
import LoadingScreen from '../components/LoadingScreen.js';

class Recording extends React.Component {

  //Methods
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

        {/* <TimeBarContainer>
					<RecTimteBar/>
				</TimeBarContainer> */}

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

export default Recording;
