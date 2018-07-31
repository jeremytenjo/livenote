import React from 'react'
import styled from 'styled-components'
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
// import Snackbar from 'material-ui/Snackbar';
import Snackbar2 from '../global/SnackBar'

//State
import { connect } from 'react-redux'

//Set global state to prop
function mapStateToProps(state) {
  return { title: state.TopBar_Title, snackbarToggle: state.SnackBar_Toggle, snackbarName: state.SnackBar_Message }
}
//define actions

const Record = Loadable({
  loader: () => import('./Record/Record.js'),
  loading: () => null
})
const Directory = Loadable({
  loader: () => import('./Directory/Directory.js'),
  loading: () => null
})
const Recording = Loadable({
  loader: () => import('./Recording/Recording.js'),
  loading: () => null
})

const Playback = Loadable({
  loader: () => import('./Playback/Playback.js'),
  loading: () => null
})
const Folder = Loadable({
  loader: () => import('./Folder/Folder.js'),
  loading: () => null
})
const Edit = Loadable({
  loader: () => import('./Edit'),
  loading: () => null
})

class Home extends React.Component {
  //initial state
  constructor(props) {
    super(props)
    this.state = {
      data: 'initial'
    }
  }

  //Methods
  new = () => {
    this.props.history.push(`/record`)
  }
  toHome = () => {
    //redirect to Directory
    // this.props.history.push(`/`);
  }
  render() {
    //Properties

    //Template
    return (
      <div>
        <HomeContainer>
          <TopBar id="TopBarMain">
            <TitlePage>{this.props.title}</TitlePage>
            <google-cast-launcher id="cast-button" />
          </TopBar>
          <BrowserRouter>
            <Content>
              <Switch>
                <Route exact path="/" component={Directory} />
                <Route exact path="/record" component={Record} />
                <Route exact path="/recording" component={Recording} />
                <Route exact path="/playback" component={Playback} />
                <Route exact path="/playback/:id" component={Playback} />
                <Route exact path="/folder" component={Folder} />
                <Route exact path="/folder/:id" component={Folder} />
                <Route exact path="/edit/" component={Edit} />
              </Switch>
            </Content>
          </BrowserRouter>
        </HomeContainer>

        <Snackbar2 />
      </div>
    )
  }
}

//Style
const HomeContainer = styled.div``
const TopBar = styled.div`
  max-width: 600px;
  position: fixed;
  height: 25px;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 10px;
  background: #0f2331;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 5;
`
const Content = styled.div`
  overflow-x: hidden;
  margin-top: 46px;
  padding: 10px;
  box-sizing: border-box;
`
const TitlePage = styled.p`
  font-size: 20px;
  font-weight: bold;
  outline: none;
  margin: 0;
  float: left;
`

export default connect(mapStateToProps)(withRouter(Home))
