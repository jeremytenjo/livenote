//listenes to TRIGGER_CLICKED action
//stae = false means initial value
//ajax calls can be made from here
export default function(state = false, action) {
	switch (action.type) {
		case "SHOW_SNACKBAR":
			return true
		case "HIDE_SNACKBAR":
			return false

			default:
      return state
	}
}
