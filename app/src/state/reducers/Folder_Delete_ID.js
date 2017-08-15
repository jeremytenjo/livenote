export default function(state = '', action) {
	switch (action.type) {
		case "SET_FOLDER_DELETE_ID":
			return action.data;

		default:
			return state
	}
}
