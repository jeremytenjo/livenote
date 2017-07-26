// let Items = [
// 	{
// 		time: '00:00',
// 		title: 'Both',
// 		desc: 'desc',
// 		image: 'image'
// 	}, {
// 		time: '00:00',
// 		title: 'just desc',
// 		desc: 'desc',
// 		image: ''
// 	}, {
// 		time: '00:00',
// 		title: 'justimage',
// 		desc: '',
// 		image: 'image'
// 	}
// ]
let Items = [];

export default function(state = Items, action) {
	switch (action.type) {
		case "INSERT_ITEM":
			let newState = '';
			newState = state.slice();
			newState.push(action.data);
			return newState

		case "RESET_ITEM":
			let newState2 = [];
			return newState2

		default:
			return state
	}
}
