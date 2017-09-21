import React from 'react';
import styled from 'styled-components'
// import SampleImg from '../images/sample.jpg';
//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

class ItemOnlyImage extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			time: props.time,
			title: props.title,
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
						<div style={{
	            position: 'relative',
							height: '100%',
							marginTop: '-5px'
	          }}>
						<ItemImage src={this.state.image} alt="note image"/>
					</div>

					</ItemDescCon>
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
				height: 180px;
				display: grid;
				grid-template-columns: 70px 1fr;
				 `;
const ItemTime = styled.div `
				${ ''/* background: red; */}
				font-size: 20px;
				text-align: center;
				padding-top: 35px;
				color: #0F2331;
				font-weight: bold;
				 `;
const ItemDescCon = styled.div `
				${ ''/* background: green; */}
				overflow: hidden;

				 `;
const ItemTitle = styled.p `
				font-weight: bold;
				color: #0F2331;
				margin: 0;
				margin-top: 5px;

				  `;
const ItemImage = styled.img `
${'' /* width: 200px; */}
    max-width: 170px;
		position: absolute;
left: 0;
right: 0;
margin: auto;
top: 0;
bottom: 0;
				  `;

//export default connect(mapStateToProps, mapDispatchToProps)(ItemOnlyImage);
export default ItemOnlyImage
