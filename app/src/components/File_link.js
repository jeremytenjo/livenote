import React from 'react';
import styled from 'styled-components'
import Piece from '../images/icons/NotePiece.svg';
import Sample from '../images/sample.jpg';

class File extends React.Component {

  //initial state
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.width,
      title: this.props.title

    }
  }

  //Methods

  render() {
    //Properties

    //Template
    return (
      <Wrapper width={this.state.width}>

        <Image src={Piece} alt="piece"/>

        <TitleCon>
          <Title>{this.state.title}</Title>
        </TitleCon>

      </Wrapper>

    );
  }

}

//Style
const Wrapper = styled.div `
height: 100px;
width: ${props => props.width};
background: #F5F5F5;
cursor: pointer;
position: relative;
z-index: -1;
background-image: url(${Sample});
background-size: cover;
`;
const Image = styled.img `
width: 20px;
position: absolute;
right: 0;
top: 0;
`;
const TitleCon = styled.div `
background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 43%, rgba(0, 0, 0, 0.7) 100%);
position: absolute;
bottom: 0;
height: 40px;
width: 100%;
 `;
const Title = styled.p `
margin: 0;
margin-left: 5px;
color: white;
position: absolute;
bottom: 10px;

 `;

export default File;
