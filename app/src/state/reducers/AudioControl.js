export default function(state = '', action) {
	switch (action.type) {
		case "SET_AUDIO_CONTROL":
			return action.data;

		default:
			return state
	}
}
