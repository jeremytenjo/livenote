//listenes to TRIGGER_CLICKED action
//stae = false means initial value
//ajax calls can be made from here
let initial_value = 0;
export default function(state = initial_value, action) {
	switch (action.type) {
		case "START_TIMER":
			return action.data;

		case "RESET_TIMER":
			return 0;

		 

		default:
			return state
	}
}
