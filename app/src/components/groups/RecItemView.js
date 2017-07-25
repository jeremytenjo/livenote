import React from 'react';
import styled from 'styled-components'
import Loadable from 'react-loadable';

//State
import {connect} from 'react-redux';

const ItemOnlyText = Loadable({
	loader: () => import ('../Item_OnlyText.js'),
	loading: () => null
});
const ItemOnlyImage = Loadable({
	loader: () => import ('../Item_OnlyImage.js'),
	loading: () => null
});
const ItemTextImage = Loadable({
	loader: () => import ('../Item_TextImage.js'),
	loading: () => null
});

//Set global state to prop
function mapStateToProps(state) {
	return {items: state.NewNote_Items}
}
//define actions

class RecItemView extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			items: 'initial'
		}
	}

	//Methods
	getItems = () => {
		//Listen to items Array
		let items = this.props.items;
		console.log(items);
		let list = '';

		let itemList = items.map((item, i) => {
			// console.log(item);
			if (item.desc && item.image !== '') {
				list = <span key={i}><ItemTextImage time={item.time} title={item.title} desc={item.desc}/></span>;
				return list
			} else if (item.desc === '') {
				list = <span key={i}><ItemOnlyImage time={item.time} title={item.title}/></span>;
				return list
			} else if (item.image === '') {
				list = <span key={i}><ItemOnlyText time={item.time} title={item.title} desc={item.desc}/></span>;
				return list
			}

			return itemList
		});

		// console.log(itemList);
		return itemList
	}

	render() {
		//Properties

		// //Listen to items Array
		// let items = this.props.items;
		// let itemList = items.map((item, i) => {
		// 	// console.log(item);
		//
		// 	if (item.desc && item.image !== '') {
		// 		return <span key={i}><ItemTextImage time={item.time} title={item.title} desc={item.desc}/></span>
		// 	} else if (item.desc === '') {
		// 		return <span key={i}><ItemOnlyImage time={item.time} title={item.title}/></span>
		// 	} else if (item.image === '') {
		// 		return <span key={i}><ItemOnlyText time={item.time} title={item.title} desc={item.desc}/></span>
		// 	}
		// 	return ''
		// });

		//Template
		return (
			<Wrapper>
				{this.getItems()}
			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
display: grid;
grid-row-gap: 10px;

`;

export default connect(mapStateToProps)(RecItemView);
