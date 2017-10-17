import React from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

//State
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//define actions
//Set global state to prop
function mapStateToProps(state) {
  return {TopBar_Title: state.TopBar_Title}
}
class Edit extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      data: 'initial'
    }
  }

  //Methods
  componentWillMount() {
    if (this.props.TopBar_Title === 'Note') {
      this.props.history.push(`/`);
    }

  }
  render() {
    //Properties

    //Template
    return (
      <Wrapper></Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `

        `;
export default connect(mapStateToProps, null)(withRouter(Edit));
