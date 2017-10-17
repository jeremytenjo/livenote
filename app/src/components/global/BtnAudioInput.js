import React from 'react';
import styled from 'styled-components'
import uploadIcon from '../../images/icons/upload.svg';
import Button from './Button.js';
import {withRouter} from 'react-router-dom'

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Set_local_Note_Name, Change_TopBar_Title} from '../../state/actions/index';

//define actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Set_local_Note_Name,
    Change_TopBar_Title
  }, dispatch)
}
//Set global state to prop

class BtnAudioInput extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      location: props.location,
      open: false,
      name: ''
    }
  }

  //Methods
  audioSelected = (e) => {
    var audio = document.querySelector('#audio-input');
    var file = e.target.files[0]
    var reader = new FileReader();
    reader.onload = () => {
      audio.src = reader.result;
      this.setState({open: true});
    }

    if (file) {
      reader.readAsDataURL(file);
    }

    if (this.state.location === 'directory') {} else if (this.state.location === 'folder') {}
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({open: false});
    this.props.Change_TopBar_Title(this.state.name)
    this.props.Set_local_Note_Name(this.state.name)
    this.props.history.push(`/edit`);

  }

  cancel = (e) => {
    this.setState({open: false});
    e.preventDefault();
    document.getElementById("audio-input").value = "";
  };

  handleChange = (e) => {
    this.setState({name: e.target.value});
  };

  render() {
    //Properties
    let inputStyle = {
      width: '80%',
      display: 'block',
      margin: 'auto',
      height: '30px',
      fontSize: '16px',
      borderColor: 'transparent',
      borderWidth: '0px'
    }
    //Template
    return (
      <Wrapper>
        <IconCon>
          <label htmlFor="audio-input">
            <UploadIcon src={uploadIcon} alt="upload icon"/>
          </label>
          <input id="audio-input" type="file" accept="audio/*" onChange={this.audioSelected}/>
        </IconCon>

        <Dialog onSubmit={this.submit} open={this.state.open}>
          <InnerDialog>
            <SubTitle>Name Note</SubTitle>
            <input autoFocus maxLength="11" style={inputStyle} type="text" placeholder="Type here..." onChange={this.handleChange}/>

            <ButtonCon>
              <span onClick={this.cancel}>
                <Button text="Cancel" color="#9E9E9E"/>
              </span>
              <span >
                <Button type="submit" text="Create" color="#44F6A3"/>
              </span>
            </ButtonCon>
          </InnerDialog>
        </Dialog>

      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `

         `;
const IconCon = styled.div `
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

const Dialog = styled.form `
          display: ${props => props.open
  ? 'block'
  : 'none'};
        position: fixed;
        background: rgba(0, 0, 0, 0.73);
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 20;
        `;

const InnerDialog = styled.div `
        	border-radius: 2px;
        position: absolute;
        background: white;
        height: 220px;
        max-width: 600px;
        width: 75%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        display: grid;
        grid-template-rows: 50px 50px 50px;
        grid-row-gap: 24px;
         `;

const SubTitle = styled.h2 `
         	color: #0F2331;
         width: 80%;
         display: block;
         margin: auto;
         margin-top: 20px;
         font-size: 20px;
         line-height: 32px;
         font-weight: 400;
          `;

const ButtonCon = styled.div `
          	display: grid;
          	grid-template-columns: 1fr 1fr;
          	`;

export default connect(null, mapDispatchToProps)(withRouter(BtnAudioInput));
