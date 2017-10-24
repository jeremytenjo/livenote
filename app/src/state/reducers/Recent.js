export default function(state = '', action) {
	switch (action.type) {
		case "FETCH_RECENT_LOCAL":
			return action.data;

		default:
			return state
	}
}
