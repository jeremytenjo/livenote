import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import Slider from 'material-ui/Slider'
import { withRouter } from 'react-router-dom'

//Images
import Pause_icon from '../../../images/icons/PauseCircle.svg'
import Play_icon from '../../../images/icons/PlayCircle.svg'
import Logo_icon from '../../../images/icons/Logo-192.png'
//State
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Set_Audio_Control } from '../../../state/actions/index'

//define actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      Set_Audio_Control
    },
    dispatch
  )
}
// Set global state to prop
function mapStateToProps(state) {
  return { noteID: state.PlaybackSelection_ID, TopBar_Title: state.TopBar_Title }
}

class PlaybackOptions extends React.Component {
  //initial state
  constructor(props) {
    super(props)
    this.state = {
      pauseToggle: false,
      playToggle: true,
      audioControl: '',
      sliderPos: 0,
      min: 0,
      minValue: 0,
      max: 10000
    }
    // this.initPlayback = this.initPlayback.bind(this);
  }

  //Methods
  componentWillMount() {
    let id = window.location.pathname.substr(10)
    this.initPlayback(id)
  }

  componentWillUnmount() {
    if (this.props.noteID !== '' && this.state.audioControl) {
      let audioControl = this.state.audioControl
      audioControl.pause()
    }
  }

  initPlayback = async (id) => {
    if (id === '') {
      this.props.history.push(`/`)
    } else {
      //Notification controls
      let MediaMetadata = window.MediaMetadata || function() {}

      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.props.TopBar_Title,
          artwork: [{ src: Logo_icon, sizes: '96x96' }]
        })
        navigator.mediaSession.setActionHandler('play', () => this.resume())
        navigator.mediaSession.setActionHandler('pause', () => this.pause())
      }

      const audioUrl = await firebase
        .storage()
        .ref(`audio/${id}`)
        .getDownloadURL()
      let audioControl = new Audio([audioUrl])

      this.props.Set_Audio_Control(audioControl)
      this.setState({ audioControl: audioControl })

      audioControl.onended = (e) => {
        this.setState({ playToggle: true, pauseToggle: false })
        audioControl.currentTime = 0
      }

      audioControl.onloadedmetadata = (e) => {
        if (audioControl.duration === Infinity) {
          let self = this

          audioControl.currentTime = 1e101
          audioControl.ontimeupdate = function() {
            this.ontimeupdate = () => {
              self.setState({ sliderPos: audioControl.currentTime, minValue: audioControl.currentTime })
              return
            }
            self.setState({ max: audioControl.duration })
            audioControl.currentTime = 0.1
          }
        } else {
          this.setState({ max: audioControl.duration })
        }
      }

      audioControl.ontimeupdate = (e) => {
        this.setState({ sliderPos: audioControl.currentTime, minValue: audioControl.currentTime })
      }
    }
  }
  handleSlider = (event, value) => {
    this.setState({ sliderPos: value })
    let audioControl = this.state.audioControl
    audioControl.currentTime = value
  }

  resume = () => {
    this.setState({ playToggle: false, pauseToggle: true })
    let audioControl = this.state.audioControl
    audioControl.play()
  }

  pause = () => {
    this.setState({ playToggle: true, pauseToggle: false })
    let audioControl = this.state.audioControl
    audioControl.pause()
  }
  getMinutes = () => Math.floor(this.state.sliderPos / 60)

  getSeconds = () => ('0' + (Math.floor(this.state.sliderPos) % 60)).slice(-2)

  getMinutesFinal = () => Math.floor(this.state.max / 60)

  getSecondsFinal = () => ('0' + (Math.floor(this.state.max) % 60)).slice(-2)

  render() {
    //Properties

    //Reactive Styles
    const PauseIcon = styled.img`
      width: 105px;
      display: ${(props) => (this.state.pauseToggle ? 'block' : 'none')};
      cursor: pointer;
      margin: 0 auto;
      margin-top: -18px;
      transform: translateX(6px);
    `
    const PlayIcon = styled.img`
      width: 105px;
      display: ${(props) => (this.state.playToggle ? 'block' : 'none')};
      cursor: pointer;
      margin: 0 auto;
      margin-top: -18px;
      transform: translateX(6px);
    `

    //Template
    return (
      <Wrapper>
        <TimeBar>
          <SliderCon>
            <Slider
              style={{
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
              value={this.state.sliderPos}
              onChange={this.handleSlider}
              min={this.state.min}
              max={this.state.max}
              step={1}
            />
          </SliderCon>
          <StartTime>
            {this.getMinutes()}:{this.getSeconds()}
          </StartTime>
          <EndTime>
            {this.getMinutesFinal()}:{this.getSecondsFinal()}
          </EndTime>
        </TimeBar>
        <OptionsCon>
          <PauseIcon onClick={this.pause} src={Pause_icon} />
          <PlayIcon onClick={this.resume} src={Play_icon} />
        </OptionsCon>
      </Wrapper>
    )
  }
}

//Style
const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 50px 70px;
  background: #0f2331;
`
const TimeBar = styled.div`
  position: relative;
`
const SliderCon = styled.div`
  ${'' /* background: green; */};
`
const OptionsCon = styled.div``
const StartTime = styled.p`
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  font-size: 14px;
  margin: 0;
  left: 10px;
`
const EndTime = styled.p`
  position: absolute;
  right: 0;
  top: 50px;
  bottom: 0;
  font-size: 14px;
  margin: 0;
  right: 10px;
`
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PlaybackOptions))
