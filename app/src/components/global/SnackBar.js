import React from 'react';
import styled from 'styled-components'

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
//Set global state to prop

class SnackBar extends React.Component {

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
      <Wrapper>dd</Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `
background: rgba(97,97,97, .9);
height: 50px;
width: 300px;
position: fixed;
bottom: 20px;
left: 0;
right: 0;
margin: auto;
border-radius: 20px;
color: white;
text-align: center;
        `;
//export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
export default SnackBar
