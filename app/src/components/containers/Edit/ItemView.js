import React from 'react';
import styled from 'styled-components'
import NoteItem from '../../global/NoteItem.js';

//State

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotePreview_Show, NotePreview_Set} from '../../../state/actions/index';

//Set global state to prop
function mapStateToProps(state) {
	return {items: state.NewNote_Items}
}
//define actions
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		NotePreview_Show,
		NotePreview_Set
	}, dispatch)
}
class RecItemView extends React.Component {

	//initial state
	constructor(props) {
		super(props)
		this.state = {
			items: 'initial'
		}
	}

	//Methods
	showPreview = (e) => {
		// console.log(e.currentTarget.dataset);
		this.props.NotePreview_Show();
		let data = {
			time: e.currentTarget.dataset.time,
			title: e.currentTarget.dataset.title,
			desc: e.currentTarget.dataset.desc,
			image: e.currentTarget.dataset.image
		}
		// console.log(data);
		this.props.NotePreview_Set(data);
	}
	getItems = () => {
		//Listen to items Array
		let items = '',
			list = '',
			itemList = '';

		items = this.props.items;
		// console.log(items);
		list = '';
		itemList = '';


		 itemList = items.map((item, i) => {

			list = <Item key={i}>
				<ItemCon key={i} data-time={item.time} data-title={item.title} data-image={item.image} data-desc={item.desc} onClick={this.showPreview}>
					<NoteItem time={item.time} title={item.title} desc={item.desc} image={item.image}/>
				</ItemCon>

			</Item>;

			return list

		});

		//delay so that has time to scroll to end
		setTimeout(function() {
			var item = document.getElementById("ItemViewCon");
			if (item != null) {
				item.scrollIntoView(false);
			}
		}, 50);

		return itemList
	}

	render() {
		//Properties

		//Template
		return (
			<Wrapper id="ItemViewCon">
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

const Item = styled.span `
position: relative;
    width: 100%;
 `;

	const ItemCon = styled.div `

	 `;
export default connect(mapStateToProps, mapDispatchToProps)(RecItemView);
