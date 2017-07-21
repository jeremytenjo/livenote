import React from 'react';
import styled from 'styled-components'
import Recent from '../groups/Recent.js';
import Folders from '../groups/Folders.js';
import Notes from '../groups/Notes.js';
import FloatingButton from '../components/FloatButton.js';
import {withRouter} from 'react-router-dom'

class Directory extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			data: 'initial'
		}
	}

	//Methods
	new  = () => {
		this.props.history.push(`/record`);
	}
	render() {
		//Properties

   //Style
	 const FloatingButtonCon = styled.span `
position: absolute;
bottom: 20px;
right: 0;
`;
		//Template
		return (
			<div>
				<Recent/>
				<Folders/>
				<Notes/>
				<FloatingButtonCon onClick={this.new}>
					<FloatingButton/>
				</FloatingButtonCon>
			</div>
		);
	}

}
export default withRouter(Directory)
