import React from 'react';
import styled from 'styled-components'
// import SampleImg from '../images/sample.jpg';

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

class ItemTextImage extends React.Component {

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
    //Reactive Styles

    //Template
    return (
      <Wrapper>
        <ItemCon>
          <ItemTime>{this.state.time}</ItemTime>
          <ItemDescCon>
            <ItemTitle>
              {this.state.title}
            </ItemTitle>
            <ItemDesc>
              {this.state.desc}
            </ItemDesc>
          </ItemDescCon>
          <span style={{
            position: 'relative'
          }}>
            <ItemImg src={this.state.image} alt="note image"/>
          </span>
        </ItemCon>
      </Wrapper>
    );
  }

}

//Style
const Wrapper = styled.div `
cursor: pointer;
        `;

const ItemCon = styled.div `
				background: white;
				border-radius: 2px;
				height: 100px;
				display: grid;
				grid-template-columns: 70px 1fr 90px;
				 `;
const ItemTime = styled.div `
				${ ''/* background: red; */}
				font-size: 23px;
				text-align: center;
				padding-top: 35px;
				color: #0F2331;
				font-weight: bold;
				 `;
const ItemDescCon = styled.div `
				margin-bottom: 10px;
				height: 65px;
        overflow-x: hidden;
    word-wrap: break-word;
				 `;
const ItemTitle = styled.p `
				font-weight: bold;
				color: #0F2331;
				margin: 0;
				margin-top: 5px;

				  `;
const ItemDesc = styled.p `
				color: #0F2331;
				margin-top: 5px;
				margin-bottom: 5px;
				overflow: scroll;
				overflow-x: hidden;
				height: 100%;
				  `;
const ItemImg = styled.img `
				 width: 80px;
				 position: absolute;
left: 0;
right: 0;
margin: auto;
top: 0;
bottom: 0;
max-height: 100%;

				 `;

//export default connect(mapStateToProps, mapDispatchToProps)(ItemTextImage);
export default ItemTextImage
