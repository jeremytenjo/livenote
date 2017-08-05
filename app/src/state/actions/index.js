//defoine what to change in store
export const folderSelection = (e) => {
	return {type: 'TRIGGER_CLICKED', data: e}
}

export const FolderSelection_Name = (e) => {
	return {type: 'CHANGE_NAME', data: e}
}
export const Note_Name = (e) => {
	return {type: 'CHANGE_NOTE_NAME', data: e}
}
export const Change_TopBar_Title = (e) => {
	return {type: 'CHANGE_TOPBAR_TITLE', data: e}
}
export const Toggle_NewNote = (e) => {
	return {type: 'NEWNOTE_TOGGLE', data: e}
}
export const Toggle_NewNote_Image = (e) => {
	return {type: 'NEWNOTE_TOGGLE_IMAGE', data: e}
}
export const Stop_Toggle = (e) => {
	return {type: 'STOP_TOGGLE', data: e}
}
export const Play_Toggle = (e) => {
	return {type: 'PLAY_TOGGLE', data: e}
}
export const Pause_Toggle = (e) => {
	return {type: 'PAUSE_TOGGLE', data: e}
}

export const Start_Time = (e) => {
	return {type: 'START_TIMER', data: e}
}
export const Reset_Timer = () => {
	return {type: 'RESET_TIMER'}
}

export const Set_Current_Time = (e) => {
	return {type: 'SET_CURRENT_TIME', data: e}
}

export const Insert_Item = (e) => {
	return {type: 'INSERT_ITEM', data: e}
}

export const Reset_Items = () => {
	return {type: 'RESET_ITEM'}
}
export const NotePreview_Show = () => {
	return {type: 'SHOW_NOTE_PREVIEW'}
}
export const NotePreview_Hide = () => {
	return {type: 'HIDE_NOTE_PREVIEW'}
}
export const NotePreview_Set = (e) => {
	return {type: 'SET_NOTE_PREVIEW', data: e}
}
export const Folders_Set = (e) => {
	return {type: 'SET_FOLDERS', data: e}
}

export const Show_Snackbar = () => {
	return {type: 'SHOW_SNACKBAR'}
}
export const Hide_Snackbar = () => {
	return {type: 'HIDE_SNACKBAR'}
}
export const Set_Snackbar_Name = (e) => {
	return {type: 'SNACKBAR_NAME', data: e}
}
export const Set_MasterNote_id = (e) => {
	return {type: 'SET_MASTERNOTE_ID', data: e}
}
