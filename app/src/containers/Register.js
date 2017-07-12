import React from 'react';
import styled from 'styled-components'
import Logo_img from '../images/icons/Logo.png';
import Facebook_img from '../images/icons/facebook.svg';
import Google_img from '../images/icons/google.png';
import Form from '../components/Form_Register.js';
import firebase from 'firebase';
import {Link, withRouter} from 'react-router-dom'

class Register extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			errorMessage: ''
		}
	}

	//Methods
	registerFacebook = () => {
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then((result) => {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			// let token = result.credential.accessToken;
			// The signed-in user info.
			// let user = result.user;
			console.log(result.user);
			// ...Redirect
			this.props.history.push(`/`);

		}).catch((error) => {
			console.log(error);
			// Handle Errors here.
			let errorMessage = error.message;
			this.setState({
				errorMessage: '*' + errorMessage
			});
			// The email of the user's account used.
			// let email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			// let credential = error.credential;
			// ...
		});
	}

	registerGoogle = () => {
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			// var token = result.credential.accessToken;
			// The signed-in user info.
			// var user = result.user;
			this.props.history.push(`/`);

		}).catch((error) => {
			// Handle Errors here.
			let errorMessage = error.message;
			this.setState({
				errorMessage: '*' + errorMessage
			});

		});
	};

	render() {
		//Properties

		//Style

		const Wrapper = styled.div `
position: absolute;
width: auto;
max-width: 400px;
height: 95%;
max-height: 800px;
left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
display: grid;
grid-template-rows: repeat(4, auto);

 `;

		const Logo = styled.img `
 margin: 0 auto;
 margin-top: 20px;
 display: block;
 width: 100px;
 `;
		const LogoTitle = styled.p `
	margin-top: 0;
	text-align: center;
	margin-bottom: 0;
	height: 21px;
  `;

		const SubTitle = styled.p `
color: #9E9E9E;
text-align: center;
height: 18px;

 `;

		const SignupCont = styled.div `
display: grid;
grid-template-columns: 1fr 1fr ;
width: 280px;
margin: 0 auto;
 height: 95px;
	 `;
		const SocialButtons = styled.img `
	 width: 50px;
	 margin-left: 20px;
	 cursor: pointer;
 `;
		const ErrorMessage = styled.p `
 color: red;
 text-align: center;
 font-size: 14px;
 margin: 0;
 margin-top: 15px;
 	`;
		const LeftText = styled.p `
	color: #9E9E9E;
font-size: 14px;
text-align: center;
margin-bottom: 0;
margin-top: 0;

  `;

		const white = {
			color: 'white',
			fontWeight: 'bold',
			cursor: 'pointer',
			marginLeft: '5px'
		};
		const blah = {
			position: 'relative'
		};
		//Template
		return (
			<div>
				<Wrapper>
					<div>
						<Logo src={Logo_img} alt={"Logo"}></Logo>
						<LogoTitle>Live Note</LogoTitle>
					</div>
					<Form/>
					<SignupCont style={blah}>
						<SubTitle>Sign up with</SubTitle>
						<div>
							<SocialButtons onClick={this.registerFacebook} src={Facebook_img} alt={"Faceboo Login Button"}></SocialButtons>
							<SocialButtons onClick={this.registerGoogle} src={Google_img} alt={"Google Login Button"}></SocialButtons>
						</div>
						<ErrorMessage>{this.state.errorMessage}</ErrorMessage>

					</SignupCont>
					<LeftText>Have an Account?
						<span style={white}>
							<Link to="/login">LOG IN</Link>
						</span>
					</LeftText>
				</Wrapper>
			</div>
		);
	}

}

export default withRouter(Register)
