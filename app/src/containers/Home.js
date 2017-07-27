import React from 'react';
import styled from 'styled-components'
// import firebase from 'firebase';
import Menu_icon from '../images/icons/menu.svg';
import Search_icon from '../images/icons/search.svg';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Loadable from 'react-loadable';

//State
import {connect} from 'react-redux';

//Set global state to prop
function mapStateToProps(state) {
	return {title: state.TopBar_Title}
}
//define actions

const Record = Loadable({
	loader: () => import ('./Record.js'),
	loading: () => null
});
const Directory = Loadable({
	loader: () => import ('./Directory.js'),
	loading: () => null
});
const Recording = Loadable({
	loader: () => import ('./Recording.js'),
	loading: () => null
});
class Home extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods
	new = () => {
		this.props.history.push(`/record`);
	}
	render() {
		//Properties

		//Template
		return (
			<div>
				<HomeContainer>
					<TopBar>
						<Icon src={Menu_icon} alt="Menu Icon"/>
						<TitlePage>{this.props.title}</TitlePage>
						<Icon src={Search_icon} alt="Search Icon"/>
					</TopBar>
					<BrowserRouter>
						<Content>
							<Switch>
								<Route exact path='/' component={Directory}/>
								<Route exact path='/record' component={Record}/>
								<Route exact path='/recording' component={Recording}/>
							</Switch>
						</Content>
					</BrowserRouter>
				</HomeContainer>

			</div>
		);
	}

}

//Style
const HomeContainer = styled.div `

 `;
const TopBar = styled.div `
max-width: 600px;
position: fixed;
height: 25px;
top: 0;
right: 0;
left: 0;
margin: auto;
display: grid;
grid-template-columns: 20px 1fr 20px;
padding: 10px;
background: #0F2331;
`;
const Content = styled.div `
overflow-x: hidden;
margin-top: 46px;
padding: 10px;

`;
const TitlePage = styled.p `
font-size: 20px;
font-weight: bold;
outline: none;
margin: 0;
margin-left: 10px;
`;
const Icon = styled.img `
	width: 20px;
	cursor: pointer;
	margin-top: 2px;
`;
export default connect(mapStateToProps)(Home);
