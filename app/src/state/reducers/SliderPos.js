//listenes to TRIGGER_CLICKED action
//stae = false means initial value
//ajax calls can be made from here
export default function(state = 0, action) {
	switch (action.type) {
		case "SET_SLIDER_POS":
			return action.data

			default:
      return state
	}
}
