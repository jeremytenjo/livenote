import React from 'react';
import styled from 'styled-components'
import RecItemView from '../components/groups/Playback_ItemView.js';
import OptionsWhite from '../images/icons/OptionsWhite.svg';
import PlaybackOptions from '../components/groups/Playback_Options.js';
import NotePreview from '../components/groups/NotePreview.js';

//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Hide_Snackbar} from '../state/actions/index';

//define actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Hide_Snackbar
  }, dispatch)
}

class Playback extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      data: 'initial',
      open: false
    }
  }

  //Methods
  componentWillMount() {
    this.props.Hide_Snackbar();
  }

  handleTouchTap = (event) => {
    if (this.state.open === false) {
      this.setState({open: true});

    } else {
      this.setState({open: false});

    }
  };

  close = () => {
    this.setState({open: false});
  };
  render() {
    //Properties
    //Reactive Styles

    //Template
    return (
      <Wrapper>

        <span onClick={this.handleTouchTap}>
          <OptionsIcon src={OptionsWhite}/>
        </span>

        <PopupCon state={this.state.open}>
          <li onClick={this.close}>Rename</li>
          <li onClick={this.close}>Delete</li>
        </PopupCon>

        <ItemViewContainer>
          <RecItemView/>
        </ItemViewContainer>

        <OptionsContainer>
          <PlaybackOptions/>
        </OptionsContainer>

        <NotePreview/>
      </Wrapper>
    );
  }

}

//Styles
const PopupCon = styled.ul `
	display: ${props => props.state === true
  ? 'block'
  : 'none'};
background: white;
color: black;
position: fixed;
top:30px;
right: 13px;
z-index: 2;
padding: 0;
border-radius: 2px;
 box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

li {
  padding: 15px;
	text-decoration: none;
	list-style: none;
cursor: pointer;
&:hover {
background-color: #E0E0E0;
}
}
 `;
const OptionsIcon = styled.img `
width: 20px;
position: absolute;
z-index: 2;
right: 5px;
top: 11px;
cursor: pointer;

 `;
const Wrapper = styled.div `
	max-width: 600px;
	margin: 0 auto;
	padding: 10px;

 `;
const ItemViewContainer = styled.div `
${ ''/* margin-top: 50px; */}
margin-bottom: 100px;
overflow-x: hidden;
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

export default connect(null, mapDispatchToProps)(Playback);
