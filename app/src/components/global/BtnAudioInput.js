import React from 'react';
import styled from 'styled-components'
import uploadIcon from '../../images/icons/upload.svg';

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
//Set global state to prop

class BtnAudioInput extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      location: props.location
    }
  }

  //Methods
    audioSelected = () => {
     console.log(this.state.location);
    }
  render() {
    //Properties

    //Template
    return (
      <Wrapper>
          <label htmlFor="file-input">
            <UploadIcon src={uploadIcon} alt="upload icon"/>
          </label>
          <input id="file-input" type="file" accept="audio/*" onChange={this.audioSelected}/>
      </Wrapper>
    );
  }

}

//Style
 const Wrapper = styled.div `
  width: 20px;
  position: fixed;
  z-index: 3;
  right: 10px;
  top: 11px;
  cursor: pointer;
  > input {
   display: none;
 }
         `;
const UploadIcon = styled.img `
         width: 20px;
         `;
//export default connect(mapStateToProps, mapDispatchToProps)(BtnAudioInput);
export default BtnAudioInput
