export default function(state = 'false', action) {
	switch (action.type) {
		case "LOADING_SCREEN_TOGGLE":
			return action.data;

		default:
			return state
	}
}
