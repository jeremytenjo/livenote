
export default function(state = '', action) {
	switch (action.type) {

		case "SET_NOTE_PREVIEW":
		// console.log(action.data);
			return action.data

		default:
			return state
	}
}
