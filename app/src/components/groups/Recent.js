import React from 'react';
import styled from 'styled-components'
import File from '../File_link.js';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

function mapStateToProps(state) {
	return {notes: state.RecentNotes}
}
class Recent extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods
	itemList = () => {
		let data = this.props.notes,
			list;

		// console.log(data);
		if (data.length < 1) {
			return <CircularProgress size={80} thickness={5} color="#42EA9C"/>

		} else {
			console.log(data);
			list = data.map((item, i) => {
				return <File key={i} width="150px"/>
			});
		}

		return list
	}
	render() {
		//Properties

		//Style
		const Title = styled.p `
margin-top: 5px;
		 `;
		const Container = styled.div `
overflow-x: scroll;
overflow-y: hidden;
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-column-gap: 10px;
white-space: nowrap;
height: 100px;
 `;

		//Template
		return (
			<div>
				<Title>Recent</Title>
				<Container>
					{this.itemList()}
				</Container>
			</div>
		);
	}

}

export default connect(mapStateToProps)(Recent);
