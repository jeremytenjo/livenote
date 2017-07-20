//defoine what to change in store
export const triggerAction = (e) => {
	console.log('Action');
  return {
    type: 'TRIGGER_CLICKED',
    data: e
  }
}
