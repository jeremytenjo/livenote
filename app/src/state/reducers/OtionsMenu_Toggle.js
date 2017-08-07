export default function(state = false, action) {
	switch (action.type) {
		case "SHOW_MENU_OPTIONS":
			return true

		case "HIDE_MENU_OPTIONS":
			return false

		default:
			return state
	}
}
