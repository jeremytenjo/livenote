import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import AudioControls from './AudioControls';

//State
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
//Set global state to prop
function mapStateToProps(state) {
  return {TopBar_Title: state.TopBar_Title, audioSrc: state.AudioSrc}
}
class Edit extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      s: ''
    }
  }

  //Methods
  componentWillMount() {
    //redirect if nothing added
    if (this.props.TopBar_Title === 'Note') {
      // this.props.history.push(`/`);
    }
    // console.log(this.props.audioSrc);
  }
  render() {
    //Properties

    //Template
    return (
      <Wrapper>

        <OptionsContainer>
          <AudioControls audioSrc={this.props.audioSrc}/>
        </OptionsContainer>

      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `

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
export default connect(mapStateToProps, null)(withRouter(Edit));
