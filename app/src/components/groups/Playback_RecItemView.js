import React from 'react';
import styled from 'styled-components'
import Loadable from 'react-loadable';
import firebase from 'firebase';

//State

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotePreview_Show, NotePreview_Set} from '../../state/actions/index';

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
			items: 'initial',
			list: []
		}
	}

	//Methods
	componentWillMount() {
		this.getItems();
	}
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

		let list = {},
			array = [],
			userId = firebase.auth().currentUser.uid;

		firebase.database().ref('/users/' + userId + '/notes').orderByChild('masterNote_id').equalTo('-KrmAja-0z9mCnupLdGR').once('value').then((snap) => {
			let snapValue = snap.val();
			// console.log(snapValue);

			for (var prop in snapValue) {
				// console.log(snapValue[prop]);
				list.desc = snapValue[prop].comment;
				list.time = snapValue[prop].time;
				list.imageUrl = snapValue[prop].imageUrl;
				list.image = snapValue[prop].image || '';
				list.name = snapValue[prop].name;
				list.title = snapValue[prop].title;

				// console.log(list);
				array.push(list);
				list = {};
			}
			this.setState({list: array});

		});
	}

	render() {
		//Properties
		let list = this.state.list.map((item, i) => {
			// console.log(item);
			if (item.desc && item.image !== '') {
				list = <span data-time={item.time} data-title={item.title} data-image={item.image} data-desc={item.desc} onClick={this.showPreview} key={i}><ItemTextImage time={item.time} title={item.title} desc={item.desc} image={item.image}/></span>;
				// return list

			} else if (item.desc === '') {
				list = <span data-time={item.time} data-title={item.title} data-image={item.image} onClick={this.showPreview} key={i}><ItemOnlyImage time={item.time} title={item.title} image={item.image}/></span>;
				// return list

			} else if (item.image === '') {
				list = <span data-time={item.time} data-title={item.title} data-desc={item.desc} onClick={this.showPreview} key={i}><ItemOnlyText time={item.time} title={item.title} desc={item.desc}/></span>;
				// return list
			}
			return list

		});
		//Template
		return (
			<Wrapper id="ItemViewCon">
				{list}
			</Wrapper>
		);
	}

}

//Style
const Wrapper = styled.div `
display: grid;
grid-row-gap: 10px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(RecItemView);
