import React from 'react';
import styled from 'styled-components'
import SampleImg from '../images/sample.jpg';

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
						<ItemDesc>
							Description sdfsdfsdfdf sdfsdf dfsdf sfdsdf sdfsdf sdf sdf
						</ItemDesc>
					</ItemDescCon>
					<ItemImg src={SampleImg}/>
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
				color: #263238;
				font-weight: bold;
				 `;
				const ItemDescCon = styled.div `
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
				height: 100%;
				  `;
				const ItemImg = styled.img `
				 width: 80px;
				 margin-top: 5px;
				 margin-left: 5px;
				 `;

//export default connect(mapStateToProps, mapDispatchToProps)(ItemTextImage);
export default ItemTextImage
