import React from 'react';
import styled from 'styled-components'
import Options_img from '../images/icons/Options.svg';
import miniNote from '../images/icons/miniNote.svg';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux';

import {
  Toggle_OptinsMenuShow,
  Set_Delete_File_ID,
  Set_Delete_File_Name,
  Set_File_Link_Id,
  Set_File_Link_Name,
  Set_Playback_Id,
  Toggle_OptinsMenuShowFile,
  Change_TopBar_Title
} from '../state/actions/index';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Toggle_OptinsMenuShow,
    Set_Delete_File_ID,
    Set_Delete_File_Name,
    Set_File_Link_Id,
    Set_File_Link_Name,
    Set_Playback_Id,
    Toggle_OptinsMenuShowFile,
    Change_TopBar_Title
  }, dispatch)
}
class Folder_Link extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      id: props.id
    }
  }

  //Methods
  showOptions = () => {
    //set ref id
    this.props.Set_Delete_File_ID(this.state.id);
    this.props.Set_Delete_File_Name(this.state.name);
    this.props.Toggle_OptinsMenuShowFile()
  }
  redirect = () => {
    this.props.Set_File_Link_Name(this.state.name);
    this.props.Set_File_Link_Id(this.state.id);
    this.props.Change_TopBar_Title(this.state.name);
    this.props.Set_Playback_Id(this.state.id);
    this.props.history.push(`/playback`);
  }
  render() {
    //Properties

    //Template
    return (
      <Wrapper >
        <Sub onClick={this.redirect}>
          {/* <Img src={Folder_img} alt="foler icon"/> */}
          <Svg src={miniNote}>
            {/* <rect style={{
              fill: '#0F2331',
              width: '18px',
              height: '18px'
            }}/> */}

          </Svg>
          <Title>{this.state.name}</Title>
        </Sub>
        <Img onClick={this.showOptions} src={Options_img} alt="options icon"/>
      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `
display: grid;
grid-template-columns: 1fr  .1fr;
background: white;
height: 40px;
border-radius: 2px;
cursor: pointer;
`;
const Sub = styled.div `
height: 40px;

`;
const Img = styled.img `
height: 18px;
padding: 10px;
`;
const Svg = styled.img `
margin-left: -3px;
width: 35px;
height: 18px;
padding: 10px;
border-radius: 12px;
`;
const Title = styled.p `
margin: 0;
margin-top: -31px;
margin-left: 40px;
color: #0F2331;
`;

export default connect(null, mapDispatchToProps)(withRouter(Folder_Link));
