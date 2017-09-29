import React from 'react';
import styled from 'styled-components'

//State
//import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
//Set global state to prop

class Transcript extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      text: props.text
    }
  }

  //Methods

  render() {
    //Properties

    //Template
    return (
      <Wrapper id="Transcript">
        <Title>Transcript</Title>
        <Text>{this.state.text}</Text>
      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `
background-color: white;
width: 95%;
height: auto;
position: fixed;
top: 45px;
left: 100%;
right: 0;
bottom: 120px;
z-index: 2;
max-width: 600px;
margin: 0 auto;
border-radius: 2px;
`;

const Title = styled.h3 `
text-align: center;
margin-top: 5px;
color: #0F2331;
         `;
const Text = styled.textarea `
 color: #0F2331;
padding: 10px;
height: calc(100% - 69px);
width: calc(100% - 22px);
border-color: transparent;
 `;
// export default connect(mapStateToProps)(Transcript);
export default Transcript;
