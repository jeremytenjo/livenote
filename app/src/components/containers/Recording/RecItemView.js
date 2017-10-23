import React from 'react';
import styled from 'styled-components'
import Loadable from 'react-loadable';
//State

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotePreview_Show, NotePreview_Set} from '../../../state/actions/index';
import NoteItem from '../../global/NoteItem.js';

// const ItemOnlyText = Loadable({
// 	loader: () => import ('../../global/Item_OnlyText.js'),
// 	loading: () => null
// });
// const ItemOnlyImage = Loadable({
// 	loader: () => import ('../../global/Item_OnlyImage.js'),
// 	loading: () => null
// });
// const ItemTextImage = Loadable({
// 	loader: () => import ('../../global/Item_TextImage.js'),
// 	loading: () => null
// });

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
      // console.log(item);
      list = <span key={i} data-time={item.time} data-title={item.title} data-image={item.imageUrl} data-desc={item.desc} onClick={this.showPreview}>
        <NoteItem time={item.time} title={item.title} desc={item.desc} image={item.imageUrl}/>
      </span>
      return list

      // if (item.desc && item.image !== '') {
      // 	list = <span data-time={item.time} data-title={item.title} data-image={item.image} data-desc={item.desc} onClick={this.showPreview} key={i}><ItemTextImage time={item.time} title={item.title} desc={item.desc} image={item.image}/></span>;
      // 	return list
      //
      // } else if (item.desc === '') {
      // 	list = <span data-time={item.time} data-title={item.title} data-image={item.image} onClick={this.showPreview} key={i}><ItemOnlyImage time={item.time} title={item.title} image={item.image}/></span>;
      // 	return list
      //
      // } else if (item.image === '') {
      // 	list = <span data-time={item.time} data-title={item.title} data-desc={item.desc} onClick={this.showPreview} key={i}><ItemOnlyText time={item.time} title={item.title} desc={item.desc}/></span>;
      // 	return list
      //
      // }

      // return itemList
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

export default connect(mapStateToProps, mapDispatchToProps)(RecItemView);
