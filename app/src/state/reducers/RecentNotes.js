export default function(state = [], action) {
	switch (action.type) {
		case "SET_RECENT_NOTES":
			let newState = state;
			// console.log(action.data);

			// newState = state.slice();
			newState.push(action.data);
			console.log(newState);

			return newState

		default:
			return state
	}
}
