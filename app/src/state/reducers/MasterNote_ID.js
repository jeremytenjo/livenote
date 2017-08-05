export default function(state = '', action) {
	switch (action.type) {
		case "SET_MASTERNOTE_ID":
			return action.data;

		default:
			return state
	}
}
