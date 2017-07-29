export default function(state = false, action) {
	switch (action.type) {
		case "SHOW_NOTE_PREVIEW":
			return true
		case "HIDE_NOTE_PREVIEW":
			return false

		default:
			return state
	}
}
