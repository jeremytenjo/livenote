export default function(state = [], action) {
	switch (action.type) {
		case "SET_RECENT_NOTES":
			let newState = '';
			newState = state.slice();
			newState.push(action.data);
			return newState
			// return action.data

		default:
			return state
	}
}
