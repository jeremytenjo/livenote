import React from 'react';
import styled from 'styled-components'
// import Name_img from '../images/icons/name.svg';
import Password_img from '../../../images/icons/password.svg';
import Mail_img from '../../../images/icons/mail.svg';
import firebase from 'firebase';
import {withRouter} from 'react-router-dom';
class RegForm extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			errorMessage: '',
			fullName: '',
			email: '',
			password: ''
		}
	}

	//Methods

	// handleFullNameChange = (e) => {
	// 	console.log(e.target.value);
	// 	this.setState({fullName: e.target.value})
	// }
	handleEmail = (e) => {
		// console.log(e.target.value);
		this.setState({email: e.target.value})
	}
	handlePassword = (e) => {
		// console.log(e.target.value);
		this.setState({password: e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		//Validate Email
		// console.log(this.state.email);
		// console.log(this.state.password);
		let email = this.state.email;

		if (!email) {
			return this.setState({errorMessage: 'Please write an email Address'})
		}

		//Validate password
		let password = this.state.password;
		if (password.length < 7) {
			return this.setState({errorMessage: 'Password must be longer than 6 characters'})
		}

		this.setState({error: true});

		firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
			// console.log("Created and ogged in");

			// console.log("Redirect");
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
		const WrapperStyle = {
			display: 'grid',
			gridTemplateRows: 'auto auto auto ',
			width: '90%',
			maxWidth: '400px',
			margin: '0 auto'
		};
		const inputStyle = {
			background: 'transparent',
			color: 'white',
			textDecoration: 'none',
			fontSize: '16px',
			borderColor: 'transparent',
			outline: 'none',
			paddingTop: '10px',
			paddingBottom: '10px'
		};
		const InputSubConStyle = {
			display: 'grid',
			gridTemplateRows: '.5fr 1fr',
			borderBottom: '1px solid white'
		};
		const InputImageConStyle = {
			display: 'grid',
			gridTemplateColumns: '10fr 1fr'
		};

		const Label = styled.p `
font-size: 12px;
margin-top: 10px;
font-weight: bold;
margin-bottom: 3px;
	  `;

		const Image = styled.img `
		 width:15px;
		 display: block;
		 margin: 0 auto;
		 `;

		const ErrorMessage = styled.p `
color: red;
text-align: center;
font-size: 14px;
margin: 0;
margin-top: 15px;
		  `;
		const RegisterButton = styled.button `
	 background-color: #42EA9C;
	 border: none;
	 border-radius: 50px;
	 color: white;
	 font-weight: bold;
	 width: 150px;
	 height: 40px;
	 font-size: 17px;
	 display: block;
	 margin: 0 auto;
	 margin-top: 30px;
	 outline: none;
	 cursor: pointer;
	 `;

		//Template
		return (
			<form onSubmit={this.handleSubmit} style={{marginBottom: '35px'}}>
				<div style={WrapperStyle}>
					{/* <div style={InputSubConStyle}>
						<Label>Name</Label>
						<div style={InputImageConStyle}>
							<input style={inputStyle} type="text" value={this.state.fullName} onChange={this.handleFullNameChange} name="fullName"/>
							<Image src={Name_img}/>
						</div>
					</div> */}
					<div style={InputSubConStyle}>
						<Label>Email</Label>
						<div style={InputImageConStyle}>
							<input style={inputStyle} type="email" value={this.state.email} onChange={this.handleEmail} name="email"/>
							<Image src={Mail_img}/>
						</div>
					</div>
					<div style={InputSubConStyle}>
						<Label>Password</Label>
						<div style={InputImageConStyle}>
							<input style={inputStyle} type="password" value={this.state.password} onChange={this.handlePassword} name="password"/>
							<Image src={Password_img}/>
						</div>
					</div>
					<ErrorMessage>{this.state.errorMessage}</ErrorMessage>
				</div>
				<RegisterButton type="submit">Register</RegisterButton>
			</form>
		);
	}

}

export default withRouter(RegForm)
