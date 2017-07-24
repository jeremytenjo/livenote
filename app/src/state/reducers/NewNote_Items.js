let Items = [
	{
		time: '00:00',
		title: 'Both',
		desc: 'desc',
		image: 'image'
	},
	{
		time: '00:00',
		title: 'just desc',
		desc: 'desc',
		image: ''
	},
	{
		time: '00:00',
		title: 'justimage',
		desc: '',
		image: 'image'
	}
]
export default function(state = Items, action) {
	switch (action.type) {
		case "NEW_ITEM":
			return action.data

		default:
			return state
	}
}
