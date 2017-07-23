import React from 'react';
import styled from 'styled-components'
import SampleImg from '../images/sample.jpg';
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
			data: 'initial'
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
					<ItemTime>00:00</ItemTime>
					<ItemDescCon>
						<ItemTitle>
							Title
						</ItemTitle>
						<ItemImage src={SampleImg} alt="sample image"/>
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
				color: #263238;
				font-weight: bold;
				 `;
const ItemDescCon = styled.div `
				${ ''/* background: green; */}
				overflow: hidden;

				 `;
const ItemTitle = styled.p `
				font-weight: bold;
				color: #263238;
				margin: 0;
				margin-top: 5px;

				  `;
const ItemImage = styled.img `
width: 200px;

				  `;

//export default connect(mapStateToProps, mapDispatchToProps)(ItemOnlyImage);
export default ItemOnlyImage
