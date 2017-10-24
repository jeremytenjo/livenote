export default function(state = '', action) {
	switch (action.type) {
		case "FETCH_NOTES_LOCAL":
			return action.data;

		default:
			return state
	}
}
