import React from 'react';
import styled from 'styled-components'

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
//Set global state to prop

class Transcript extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      data: 'initial'
    }
  }

  //Methods

  render() {
    //Properties

    //Template
    return (
      <Wrapper>
        Transcript
      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `
background-color: white;
width: 100%;
height: auto;
position: fixed;
top: 45px;
left: 0;
bottom: 120px;
z-index: 2;
        `;
//export default connect(mapStateToProps, mapDispatchToProps)(Transcript);
export default Transcript
