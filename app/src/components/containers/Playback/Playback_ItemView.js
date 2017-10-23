import React from 'react';
import styled from 'styled-components'
import firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';
import Transcript from './Transcript.js';
import {TweenMax} from "gsap";
import {withRouter} from 'react-router-dom'

import NoteItem from '../../global/NoteItem.js';
//State
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotePreview_Show, NotePreview_Set, Change_TopBar_Title, NotePreview_Hide} from '../../../state/actions/index';


//Set global state to prop
function mapStateToProps(state) {
  return {items: state.NewNote_Items, id: state.PlaybackSelection_ID, audioControl: state.AudioControl}
}
//define actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    NotePreview_Show,
    NotePreview_Set,
    Change_TopBar_Title,
    NotePreview_Hide
  }, dispatch)
}
class RecItemView extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      items: 'initial',
      list: [],
      loading: true,
      transcript: false,
      transcriptText: ''
    }
  }

  //Methods
  componentWillMount() {
    let id = window.location.pathname.substr(10)
    this.getItems(id);
  }
  componentWillUnmount() {
    this.props.NotePreview_Hide();
  }
  showPreview = (e) => {
    // console.log(e.currentTarget.dataset);
    this.props.NotePreview_Show();
    let data = {
      time: e.currentTarget.dataset.time,
      title: e.currentTarget.dataset.title,
      desc: e.currentTarget.dataset.desc,
      image: e.currentTarget.dataset.image
    }
    // console.log(data);
    this.props.NotePreview_Set(data);
  }
  getItems = (id) => {

    //get current transcript
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/masterNotes/' + id).once('value').then((snap) => {
      this.props.Change_TopBar_Title(snap.val().name);
      this.setState({transcriptText: snap.val().transcript});
    }).catch((err) => {
      this.props.history.push(`/`);
    });

    let list = {},
      array = [],
      userId = firebase.auth().currentUser.uid;

    firebase.database().ref('/users/' + userId + '/notes').orderByChild('masterNote_id').equalTo(id).once('value').then((snap) => {
      // firebase.database().ref('/users/' + userId + '/masterNotes/' + this.props.id).orderByValue().once('value').then((snap) => {
      let snapValue = snap.val();
      // console.log(snapValue);

      for (var prop in snapValue) {
        // console.log(snapValue[prop]);
        list.desc = snapValue[prop].comment;
        list.time = snapValue[prop].time;
        list.imageUrl = snapValue[prop].imageUrl;
        list.image = snapValue[prop].image || '';
        list.name = snapValue[prop].name;
        list.title = snapValue[prop].title;
        list.timeSeconds = snapValue[prop].timeSeconds;

        // console.log(list);
        array.push(list);
        list = {};
      }
      this.setState({list: array});
      this.setState({loading: false});

    });
  }

  setTime = (e) => {
    let audioControl = this.props.audioControl;
    audioControl.currentTime = e
  }
  toggleTranscript = () => {
    let Transcript = document.getElementById("Transcript")

    if (this.state.transcript === false) {
      //show
      TweenMax.to(Transcript, .2, {left: "0"});

      this.setState({transcript: true})

    } else {
      //hide
      TweenMax.to(Transcript, .2, {left: "100%"});

      this.setState({transcript: false})

    }
  }
  render() {
    //Properties
    let list = this.state.list.map((item, i) => {

      list = <Item key={i}>
        <ItemCon key={i} data-time={item.time} data-title={item.title} data-image={item.imageUrl} data-desc={item.desc} onClick={this.showPreview}>
          <NoteItem time={item.time} title={item.title} desc={item.desc} image={item.imageUrl}/>
        </ItemCon>
        <TimeCon data-timeseconds={item.timeSeconds} onClick={() => (this.setTime(item.timeSeconds))}></TimeCon>
      </Item>;

      return list

    });
    //Template
    return (this.state.loading === true
      ? <LoadingCon><CircularProgress size={80} thickness={5} color="#42EA9C"/>
          Loading...</LoadingCon>
      : <div style={{
        position: 'relative'
      }}>
        <TransIcon onClick={this.toggleTranscript}>t</TransIcon>
        <Transcript text={this.state.transcriptText}/>
        <Wrapper id="ItemViewCon">
          {list}
        </Wrapper>
      </div>);
  }

}

//Style
const ItemCon = styled.div `

 `;
const Wrapper = styled.div `
display: grid;
grid-row-gap: 10px;
`;
const Item = styled.span `
position: relative;
    width: 100%;
 `;
const TimeCon = styled.div `
width: 70px;
height: 100%;
position: absolute;
z-index: 2;
bottom: 0;
cursor: pointer;
 `;

const LoadingCon = styled.div `
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   margin: auto;
   width: 80px;
   height: 80px;
   `;
const TransIcon = styled.p `
   width: 20px;
    font-style: oblique;
        font-weight: bold;
       font-size: 28px;
       position: fixed;
     top: -24px;
       cursor: pointer;
       right: 40px;
       z-index: 5;
    `;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecItemView));
