import React from 'react';
import styled from 'styled-components'
// import SampleImg from '../images/sample.jpg';

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

class NoteItem extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      time: props.time,
      title: props.title,
      desc: props.desc,
      image: props.image
    }
  }

  //Methods


  render() {
    //Properties

    let noTitleNoDesc = false
    if (this.state.title === '' && this.state.desc === '') {
      noTitleNoDesc = true
    }
    let yesTitleNoDesc = false
    if (this.state.title !== '' && this.state.desc === '') {
      yesTitleNoDesc = true
    }

    //Template
    return (
      <Wrapper stateIMG={this.state.image} noTitleNoDesc={noTitleNoDesc}>

        <ItemTime state={this.state.time}>
          <span>{this.state.time}</span>
        </ItemTime>

        <ItemDescCon noTitleNoDesc={noTitleNoDesc}>

          <ItemTitle state={this.state.title} stateDesc={this.state.desc}>
            {this.state.title}
          </ItemTitle>

          <ItemDesc state={this.state.desc}>
            {this.state.desc}
          </ItemDesc>


        </ItemDescCon>

        <span style={{
          position: 'relative'
        }}>
          <ItemImg state={this.state.image} noTitleNoDesc={noTitleNoDesc} yesTitleNoDesc={yesTitleNoDesc} src={this.state.image} alt="note image"/>
        </span>

      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `
				background: white;
				border-radius: 2px;
				height: ${props => props.stateIMG === 'none'
  ? 'auto'
  : '130px'};
				display: grid;
				grid-template-columns: 70px 1fr 90px;
				grid-template-columns: ${props => props.noTitleNoDesc
    ? '70px 1fr'
    : '70px 1fr 90px'};
				grid-template-columns: ${props => props.stateIMG === 'none'
    ? '70px 1fr'
    : '70px 1fr 90px'};
        cursor: pointer;
        padding: 5px;
            box-sizing: border-box;
            grid-gap: 10px;
				 `;

const ItemTime = styled.div `
				${ ''/* background: red; */}
				font-size: 23px;
				text-align: center;
				color: #0F2331;
				font-weight: bold;
        position: relative;

        span {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          height: 25px;
        }
				 `;
const ItemDescCon = styled.div `
    display: ${props => props.noTitleNoDesc
  ? 'none'
  : 'block'};
        overflow: hidden;
    word-wrap: break-word;
				 `;

const ItemTitle = styled.p `
  display: ${props => props.state === ''
  ? 'none'
  : 'block'};
				font-weight: bold;
				color: #0F2331;
				margin: 0;
				margin-top: 5px;
        margin-bottom: ${props => props.stateDesc === ''
    ? '5px'
    : '0'};

				  `;

const ItemDesc = styled.p `
  display: ${props => props.state === ''
  ? 'none'
  : 'block'};
				color: #0F2331;
				margin-top: 5px;
				margin-bottom: 0;
				overflow: scroll;
				overflow-x: hidden;
        height: 65px;
        max-height: 65px;
				  `;

const ItemImg = styled.img `
display: ${props => props.state === 'none'
? 'none'
: 'block'};

				 width: 80px;
				 max-width: 80px;
				 position: absolute;
left: 0;
right: ${props => props.noTitleNoDesc
  ? 'auto'
  : '0'};
margin: auto;
top: 0;
bottom: 0;
max-height: 100%;
transform: ${props => props.yesTitleNoDesc
  ? 'translateX(-330px)'
  : 'none'};
				 `;


//export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
export default NoteItem
