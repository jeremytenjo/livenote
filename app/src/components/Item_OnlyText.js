import React from 'react';
import styled from 'styled-components'

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

class ItemOnlyText extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			time: props.time,
			title: props.title,
			desc: props.desc
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
				margin-bottom: 10px;
				height: 65px;
				 `;
const ItemTitle = styled.p `
				font-weight: bold;
				color: #263238;
				margin: 0;
				margin-top: 5px;

				  `;
const ItemDesc = styled.p `
				color: #263238;
				margin-top: 5px;
				margin-bottom: 5px;
overflow: scroll;
overflow-x: hidden;
height: 100%;
				  `;

//export default connect(mapStateToProps, mapDispatchToProps)(ItemOnlyText);
export default ItemOnlyText
