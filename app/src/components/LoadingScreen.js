import React from 'react';
import styled from 'styled-components'
import CircularProgress from 'material-ui/CircularProgress';

//State
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions

class LoadingScreen extends React.Component {

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
				<InnerWrapper>
				<LoadingCon><CircularProgress size={80} thickness={5} color="#42EA9C"/></LoadingCon>
				</InnerWrapper>
			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
position: fixed;
background: rgba(13, 13, 13, 0.71);
top: 0;
left: 0;
height: 100%;
width: 100%;
z-index: 99;
        `;
const InnerWrapper = styled.div `
position: fixed;
background: green;
left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
width: 300px;
height: 300px;

 `;
const LoadingCon = styled.div `
background: red;
margin: 0 auto;
margin-top: 20px;
width: 80px;
height: 80px;
				  `;
//export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
export default LoadingScreen
