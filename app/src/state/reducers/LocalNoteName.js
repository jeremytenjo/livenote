export default function(state = '3', action) {
	switch (action.type) {
		case "SET_LOCAL_NOTE_NAME":
			return action.data;

		default:
			return state
	}
}
