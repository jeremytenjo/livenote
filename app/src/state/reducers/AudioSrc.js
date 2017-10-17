export default function(state = '', action) {
	switch (action.type) {
		case "SET_AUDIO_SRC":
			return action.data;

		default:
			return state
	}
}
