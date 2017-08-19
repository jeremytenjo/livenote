//listenes to TRIGGER_CLICKED action
//stae = false means initial value
//ajax calls can be made from here
export default function(state = "", action) {
	switch (action.type) {
		case "SET_FILE_LINK_ID":
			return action.data

			default:
      return state
	}
}
