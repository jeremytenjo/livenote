//defoine what to change in store
export const folderSelection = (e) => {
  return {type: 'TRIGGER_CLICKED', data: e}
}

export const FolderSelection_Name = (e) => {
  return {type: 'CHANGE_NAME', data: e}
}
export const FolderSelection_ID = (e) => {
  return {type: 'SET_FOLDER_ID', data: e}
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
export const Set_Audio_Control = (e) => {
  return {type: 'SET_AUDIO_CONTROL', data: e}
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
export const Set_RecentNotes = (e) => {
  return {type: 'SET_RECENT_NOTES', data: e}
}
export const Toggle_OptinsMenuShow = () => {
  return {type: 'SHOW_MENU_OPTIONS'}
}
export const Toggle_OptinsMenuHide = () => {
  return {type: 'HIDE_MENU_OPTIONS'}
}
export const Toggle_OptinsMenuShowFile = () => {
  return {type: 'SHOW_MENU_OPTIONS_FILE'}
}
export const Toggle_OptinsMenuHideFile = () => {
  return {type: 'HIDE_MENU_OPTIONS_FILE'}
}
export const Start_Reording = () => {
  return {type: 'START_RECORDING'}
}
export const Stop_Reording = () => {
  return {type: 'STOP_RECORDING'}
}
export const Set_Delete_File_ID = (e) => {
  return {type: 'SET_FILE_DELETE_ID', data: e}
}
export const Set_Delete_File_Name = (e) => {
  return {type: 'SET_FILE_DELETE_NAME', data: e}
}
export const Set_File_Link_Id = (e) => {
  return {type: 'SET_FILE_LINK_ID', data: e}
}
export const Set_File_Link_Name = (e) => {
  return {type: 'SET_FILE_LINK_NAME', data: e}
}
export const Set_Delete_Folder_ID = (e) => {
  return {type: 'SET_FOLDER_DELETE_ID', data: e}
}
export const Set_Delete_Folder_Name = (e) => {
  return {type: 'SET_FOLDER_DELETE_NAME', data: e}
}
export const Set_Folder_Link_Id = (e) => {
  return {type: 'SET_FOLDER_LINK_ID', data: e}
}
export const Set_Folder_Link_Name = (e) => {
  return {type: 'SET_FOLDER_LINK_NAME', data: e}
}
export const Set_Playback_Id = (e) => {
  return {type: 'SET_PLAYBACK_ID', data: e}
}
export const Toggle_Loading_Scrren = (e) => {
  return {type: 'LOADING_SCREEN_TOGGLE', data: e}
}
export const Set_local_Note_Name = (e) => {
  return {type: 'SET_LOCAL_NOTE_NAME', data: e}
}
export const Set_Audio_Src = (e) => {
  return {type: 'SET_AUDIO_SRC', data: e}
}
export const Fetch_Recent_Flag = (e) => {
  return {type: 'FETCH_RECENT_FLAG', data: e}
}
export const Fetch_Folders_Flag = (e) => {
  return {type: 'FETCH_FOLDERS_FLAG', data: e}
}
export const Fetch_Notes_Flag = (e) => {
  return {type: 'FETCH_NOTES_FLAG', data: e}
}

export const Set_Folders_Local = (e) => {
  return {type: 'FETCH_FOLDERS_LOCAL', data: e}
}
export const Set_Notes_Local = (e) => {
  return {type: 'FETCH_NOTES_LOCAL', data: e}
}
export const Set_Recent_Local = (e) => {
  return {type: 'FETCH_RECENT_LOCAL', data: e}
}
