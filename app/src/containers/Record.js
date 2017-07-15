import React from 'react';
// import styled from 'styled-components'
import { withRouter} from 'react-router-dom'

class Record extends React.Component {

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

		//Style

		//Template
		return (
			<div>
				Record
			</div>
		);
	}

}
export default withRouter(Record)
