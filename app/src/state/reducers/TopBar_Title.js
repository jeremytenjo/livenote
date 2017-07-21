//listenes to TRIGGER_CLICKED action
//stae = false means initial value
//ajax calls can be made from here
export default function(state = "Note", action) {
	switch (action.type) {
		case "CHANGE_TOPBAR_TITLE":
			return action.data

			default:
      return state
	}
}
