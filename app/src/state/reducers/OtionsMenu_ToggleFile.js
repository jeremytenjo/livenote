export default function(state = false, action) {
	switch (action.type) {
		case "SHOW_MENU_OPTIONS_FILE":
			return true

		case "HIDE_MENU_OPTIONS_FILE":
			return false

		default:
			return state
	}
}
