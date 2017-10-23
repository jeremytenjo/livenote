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

    let yesTitleNoDescYesIMG = false
    if (this.state.title !== '' && this.state.desc === '' && this.state.image !== 'none') {
      yesTitleNoDescYesIMG = true
    }

    //Template
    return (
      <Wrapper stateIMG={this.state.image} noTitleNoDesc={noTitleNoDesc}>

        <ItemTime state={this.state.time}>
          <span>{this.state.time}</span>
          <Circle>
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="4" stdDeviation="2"/>
              </filter>
            </defs>

            <circle cx="50%" cy="50%" r="40" style={{
              fill: '#0F2331',
              filter: 'url(#shadow)'
            }}/>
          </Circle>
        </ItemTime>

        <ItemDescCon noTitleNoDesc={noTitleNoDesc}>

          <ItemTitle state={this.state.title} stateDesc={this.state.desc}>
            {this.state.title}
          </ItemTitle>

          <ItemDesc state={this.state.desc}>
            {this.state.desc}
          </ItemDesc>

          <ItemImg2 src={this.state.image} yesTitleNoDescYesIMG={yesTitleNoDescYesIMG}/>

        </ItemDescCon>

        <span style={{
          position: 'relative'
        }}>
          <ItemImg state={this.state.image} noTitleNoDesc={noTitleNoDesc} yesTitleNoDesc={yesTitleNoDesc} yesTitleNoDescYesIMG={yesTitleNoDescYesIMG} src={this.state.image} alt=""/>
        </span>

      </Wrapper>
    );
  }

}

//Style
const Circle = styled.svg `
 width: 90px;
 height: 90px;
 position: absolute;
 left: 10px;
 z-index: 2;
 `;
const Wrapper = styled.div `
				background: white;
				border-radius: 2px;
				${'' /* height: ${props => props.stateIMG === 'none'
  ? 'auto'
  : '100px'}; */}
  height: 100px;
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
				color: white;
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
          z-index: 3;
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
        height: 50px;
        max-height: 50px;
				  `;

const ItemImg = styled.img `

display: ${props => props.state === 'none'
  ? 'none'
  : 'block'};
  display: ${props => props.yesTitleNoDescYesIMG
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
				 `;

const ItemImg2 = styled.img `
display: ${props => props.yesTitleNoDescYesIMG
  ? 'block'
  : 'none'};

				 width: 80px;
				 max-width: 80px;
				 position: absolute;
max-height: 100%;
				 `;

//export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
export default NoteItem
