import React from 'react';
import styled from 'styled-components'
import CircularProgress from 'material-ui/CircularProgress';

//State
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {triggerAction} from '../state/actions/index';

//Set global state to prop
//define actions
function mapStateToProps(state) {
  return {status: state.LoadingScreen}
 }
class LoadingScreen extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			title: props.title
		}
	}

	//Methods

	render() {
		//Properties
		//Reactive Styles
		const Wrapper = styled.div `
		display: ${props => this.props.status === 'true' ? 'block' : 'none'};
		position: fixed;
		background: rgba(13, 13, 13, 0.8);
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 99;
		        `;
		//Template
		return (
			<Wrapper>
				<InnerWrapper>
				<LoadingCon><CircularProgress size={80} thickness={5} color="#42EA9C"/></LoadingCon>
				<Title>{this.state.title}</Title>
				</InnerWrapper>
			</Wrapper>
		);
	}

}

//Style

const InnerWrapper = styled.div `
position: fixed;
${'' /* background: green; */}
left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
width: 300px;
height: 300px;

 `;
const LoadingCon = styled.div `
${'' /* background: red; */}
margin: 0 auto;
margin-top: 20px;
width: 80px;
height: 80px;
				  `;
 const Title = styled.p `
text-align: center;
font-size: 20px;
 `;
export default connect(mapStateToProps)(LoadingScreen);
