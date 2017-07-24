import React from 'react';
import styled from 'styled-components'
import Loadable from 'react-loadable';

//State
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Get_Current_Time} from '../../state/actions/index';

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
    Get_Current_Time
      }, dispatch)
 }
class RecItemView extends React.Component {

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

		//Listen to items Array
		let items = this.props.items;
		let itemList = items.map((item, i) => {
			// console.log(item);
			console.log(this.props.Get_Current_Time());
			//item and text
			if (item.desc && item.image !== '') {
				return <span key={i}><ItemTextImage  time={item.time} title={item.title} desc={item.desc}/></span>
			}
			else if (item.desc === '') {
				return <span key={i}><ItemOnlyImage time={item.time} title={item.title} /></span>
			}
			else if (item.image === '') {
				return <span key={i}><ItemOnlyText time={item.time} title={item.title} desc={item.desc} /></span>
			}
			return ''
		});
		// console.log(items);
		//Template
		return (
			<Wrapper>
				{itemList}
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
