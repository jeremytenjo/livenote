//listenes to TRIGGER_CLICKED action
//stae = false means initial value
//ajax calls can be made from here
let initial_value = 'none';
export default function(state = initial_value, action) {
	switch (action.type) {
		case "NEWNOTE_TOGGLE_IMAGE":
			return action.data

			default:
      return state
	}
}
