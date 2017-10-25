import React from 'react';
import styled from 'styled-components'
import File from '../../global/File_link.js';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {Set_Playback_Id, Change_TopBar_Title, Fetch_Recent_Flag, Set_RecentNotes} from '../../../state/actions/index';

// import CircularProgress from 'material-ui/CircularProgress';
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Set_Playback_Id,
    Change_TopBar_Title,
    Fetch_Recent_Flag,
    Set_RecentNotes
  }, dispatch)
}
function mapStateToProps(state) {
  return {notes: state.RecentNotes, flag: state.FetchRecentFlag, RecentNotes: state.RecentNotes}
}
class Recent extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: true,
      loadingMessage: 'Loading recent files...',
      imageUrl: ''
    }
  }

  //Methods
  componentWillMount() {
    if (this.props.flag === false) {
      this.getDataOnline()
    } else {
      this.getDataLocal()
    }
  }

  getDataLocal = () => {
    var recent = JSON.parse(localStorage.getItem("recent"))
    this.setState({list: recent});
    this.setState({loading: false});
  }

  getDataOnline = () => {
    let userId = firebase.auth().currentUser.uid;
    let array = [];

    return firebase.database().ref('/users/' + userId + '/masterNotes').orderByChild('dateAddedSort').limitToLast(5).once('value').then((snap) => {
      let list = {},
        snapValue = snap.val();
      // console.log(snapValue);

      for (var prop in snapValue) {
        // console.log(snapValue[prop]);
        list.id = prop;
        list.backImg = snapValue[prop].backImg;
        list.dateAdded = snapValue[prop].dateAdded;
        list.dateAddedSort = snapValue[prop].dateAddedSort;
        list.folderID = snapValue[prop].folderID;
        list.folderName = snapValue[prop].folderName;
        list.name = snapValue[prop].name;

        // console.log(list);
        array.push(list);
        array.reverse();
        list = {};
      }
      // console.log(array);
      localStorage.setItem('recent', JSON.stringify(array));

      this.props.Set_RecentNotes(array);

      // this.setState({list: array});
      this.setState({loading: false});
      this.props.Fetch_Recent_Flag(true);


    });

  }

  openPlayback = (e, n) => {
    // console.log(e);

    this.props.Change_TopBar_Title(n);
    this.props.Set_Playback_Id(e);
    this.props.history.push(`/playback/${e}`);
  }

  render() {
    //Properties
    let list = this.props.RecentNotes.map((item, i) => <span key={item.id} onClick={() => this.openPlayback(item.id, item.name)} style={{
      cursor: 'pointer'
    }}><File width="140px" title={item.name} backImg={item.backImg}/></span>);

    //Template
    return (
      <div style={{
        position: 'relative'
      }}>
        <Title>Recent</Title>
        <Container>
          {list}
        </Container>
        <LoadingCon state={this.state.loading}>
          <Text>{this.state.loadingMessage}</Text>
        </LoadingCon>
      </div>
    );
  }

}

//Style
const Title = styled.p `
  margin-top: 5px;
  		 `;
const Container = styled.div `
  overflow-x: scroll;
  overflow-y: hidden;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
  white-space: nowrap;
  height: 120px;
   `;
const LoadingCon = styled.div `
  	display: ${props => props.state
  ? 'block'
  : 'none'};
  	 position: absolute;
  	 left: 0;
  	 right: 0;
  	 bottom: 0;
  	 margin: auto;
  	 width: 100%;
  	 height: 110px;
  	 `;
const Text = styled.p `
  text-align: center;
  	  `;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recent));
