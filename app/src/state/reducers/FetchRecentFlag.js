export default function(state = false, action) {
	switch (action.type) {
		case "FETCH_RECENT_FLAG":
			return action.data;


		default:
			return state
	}
}
