import React from 'react';
import styled from 'styled-components'
//State
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
//Set global state to prop
function mapStateToProps(state) {
  return {snackbarName: state.SnackBar_Message}
}
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
      <Wrapper id="MySnackBar">
        <p>{this.props.snackbarName}</p>
      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `
background: rgba(66,66,66 , .9);
height: 50px;
width: 300px;
position: fixed;
bottom: -50px;
left: 0;
right: 0;
margin: auto;
border-radius: 50px;
color: white;
text-align: center;
box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
p {
  font-weight: 400;
}
        `;
export default connect(mapStateToProps, null)(SnackBar);
