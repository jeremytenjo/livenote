//listenes to TRIGGER_CLICKED action
//stae = false means initial value
//ajax calls can be made from here
let initial_value = false;
export default function(state = initial_value, action) {
	switch (action.type) {
		case "PLAY_TOGGLE":
			return action.data

			default:
      return state
	}
}
